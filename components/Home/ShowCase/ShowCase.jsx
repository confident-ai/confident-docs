"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./styles.module.scss";

export default function ShowCase({ data }) {
  const [tab, setTab] = useState(0);
  const [hasAnimatedTab, setHasAnimatedTab] = useState({});
  const [typedHtml, setTypedHtml] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [flatChars, setFlatChars] = useState([]);
  const typingTimeoutRef = useRef(null);

  const { ref, inView } = useInView({
    triggerOnce: false, // We want to allow re-animation on re-enter
  });
  const tabLabels = [
    "Testing Reports",
    "Tracing observability",
    "Dataset editor",
    "Prompt management",
  ];
  const tabCode = [
    [
      `<span class=${styles.keyword}>from</span> <span class=${styles.string}>deepeval<span class=${styles.decorator}>.</span>tracing</span> <span class=${styles.keyword}>import</span> <span class=${styles.className}>observe</span><span class=${styles.decorator}>,</span> <span class=${styles.className}>update_current_span</span>\n`,
      `<span class=${styles.keyword}>from</span> <span class=${styles.string}>deepeval<span class=${styles.decorator}>.</span>dataset</span> <span class=${styles.keyword}>import</span> <span class=${styles.className}>Golden</span><span class=${styles.decorator}>,</span> <span class=${styles.className}>LLMTestCase</span>\n`,
      `<span class=${styles.keyword}>from</span> <span class=${styles.string}>deepeval<span class=${styles.decorator}>.</span>metrics</span> <span class=${styles.keyword}>import</span> <span class=${styles.className}>AnswerRelevancyMetric</span>\n`,
      `<span class=${styles.keyword}>from</span> <span class=${styles.string}>deepeval</span> <span class=${styles.keyword}>import</span> <span class=${styles.className}>evaluate</span>\n\n`,

      `<span class=${styles.decorator}>@observe</span><span class=${styles.decorator}>(</span><span class=${styles.inputOutputs}>metrics</span><span class=${styles.declaration}>=</span><span class=${styles.decorator}>[</span><span class=${styles.className}>AnswerRelevancyMetric</span><span class=${styles.decorator}>()</span><span class=${styles.decorator}>]</span><span class=${styles.decorator}>)</span> <span class=${styles.comment}># Define metrics</span>\n`,
      `<span class=${styles.controlFlow}>def</span> <span class=${styles.className}>llm_app</span><span class=${styles.decorator}>(</span><span class=${styles.inputOutputs}>input</span><span class=${styles.decorator}>:</span> <span class=${styles.className}>str</span><span class=${styles.decorator}>)</span><span class=${styles.decorator}>:</span>\n`,
      `    <span class=${styles.inputOutputs}>res</span> <span class=${styles.declaration}>=</span> <span class=${styles.string}>openai<span class=${styles.decorator}>.</span>ChatCompletion<span class=${styles.decorator}>.</span>create</span><span class=${styles.decorator}>(</span><span class=${styles.inputOutputs}>model</span><span class=${styles.declaration}>=</span><span class=${styles.string}><span class=${styles.quotes}>"</span>gpt-4o<span class=${styles.quotes}>"</span></span><span class=${styles.decorator}>,</span> <span class=${styles.inputOutputs}>messages</span><span class=${styles.declaration}>=</span><span class=${styles.decorator}>[</span><span class=${styles.decorator}>{</span><span class=${styles.string}><span class=${styles.quotes}>"</span>role<span class=${styles.quotes}>"</span></span><span class=${styles.decorator}>:</span> <span class=${styles.string}><span class=${styles.quotes}>"</span>user<span class=${styles.quotes}>"</span></span><span class=${styles.decorator}>,</span> <span class=${styles.string}><span class=${styles.quotes}>"</span>content<span class=${styles.quotes}>"</span></span><span class=${styles.decorator}>:</span> <span class=${styles.inputOutputs}>input</span><span class=${styles.decorator}>}</span><span class=${styles.decorator}>]</span><span class=${styles.decorator}>)</span><span class=${styles.decorator}>.</span>choices<span class=${styles.decorator}>[</span><span class=${styles.numbers}>0</span><span class=${styles.decorator}>]</span><span class=${styles.decorator}>.</span>message<span class=${styles.decorator}>[</span><span class=${styles.string}><span class=${styles.quotes}>"</span>content<span class=${styles.quotes}>"</span></span><span class=${styles.decorator}>]</span>\n`,
      `    <span class=${styles.comment}># Set test case at runtime</span>\n`,
      `    <span class=${styles.className}>update_current_span</span><span class=${styles.decorator}>(</span><span class=${styles.inputOutputs}>test_case</span><span class=${styles.declaration}>=</span><span class=${styles.className}>LLMTestCase</span><span class=${styles.decorator}>(</span><span class=${styles.inputOutputs}>input</span><span class=${styles.declaration}>=</span><span class=${styles.inputOutputs}>input</span><span class=${styles.decorator}>,</span> <span class=${styles.inputOutputs}>actual_output</span><span class=${styles.declaration}>=</span><span class=${styles.inputOutputs}>res</span><span class=${styles.decorator}>)</span><span class=${styles.decorator}>)</span>\n`,
      `    <span class=${styles.controlFlow}>return</span> <span class=${styles.inputOutputs}>res</span>\n\n`,
      `<span class=${styles.comment}># Call your LLM app to evaluate</span>\n`,
      `<span class=${styles.className}>evaluate</span><span class=${styles.decorator}>(</span><span class=${styles.inputOutputs}>goldens</span><span class=${styles.declaration}>=</span><span class=${styles.decorator}>[</span><span class=${styles.className}>Golden</span><span class=${styles.decorator}>(</span><span class=${styles.inputOutputs}>input</span><span class=${styles.declaration}>=</span><span class=${styles.string}><span class=${styles.quotes}>"</span>Write me a poem.<span class=${styles.quotes}>"</span></span><span class=${styles.decorator}>)</span><span class=${styles.decorator}>]</span><span class=${styles.decorator}>,</span> <span class=${styles.inputOutputs}>observable_callback</span><span class=${styles.declaration}>=</span><span class=${styles.className}>llm_app</span><span class=${styles.decorator}>)</span>`,
    ].join(""),
    [
      `<span class=${styles.keyword}>from</span> <span class=${styles.string}>deepeval<span class=${styles.decorator}>.</span>tracing</span> <span class=${styles.keyword}>import</span> <span class=${styles.className}>observe</span>\n\n`,

      `<span class=${styles.decorator}>@observe</span><span class=${styles.decorator}>()</span>\n`,
      `<span class=${styles.keyword}>def</span> <span class=${styles.className}>llm_app</span><span class=${styles.decorator}>(</span><span class=${styles.inputOutputs}>input</span><span class=${styles.decorator}>:</span> <span class=${styles.className}>str</span><span class=${styles.decorator}>)</span><span class=${styles.decorator}>:</span>\n`,

      `    <span class=${styles.inputOutputs}>res</span> <span class=${styles.declaration}>=</span> <span class=${styles.string}>openai</span><span class=${styles.decorator}>.</span>ChatCompletion<span class=${styles.decorator}>.</span>create<span class=${styles.decorator}>(</span>\n`,
      `        <span class=${styles.inputOutputs}>model</span><span class=${styles.declaration}>=</span><span class=${styles.string}><span class=${styles.quotes}>"</span>gpt-4o<span class=${styles.quotes}>"</span></span><span class=${styles.decorator}>,</span>\n`,
      `        <span class=${styles.inputOutputs}>messages</span><span class=${styles.declaration}>=</span><span class=${styles.decorator}>[</span><span class=${styles.decorator}>{</span><span class=${styles.string}><span class=${styles.quotes}>"</span>role<span class=${styles.quotes}>"</span></span><span class=${styles.decorator}>:</span> <span class=${styles.string}><span class=${styles.quotes}>"</span>user<span class=${styles.quotes}>"</span></span><span class=${styles.decorator}>,</span> <span class=${styles.string}><span class=${styles.quotes}>"</span>content<span class=${styles.quotes}>"</span></span><span class=${styles.decorator}>:</span> <span class=${styles.inputOutputs}>input</span><span class=${styles.decorator}>}</span><span class=${styles.decorator}>]</span>\n`,
      `    <span class=${styles.decorator}>).</span>choices<span class=${styles.decorator}>[</span><span class=${styles.numbers}>0</span><span class=${styles.decorator}>]</span><span class=${styles.decorator}>.</span>message<span class=${styles.decorator}>[</span><span class=${styles.string}><span class=${styles.quotes}>"</span>content<span class=${styles.quotes}>"</span></span><span class=${styles.decorator}>]</span>\n`,

      `    <span class=${styles.keyword}>return</span> <span class=${styles.inputOutputs}>res</span>\n\n`,

      `<span class=${styles.className}>llm_app</span><span class=${styles.decorator}>(</span><span class=${styles.string}><span class=${styles.quotes}>"</span>Write me a poem.<span class=${styles.quotes}>"</span></span><span class=${styles.decorator}>)</span>`,
    ].join(""),
    [
      `<span class=${styles.keyword}>from</span> <span class=${styles.string}>deepeval<span class=${styles.decorator}>.</span>dataset</span> <span class=${styles.keyword}>import</span> <span class=${styles.className}>EvaluationDataset</span><span class=${styles.decorator}>,</span> <span class=${styles.className}>Golden</span>\n\n`,

      `<span class=${styles.comment}># Pull dataset for evaluation</span>\n`,
      `<span class=${styles.inputOutputs}>dataset</span> <span class=${styles.declaration}>=</span> <span class=${styles.className}>EvaluationDataset</span><span class=${styles.decorator}>()</span>\n`,
      `<span class=${styles.inputOutputs}>dataset</span><span class=${styles.decorator}>.</span>pull<span class=${styles.decorator}>(</span><span class=${styles.inputOutputs}>alias</span><span class=${styles.declaration}>=</span><span class=${styles.string}><span class=${styles.quotes}>"</span>My Testset<span class=${styles.quotes}>"</span></span><span class=${styles.decorator}>)</span>\n`,
      `<span class=${styles.quotes}>print</span><span class=${styles.decorator}>(</span><span class=${styles.inputOutputs}>dataset</span><span class=${styles.decorator}>.</span>goldens<span class=${styles.decorator}>)</span>\n\n`,

      `<span class=${styles.comment}># Or, push goldens to update dataset</span>\n`,
      `<span class=${styles.inputOutputs}>new_goldens</span> <span class=${styles.declaration}>=</span> <span class=${styles.decorator}>[</span><span class=${styles.className}>Golden</span><span class=${styles.decorator}>(</span><span class=${styles.inputOutputs}>input</span><span class=${styles.declaration}>=</span><span class=${styles.string}><span class=${styles.quotes}>"</span>Write me a poem.<span class=${styles.quotes}>"</span></span><span class=${styles.decorator}>)</span><span class=${styles.decorator}>]</span>\n`,
      `<span class=${styles.inputOutputs}>dataset</span> <span class=${styles.declaration}>=</span> <span class=${styles.className}>EvaluationDataset</span><span class=${styles.decorator}>(</span><span class=${styles.inputOutputs}>goldens</span><span class=${styles.declaration}>=</span><span class=${styles.inputOutputs}>new_goldens</span><span class=${styles.decorator}>)</span>\n`,
      `<span class=${styles.inputOutputs}>dataset</span><span class=${styles.decorator}>.</span>push<span class=${styles.decorator}>(</span><span class=${styles.inputOutputs}>alias</span><span class=${styles.declaration}>=</span><span class=${styles.string}><span class=${styles.quotes}>"</span>My Testset<span class=${styles.quotes}>"</span></span><span class=${styles.decorator}>,</span> <span class=${styles.inputOutputs}>overwrite</span><span class=${styles.declaration}>=</span><span class=${styles.keyword}>False</span><span class=${styles.decorator}>)</span>`,
    ].join(""),
    [
      `<span class="${styles.keyword}">from</span> <span class="${styles.string}">deepeval<span class="${styles.decorator}">.</span>prompt</span> <span class="${styles.keyword}">import</span> <span class="${styles.className}">Prompt</span>\n\n`,
      `<span class="${styles.comment}"># Pull prompt from cloud</span>\n`,
      `prompt </span><span class='${styles.declaration}'>=</span> <span class="${styles.className}">Prompt</span><span class="${styles.decorator}">(</span></span><span class='${styles.inputOutputs}'>alias</span></span><span class='${styles.declaration}'>=</span><span class="${styles.string}"><span class="${styles.quotes}">"</span>System Prompt<span class="${styles.quotes}">"</span></span><span class="${styles.decorator}">)</span>\n`,
      `prompt<span class="${styles.decorator}">.</span>pull<span class="${styles.decorator}">(</span></span><span class='${styles.inputOutputs}'>version</span></span><span class='${styles.declaration}'>=</span><span class="${styles.string}"><span class="${styles.quotes}">"</span>00.00.18<span class="${styles.quotes}">"</span></span><span class="${styles.decorator}">)</span>\n`,
      `messages_to_llm </span><span class='${styles.declaration}'>=</span> prompt<span class="${styles.decorator}">.</span>interpolate<span class="${styles.decorator}">(</span><span class='${styles.inputOutputs}'>variable</span><span class='${styles.declaration}'>=</span><span class="${styles.string}"><span class="${styles.quotes}">"</span>value<span class="${styles.quotes}">"</span></span><span class="${styles.decorator}">)</span>\n\n`,
      `<span class="${styles.comment}"># Pass interpolated prompt to LLM</span>\n`,
      `res </span><span class='${styles.declaration}'>=</span> openai.ChatCompletion.create<span class="${styles.decorator}">(</span></span><span class='${styles.inputOutputs}'>model</span></span><span class='${styles.declaration}'>=</span><span class="${styles.string}"><span class="${styles.quotes}">"</span>gpt-4o<span class="${styles.quotes}">"</span></span><span class="${styles.decorator}">,</span> </span><span class='${styles.inputOutputs}'>messages</span></span><span class='${styles.declaration}'>=</span>messages_to_llm<span class="${styles.decorator}">)</span><span class="${styles.decorator}">.</span>choices<span class="${styles.decorator}">[</span><span class='${styles.numbers}'>0</span><span class="${styles.decorator}">]</span><span class="${styles.decorator}">.</span>message<span class="${styles.decorator}">[</span><span class="${styles.string}"><span class="${styles.quotes}">"</span>content<span class="${styles.quotes}">"</span></span><span class="${styles.decorator}">]</span>\n`,
      `</span><span class='${styles.quotes}'>print</span><span class="${styles.decorator}">(</span>res<span class="${styles.decorator}">)</span>`,
    ].join(""),
  ];
  useEffect(() => {
    const code = tabCode[tab];

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current); // Clean up
    }

    // If already animated, show full code
    if (hasAnimatedTab[tab]) {
      setTypedHtml(code);
      setCharIndex(code.length);
      setFlatChars([]);
      return;
    }

    // Otherwise parse and prep for typing
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
  }, [tab, inView, hasAnimatedTab]);

  useEffect(() => {
    if (charIndex < flatChars.length) {
      typingTimeoutRef.current = setTimeout(() => {
        setTypedHtml(prev => prev + flatChars[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 10);
    } else if (flatChars.length && charIndex === flatChars.length) {
      // Typing done: remember this tab as animated
      setHasAnimatedTab(prev => ({ ...prev, [tab]: true }));
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
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
            style={{ color: `${data?.text?.subHeadingColor}` }}
          >
            {data?.text?.subHeading}
          </span>
          <h2 className={styles.heading}>{data?.text?.heading}</h2>
          <p className={styles.description}>{data?.text?.description}</p>
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
                {typedHtml.split("\n").map((line, i) => (
                  <div key={i} className={styles.codeLine}>
                    <span className={styles.lineNumber}>{i + 1}</span>
                    <code
                      dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.video}>
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                id="testingReportVideo"
                className="yourCustomClass" // ← optional, or use Tailwind/CSS Modules
              >
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
