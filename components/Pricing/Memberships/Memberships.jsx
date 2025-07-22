import { ChevronRight } from "lucide-react";
import styles from "./styles.module.scss";
import Button from "@/components/Button/Button";
export default function Memberships() {
  const memberships = [
    {
      type: "Free",
      chipColor: "", // Transparent
      chipBorder: "",
      heading: (
        <>
          Forever <sup>$</sup>0
        </>
      ),
      subTitle: "As expected",
      description: "For those just curious about Confident AI.",
      Features: {
        highlights: [
          { title: "DeepEval testing reports on Confident AI" },
          { title: <>Evals in development and <br className={styles.mobileResp}/>CI/CD</> },
          { title: "LLM tracing" },
          { title: "Prompt versioning" },
          { title: "Community and documentation support" },
        ],
        Limitations: [
          { title: "Limited to 1 project" },
          { title: "5 test runs per week" },
          { title: "1 week data retention" },
          { title: "1 week data retention" },
        ],
      },
    },
    {
      type: "Starter",
      chipColor: "#750357", // Or any appropriate Tailwind/class color
      chipBorder: "#ff8ae0",
      heading: (
        <>
          From <sup>$</sup>19<sup>.99</sup>
        </>
      ),
      subTitle: "Per user per month",
      description: "For teams proving ROI with LLM products.",
      Features: {
        highlights: [
          { title: "Full LLM unit and regression testing suite" },
          { title: "Model and prompt scorecards" },
          { title: "Annotate evaluation datasets on the cloud" },
          { title: "Custom metrics for any use case" },
          { title: "Online evaluations" },
          { title: "Human-in-the-loop feedback leaving" },
          { title: "Email support" },
        ],
        Limitations: [
          { title: "Starting from 1 user seat" },
          { title: "Starting from 1 project" },
          {
            title: (
              <>
                Starting from 20k <br /> LLM traces/month
              </>
            ),
          },
          { title: "Starting from 5k online evaluation metric runs/month" },
          { title: "1 month data retention" },
        ],
      },
    },
    {
      type: "Premium",
      chipColor: "#6d18ff", // Use the "BEST VALUE" color or highlight
      chipBorder: "#a9afba",
      heading: (
        <>
          From <sup>$</sup>79<sup>.99</sup>
        </>
      ),
      subTitle: "Per user per month",
      description:
        "For teams shipping mission critical LLM products to production.",
      Features: {
        highlights: [
          { title: "Real-time performance alerting" },
          { title: "Dataset backup and revision history" },
          { title: "Publicly sharable testing reports" },
          { title: "No-code LLM evaluation workflows" },
          { title: "Custom evaluation model" },
          { title: "Dedicated support channel" },
        ],
        addOns: [
          { title: "HIPAA" },
          { title: "Data residency in EU (or anywhere else on-demand)" },
          { title: "API access" },
        ],
        Limitations: [
          { title: "Starting from 1 user seat" },
          { title: "Starting from 1 project" },
          { title: "Starting from 75K LLM traces/month" },
          { title: "Starting from 25k online evaluation metric runs/month" },
          { title: "6 months data retention" },
        ],
      },
    },
    {
      type: "Enterprise",
      chipBorder: "#a9afba", // Custom pricing usually shown as premium
      heading: <>Custom pricing</>,
      subTitle: "Unlimited advanced everything",
      description: "For high-scale, enhanced security, and compliance needs.",
      Features: {
        highlights: [
          { title: "Guardrails" },
          { title: "Metrics and guardrails accuracy validation" },
          { title: "User and permissions management" },
          { title: "Dedicated On-Prem Deployment" },
          { title: "SSO" },
          { title: "SOC2" },
          { title: "Dedicated 24x7 technical support" },
        ],
        Limitations: [
          { title: "Unlimited user seats" },
          { title: "Unlimited projects" },
          { title: "Unlimited traces" },
          { title: "Unlimited online evaluations" },
          { title: "Proprietary LLM for evals" },
          { title: "Customized data retention" },
        ],
      },
    },
  ];
  return (
    <div className={styles.memberships}>
      <div className={styles.inner}>
        <div className={styles.textWrap}>
          <h1>Pricing</h1>
          <p>
            Adaptable pricing that evolves with your needs - from initial
            exploration to enterprise scale.
          </p>
        </div>
        <div className={styles.membershipsWrap}>
          <div className={styles.wrap}>
            {memberships.map((item, index) => (
              <div
                key={index}
                className={styles.card}
                style={{ width: `calc(100% / ${memberships.length})` }}
              >
                {item.type === "Premium" && (
                  <div className={styles.bestValueBadge}>Best Value</div>
                )}

                <span
                  className={styles.type}
                  style={{
                    backgroundColor: item?.chipColor,
                    borderColor: item?.chipBorder,
                  }}
                >
                  {item.type}
                </span>
                <div className={styles.info}>
                  <h3 className={styles.heading}>{item.heading}</h3>
                  <p className={styles.subTitle}>{item.subTitle}</p>
                  <div className={styles.btnWrap}>
                    {index !== memberships.length - 1 && (
                      <Button
                        to="https://app.confident-ai.com/auth/signup?redirect_url=%2F"
                        variant="contained"
                        color="primary"
                        curved
                        label={
                          <>
                            Try Now For Free
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={7.5}
                              height={13}
                              viewBox="0 0 320 512"
                            >
                              <path
                                fill="#000"
                                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                              ></path>
                            </svg>
                          </>
                        }
                        sizes="xs"
                        style={{
                          fontWeight: "500",
                          lineHeight: "1.866667em",
                          boxShadow: "unset",
                        }}
                      />
                    )}
                    {index === memberships.length - 1 && (
                      <Button
                        to="https://app.confident-ai.com/auth/signup?redirect_url=%2F"
                        variant="contained"
                        color="primary"
                        curved
                        label={
                          <>
                            Contact Us
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={7.5}
                              height={13}
                              viewBox="0 0 320 512"
                            >
                              <path
                                fill="#000"
                                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                              ></path>
                            </svg>
                          </>
                        }
                        sizes="xs"
                        style={{
                          fontWeight: "500",
                          lineHeight: "1.866667em",
                          boxShadow: "unset",
                        }}
                      />
                    )}
                  </div>
                  <p className={styles.description}>{item.description}</p>
                </div>
                <div className={styles.featureSection}>
                  {item.Features.highlights?.length > 0 && (
                    <div className={styles.container}>
                      {index === 0 && <h4>Feature highlights</h4>}
                      {index > 0 && (
                        <h4>
                          Everything in {memberships[index - 1].type}, plus{" "}
                        </h4>
                      )}
                      <div>
                        {item.Features.highlights.map((feature, idx) => (
                          <span key={idx}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="#34d399"
                            >
                              <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                            </svg>
                            {feature.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.Features.addOns?.length > 0 && (
                    <div className={styles.container}>
                      <h4>Add-Ons</h4>
                      <div>
                        {item.Features.addOns.map((addon, idx) => (
                          <span key={idx}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="#34d399"
                            >
                              <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                            </svg>
                            {addon.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.Features.Limitations?.length > 0 && (
                    <div className={styles.container}>
                      <h4>Limits</h4>
                      <div>
                        {item.Features.Limitations.map((limitation, idx) => (
                          <span key={idx}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="#34d399"
                            >
                              <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                            </svg>
                            {limitation.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.absoluteBackground}></div>
    </div>
  );
}
