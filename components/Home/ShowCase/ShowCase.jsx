"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import styles from "./styles.module.scss";

export default function ShowCase() {
  const [tab, setTab] = useState(0);
  const [hasAnimatedTab, setHasAnimatedTab] = useState({});
  const [typedHtml, setTypedHtml] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [flatChars, setFlatChars] = useState([]);
  const typingTimeoutRef = useRef(null);

  const { ref, inView } = useInView({ triggerOnce: false });

  const tabLabels = [
    "Testing Reports",
    "Tracing observability",
    "Dataset editor",
    "Prompt management",
  ];

  const rawCode = [
    `from deepeval.tracing import observe, update_current_span
from deepeval.dataset import Golden, LLMTestCase
from deepeval.metrics import AnswerRelevancyMetric
from deepeval import evaluate

@observe(metrics=[AnswerRelevancyMetric()])
def llm_app(input: str):
    res = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": input}]
    ).choices[0].message["content"]
    update_current_span(test_case=LLMTestCase(input=input, actual_output=res))
    return res

# Call your LLM app to evaluate
evaluate(goldens=[Golden(input="Write me a poem.")],observable_callback=llm_app)`,

    `from deepeval.tracing import observe

@observe()
def llm_app(input: str):
    res = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": input}]
    ).choices[0].message["content"]
    return res

llm_app("Write me a poem.")`,
    `from deepeval.dataset import EvaluationDataset, Golden

# Pull dataset for evaluation
dataset = EvaluationDataset()
dataset.pull(alias="My Testset")
print(dataset.goldens)

# Or, push goldens to update dataset
new_goldens = [Golden(input="Write me a poem.")]
dataset = EvaluationDataset(goldens=new_goldens)
dataset.push(alias="My Testset", overwrite=False)`,
    `from deepeval.prompt import Prompt

# Pull prompt from cloud
prompt = Prompt(alias="System Prompt")
prompt.pull(version="00.00.18")
messages_to_llm = prompt.interpolate(variable="value")

# Pass interpolated prompt to LLM
res = openai.ChatCompletion.create(
    model="gpt-4o", messages=messages_to_llm
).choices[0].message["content"]
print(res)`
  ];

  const highlightedMap = useMemo(() => {
    return rawCode.map(code =>
      Prism.highlight(code, Prism.languages.python, "python")
    );
  }, []);

  // Precompute full lines for current tab's full code (for line numbers)
  const fullLines = useMemo(() => {
    if (!highlightedMap[tab]) return [];
    return highlightedMap[tab].split("\n");
  }, [tab, highlightedMap]);

  // typedLines derived from typedHtml for rendering typed content
  const typedLines = typedHtml.split("\n");

  useEffect(() => {
    const code = highlightedMap[tab];

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    if (hasAnimatedTab[tab]) {
      setTypedHtml(code);
      setCharIndex(code.length);
      setFlatChars([]);
      return;
    }

    const chars = [];
    let i = 0;
    while (i < code.length) {
      if (code[i] === "<") {
        const end = code.indexOf(">", i);
        chars.push(code.slice(i, end + 1));
        i = end + 1;
      } else {
        chars.push(code[i]);
        i++;
      }
    }

    if (inView) {
      setTypedHtml("");
      setCharIndex(0);
      setFlatChars(chars);
    }
  }, [tab, inView, hasAnimatedTab, highlightedMap]);

  useEffect(() => {
    if (charIndex < flatChars.length) {
      typingTimeoutRef.current = setTimeout(() => {
        setTypedHtml(prev => prev + flatChars[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 10);
    } else if (flatChars.length && charIndex === flatChars.length) {
      setHasAnimatedTab(prev => ({ ...prev, [tab]: true }));
    }

    return () => clearTimeout(typingTimeoutRef.current);
  }, [charIndex, flatChars, tab]);

  const titles = ["evaluate.py", "observability.py", "dataset.py", "prompt.py"];
  const videos = [
    "https://confident-landing.s3.us-east-1.amazonaws.com/evaluation-4k.mp4",
    "https://confident-landing.s3.us-east-1.amazonaws.com/monitoring-4k.mp4",
    "https://confident-landing.s3.us-east-1.amazonaws.com/dataset-editor-4k.mp4",
    "https://confident-landing.s3.us-east-1.amazonaws.com/prompt-editor-4k.mp4",
  ];

  return (
    <div className={styles.showCaseSection} ref={ref}>
      <div className={styles.inner}>
        <div className={styles.textWrap}>
          <span
            className={styles.subHeading}
            style={{ color: '#02e2ff' }}
          >
            DEEPEVAL AND PLATFORM
          </span>
          <h2 className={styles.heading}>
             Built for developers.<br /> Used by everyone to drive product decisions.
          </h2>
          <p className={styles.description}>Easily integrate evals using DeepEval, with intuitive product analytic dashboards for non-technical team members.</p>
        </div>

        <div className={styles.imageWrap}>
          <div className={styles.tabs}>
            {tabLabels.map((label, index) => (
              <div
                key={label}
                className={`${styles.tab} ${
                  tab === index ? styles.activeTab : ""
                }`}
                onClick={() => setTab(index)}
              >
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className={styles.frame}>
            <div className={styles.codeFrame}>
              <div className={styles.heading}>{titles[tab]}</div>
              <div className={styles.codeBlock}>
                {fullLines.map((_, i) => (
                  <div key={i} className={styles.codeLine}>
                    <span className={styles.lineNumber}>{i + 1}</span>
                    <code
                      dangerouslySetInnerHTML={{
                        __html: typedLines[i] || "&nbsp;",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.video}>
              <video autoPlay loop muted playsInline preload="auto">
                <source src={videos[tab]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
