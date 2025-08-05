import GlobalLayout from "@/app/global-layout";
import CaseStudyHeader from "@/components/CaseStudies/CaseStudyHeader/CaseStudyHeader";
import CaseStudyContent from "@/components/CaseStudies/CaseStudyContent/CaseStudyContent";
import TextOnlySection from "@/components/CaseStudies/TextOnlySection/TextOnlySection";
import { getCase } from "@/functions/get-case-study";
import styles from "./styles.module.scss";
export default async function Page({ params }) {
  const { slug } = await params;
  const study = await getCase(slug);
  return (
    <>
      <GlobalLayout staticHeader>
        <div className={styles.caseStudy}>
          <div className={styles.container}>
            <CaseStudyHeader content={study?.fields} />
            <CaseStudyContent
              content={study?.fields?.textBlock}
              fields={study?.fields}
            />
          </div>
        </div>
        <TextOnlySection />
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
    title: `${study?.fields?.heading} - Confident AI`,
    description: study?.fields?.quote,
    metadataBase: "https://confident-ai.com",
    openGraph: {
      title: `${study?.fields?.heading} - Confident AI`,
      description: study?.fields?.quote,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: blog?.fields?.title,
        },
      ],
      url: "https://confident-ai.com",
      siteName: "Confident AI",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${study?.fields?.heading} - Confident AI`,
      description: study?.fields?.quote,
      images: [fullImageUrl],
      creator: "@confident_ai",
    },
  };
}
