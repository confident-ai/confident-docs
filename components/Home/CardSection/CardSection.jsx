import styles from './styles.module.scss'
export default function CardSection( ) {
    const cards = [
        {
            cardHeading: "Install DeepEval.",
            cardDescription:
                "Whatever framework you're using, just install DeepEval.",
        },
        {
            cardHeading: "Choose metrics.",
            cardDescription:
                "30+ LLM-as-a-judge metrics based on your use case.",
        },
        {
            cardHeading: "Plug it in.",
            cardDescription:
                "Decorate your LLM app to apply your metrics in code.",
        },
        {
            cardHeading: "Run an evaluation.",
            cardDescription:
                "Generate test reports to catch regressions and debug with traces.",
        },
    ];

    return (
        <div className={styles.CardSection}>
            <div className={styles.inner}>
                <div className={styles.textWrap}>
                    <span className={styles.subHeading} style={{ color: '#fff86c' }}>How It Works</span>
                    <h2 className={styles.heading}>
                        Four steps to setup.<br />
                        No credit card required.
                    </h2>
                    <div
                        className={`${styles.cards} ${cards?.length % 2 !== 0 ? styles.centeredCards : ""
                            }`}
                    >
                        {cards.map((card, idx) => (
                            <div key={idx} className={styles.card} style={{ width: `calc(100% / ${cards.length} )` }}>
                                {!card.icon && (
                                    <div className={styles.cardStep}>
                                        <span>{idx + 1}</span>
                                    </div>
                                )}
                                {card.icon && (
                                    <div className={styles.cardIcon}>
                                        {card.icon}
                                    </div>
                                )}
                                <h3 className={styles.cardHeading}>
                                    {card.cardHeading}
                                    {card.socialLink && (
                                        <a href={card.socialLink} className={styles.socialLink}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 512 512"
                                            >
                                                <g>
                                                    <path
                                                        d="M512 21.805v331.202c0 12.042-9.763 21.805-21.805 21.805s-21.805-9.763-21.805-21.805V74.451L37.225 505.615c-4.259 4.257-9.838 6.386-15.419 6.386s-11.16-2.129-15.419-6.386c-8.516-8.516-8.516-22.323 0-30.839L437.553 43.61h-278.56c-12.042 0-21.805-9.763-21.805-21.805S146.951 0 158.993 0h331.202C502.237-.001 512 9.763 512 21.805z"
                                                        fill="#fefefe"
                                                    />
                                                </g>
                                            </svg>
                                        </a>
                                    )}
                                </h3>
                                <p className={styles.cardDescription}>{card.cardDescription}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.buttonWrap}>
                        <a href='https://documentation.confident-ai.com/getting-started/create-account' className={`${styles.btn} ${styles.contained}`}>
                            GO TO QUICK START
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};