import styles from "./styles.module.scss";

export default function Banner() {
  return (
    <div className={styles.Banner}>
      <div className={styles.inner}>
        <div className={styles.textWrap}>
          <span className={styles.subHeading}>Careers</span>
          <h1 className={styles.bannerHeading}>
            We're on a mission to dictate the <br /> future of AI testing
          </h1>
          <p className={styles.bannerDescription}>
            Join us to build and grow the world's biggest and most loved
            open-source LLM evaluation product.
          </p>
        </div>
        <div className={styles.bottomWrap}>
          <div className={styles.first}>
            <h2 className={styles.heading}>What is Confident AI?</h2>
            <p className={styles.paragraph}>
              Confident AI an open-source company building 1) an open-source
              package called{" "}
              <a href="https://github.com/confident-ai/deepeval">DeepEval</a> to
              unit-test LLM applications such as chatbots, agents, and RAG
              pipelines, and 2) the cloud platform for DeepEval. It's like
              Next.JS and Vercel. The founding team is a small group of
              exceptional engineers and researchers from top colleges and
              companies such as Google, Microsoft, and Princeton.
            </p>
          </div>
          <div className={styles.second}>
            <h2 className={styles.heading}>Our Values and Morals</h2>
            <p className={styles.values}>Things we value:</p>
            <ul className={styles.list}>
              <li>
                No excuses or BS—if something is wrong, surface it so someone
                can help.
              </li>
              <li>
                Openness and transparency—hiding a problem won’t make it go
                away.
              </li>
              <li>
                No politics, micromanagement, or bureaucracy, even in
                controversial discussions.
              </li>
              <li>
                Autonomy, ownership, and responsibility—just as expected from
                any grown adult.
              </li>
              <li>No ghosting—respect others’ time and effort.</li>
              <li>
                Doers, not yappers, function over form. This means we're ok with
                remote work as long as you deliver.
              </li>
            </ul>
            <p className={styles.paragraph}>
              If this sounds like you, we'd love to talk to you. Please find
              available job openings down below.
            </p>
          </div>
        </div>
      </div>
      {[0, 1, 2].map((_, i) => (
        <span key={i} className={styles.meteors} />
      ))}
      <div style={{ backgroundImage: "radial-gradient(circle closest-side at 50% 50%, #0b101b00 75%, #0e0e13), url('/img/grid-bg.svg')" }} className={styles.absoluteBackground}></div>
    </div>
  );
}
