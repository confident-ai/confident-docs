import { getBlog } from "@/functions/get-blogs";
import GlobalLayout from "@/app/global-layout";
import ArticleContent from "@/components/Blog/ArticleContent/ArticleContent";
import ArticleHeader from "@/components/Blog/ArticleHeader/ArticleHeader";
import Callout from "@/components/Blog/Callout/Callout";
import SideBar from "@/components/Blog/SideBar/SideBar";
import Blogs from "@/components/Blog/Blogs";
import styles from "./styles.module.scss";

export default async function Page({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  const theme = blog?.fields?.theme[0] || "deepEval";
  return (
    <GlobalLayout staticHeader={true}>
      <div className={styles.Article}>
        <div className={styles.inner}>
          <div className={`${styles.contentWrap}`}>
            <SideBar content={blog?.fields} mobile={true} theme={theme} />
            <ArticleHeader
              content={blog?.fields}
              updatedAt={blog?.sys?.updatedAt}
            />
            <div className={styles.mainContent}>
              <Callout theme={theme} />
              <img
                className={styles.featuredImage}
                src={blog?.fields?.featuredImage?.fields?.file?.url}
                alt="featured Image"
              />
              <SideBar content={blog?.fields} theme={theme} />
              <ArticleContent
                content={blog?.fields?.contentBody1}
                theme={theme}
              />
              {blog?.fields?.contentBody2 && (
                <ArticleContent
                  content={blog?.fields?.contentBody2}
                  theme={theme}
                />
              )}
              {blog?.fields?.contentBody3 && (
                <ArticleContent
                  content={blog?.fields?.contentBody3}
                  theme={theme}
                />
              )}
              {blog?.fields?.contentBody4 && (
                <ArticleContent
                  content={blog?.fields?.contentBody4}
                  theme={theme}
                />
              )}
            </div>
          </div>
          <div className={styles.blogWrap}>
            <h2 className={styles.blogHeading}>More stories from us...</h2>
            <Blogs
              limit={3}
              showTabs={false}
              blogOrientation="horizontal"
              blogVariant="light"
              exclude={slug}
              category={blog.fields.category[0]}
            />
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
    description: blog?.fields?.excerpt,
    metadataBase: "https://confident-ai.com",
    openGraph: {
      title: `${blog?.fields?.title} - Confident AI`,
      description: blog?.fields?.excerpt,
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
      description: blog?.fields?.excerpt,
      images: [fullImageUrl],
      creator: "@confident_ai",
    },
  };
}
