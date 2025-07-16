import styles from "./styles.module.scss";
import Button from "@/components/Home/Button/Button";
export default function CardSection() {
  const cards = [
    {
      cardHeading: "Install DeepEval.",
      cardDescription:
        "Whatever framework you're using, just install DeepEval.",
    },
    {
      cardHeading: "Choose metrics.",
      cardDescription: "30+ LLM-as-a-judge metrics based on your use case.",
    },
    {
      cardHeading: "Plug it in.",
      cardDescription: "Decorate your LLM app to apply your metrics in code.",
    },
    {
      cardHeading: "Run an evaluation.",
      cardDescription:
        "Generate test reports to catch regressions and debug with traces.",
    },
  ];
  const btns = [
    {
      label: "GO TO QUICK START",
      link: "https://documentation.confident-ai.com/getting-started/create-account",
      btnVariant: "containedBW",
    },
  ];

  return (
    <div className={styles.CardSection}>
      <div className={styles.inner}>
        <div className={styles.textWrap}>
          <span className={styles.subHeading} style={{ color: "#fff86c" }}>
            How It Works
          </span>
          <h2 className={styles.heading}>
            Four steps to setup.
            <br />
            No credit card required.
          </h2>
          <div
            className={`${styles.cards} ${
              cards?.length % 2 !== 0 ? styles.centeredCards : ""
            }`}
          >
            {cards.map((card, idx) => (
              <div
                key={idx}
                className={styles.card}
                style={{ width: `calc(100% / ${cards.length} )` }}
              >
                <div className={styles.cardStep}>
                  <span>{idx + 1}</span>
                </div>
                <h3 className={styles.cardHeading}>{card.cardHeading}</h3>
                <p className={styles.cardDescription}>{card.cardDescription}</p>
              </div>
            ))}
          </div>
          <div className={styles.buttonWrap}>
            <Button
              to="https://confident-ai.com/case-study/supernormal"
              variant="outlined"
              color="primary"
              label="GO TO QUICKSTART"
              sizes="lg"
              curved
              bordered
              style={{ boxShadow: "0 0 4px #fff", fontWeight: '700' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
