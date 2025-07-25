import { getBlog } from "@/functions/get-blogs";
import GlobalLayout from "@/app/global-layout";
import ArticleContent from "@/components/Blog/ArticleContent/ArticleContent";
import ArticleHeader from "@/components/Blog/ArticleHeader/ArticleHeader";
import Callout from "@/components/Blog/Callout/Callout";
import SideBar from "@/components/Blog/SideBar/SideBar";
import styles from "./styles.module.scss";

export default async function Page({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  console.log(blog.fields);
  return (
    <GlobalLayout staticHeader={true}>
      <div className={styles.Article}>
        <div className={styles.inner}>
          <div className={styles.contentWrap}>
            <SideBar content={blog?.fields} mobile={true} />

            <ArticleHeader content={blog?.fields} />
            <div className={styles.mainContent}>
              <Callout />
              <img
                className={styles.featuredImage}
                src={blog?.fields?.featuredImage?.fields?.file?.url}
                alt="featured Image"
              />
              <SideBar content={blog?.fields} />
              <ArticleContent content={blog?.fields?.contentBody1} />
              {blog?.fields?.contentBody2 && (
                <ArticleContent content={blog?.fields?.contentBody2} />
              )}
              {blog?.fields?.contentBody3 && (
                <ArticleContent content={blog?.fields?.contentBody3} />
              )}
              {blog?.fields?.contentBody4 && (
                <ArticleContent content={blog?.fields?.contentBody4} />
              )}
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  const imageUrl = blog?.fields?.featuredImage?.fields?.file?.url;

  const fullImageUrl = imageUrl?.startsWith("http")
    ? imageUrl
    : `https:${imageUrl}`;
  return {
    title: `${blog?.fields?.title} - Confident AI`,
    description: blog?.fields?.metaDescription,
    metadataBase: "https://confident-ai.com",
    openGraph: {
      title: `${blog?.fields?.title} - Confident AI`,
      description: blog?.fields?.metaDescription,
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
      title: `${blog?.fields?.title} - Confident AI`,
      description: blog?.fields?.metaDescription,
      images: [fullImageUrl],
      creator: "@confident_ai",
    },
  };
}
