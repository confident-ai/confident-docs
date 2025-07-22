import Image from "next/image";
import styles from "./styles.module.scss";
export default function Form() {
  return (
    <div className={styles.contactForm}>
      <div className={styles.inner}>
        <div className={styles.formTextWrap}>
          <div className={styles.textWrap}>
            <h1 className={styles.heading}>We'd love to show you around.</h1>
            <p className={styles.paragraph}>
              Change the way you do evals. Get insight into DeepEval's LLM
              evaluation and observability.
            </p>
            <ul>
              <li>
                <b>Meet with one of the creators of DeepEval</b> who will listen
                and learn about your business needs
              </li>
              <li>
                <b>Get full visibility</b> into the Confident AI platform
              </li>
              <li>
                <b>Receive one-to-one feedback</b> on the best strategies to
                streamline your LLM evaluation workflows
              </li>
            </ul>
            <p className={styles.paragraph}>
              The leading LLM evaluation solution trusted by over{" "}
              <b>500 customers.</b>
            </p>
            <div className={styles.backedBy}>
              <Image
                alt="Y Combinator company logo"
                src="/icons/brand-icons/ycombinator.svg"
                width={28}
                height={28}
              />
              <div className={styles.BackedByText}>
                <span>Backed by</span>Y Combinator
              </div>
            </div>
          </div>
          <div className={styles.Form}>
            <form>
              <div className={styles.input}>
                <input type="text" placeholder="Work email*" required />
              </div>
              <div className={styles.input}>
                <label htmlFor="teamSize">LLM team size*</label>
                <select name="teamSize" id="teamSize" required>
                  <option value="" defaultValue>
                    Please select{" "}
                  </option>
                  <option value="1-5">1-5</option>
                  <option value="6-10">6-10</option>
                  <option value="11-20">11-20</option>
                  <option value="21-50">21-50</option>
                  <option value="51-100">51-100</option>
                  <option value="100+">100+</option>
                </select>
              </div>
              <div className={styles.input}>
                <label htmlFor="type">
                  What type of LLM application are you building?*
                </label>
                <select name="type" id="type" required>
                  <option value="" defaultValue>
                    Please select
                  </option>
                  <option value="rag">RAG</option>
                  <option value="llm-chatbots">LLM Chatbots</option>
                  <option value="llm-agents">LLM Agents</option>
                  <option value="other">other</option>
                </select>
              </div>
              <div className={styles.privacyPolicy}>
                <p>
                  Subject to{" "}
                  <a
                    href="https://www.confident-ai.com/privacy-policy"
                    target="_blank"
                  >
                    Confident AI's Privacy Policy
                  </a>
                  , you agree to allow Confident AI to contact you via the email
                  provided for scheduling and marketing purposes.
                </p>
              </div>
              <div className={styles.btnWrap}>
                <button type="submit" className={styles.submitBtn}>
                  Request a Demo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
