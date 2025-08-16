import GlobalLayout from "@/app/global-layout";
import CaseStudyHeader from "@/components/caseStudy/caseStudyHeader/caseStudyHeader";
import CaseStudyContent from "@/components/caseStudy/caseStudyContent/caseStudyContent";
import TextOnlySection from "@/components/caseStudy/textOnlySection/textOnlySection";
import { getCase } from "@/functions/get-case-study";
import styles from "./styles.module.scss";
import Button from "@/components/button/button";
export default async function Page({ params }) {
  const { slug } = await params;
  const study = await getCase(slug);
  return (
    <>
      <GlobalLayout staticHeader>
        <div className={`${styles.caseStudy} ${!study || !study.fields ? styles.caseStudyNotFound : ""}`}>
          <div className={styles.container}>
            {!study || !study.fields ? (
              <>
                <h1 className={styles.caseStudyNotFoundTitle}>
                  404
                </h1>
                <h2 className={styles.caseStudyNotFoundSubheading}>
                  Case Study Not Found
                </h2>
                <Button
                  to="/"
                  variant="outlined"
                  label="Back to home"
                  color="purple"
                  bordered
                />
              </>
            ) : (
              <>
                <CaseStudyHeader content={study?.fields} />
                <CaseStudyContent
                  content={study?.fields?.textBlock}
                  fields={study?.fields}
                />
                <TextOnlySection />
              </>
            )}
          </div>
        </div>
      </GlobalLayout>
    </>
  );
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = await getCase(slug);
  const imageUrl = study?.fields?.companyLogo?.fields?.file?.url;

  const fullImageUrl = imageUrl?.startsWith("http")
    ? imageUrl
    : `https:${imageUrl}`;
  return {
    title: `${study?.fields?.heading}`,
    description: study?.fields?.quote,
    metadataBase: "https://confident-ai.com",
    openGraph: {
      title: `${study?.fields?.heading}`,
      description: study?.fields?.quote,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: study?.fields?.heading,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${study?.fields?.heading}`,
      description: study?.fields?.quote,
      images: [fullImageUrl],
    },
  };
}
