import { getBlog } from "@/functions/get-blogs";
import GlobalLayout from "@/app/global-layout";
import ArticleContent from "@/components/blog/articleContent/articleContent";
import ArticleHeader from "@/components/blog/articleHeader/articleHeader";
import Callout from "@/components/blog/callout/callout";
import SideBar from "@/components/blog/sidebar/sidebar";
import Blogs from "@/components/blog/blogs";
import styles from "./styles.module.scss";

export default async function Page({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  const theme = blog?.fields?.theme[0] || "deepEval";
  return (
    <GlobalLayout staticHeader={true}>
      <div
        className={styles.Article}
        style={{ backgroundColor: !blog || !blog.fields ? "#0e0e13" : "" }}
      >
        <div className={styles.inner}>
          {!blog || !blog.fields ? (
            <>
              <h1 className={styles.notFoundTitle}>404</h1>
              <h2 className={styles.notFoundSubHeading}>
                Seems like you got lost, here are our latest articles:
              </h2>
              <div className="wrap" style={{ padding: "0 20px" }}>
                <Blogs
                  limit={3}
                  blogOrientation="horizontal"
                  blogVariant="dark"
                />
              </div>
            </>
          ) : (
            <>
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
                  {Object.entries(blog?.fields || {})
                    .filter(
                      ([key]) =>
                        key.startsWith("contentBody") && blog.fields[key]
                    )
                    .map(([key, value], idx, arr) => {
                      const isLast = idx === arr.length - 1;
                      return (
                        <ArticleContent
                          key={key}
                          content={value}
                          isLast={isLast}
                        />
                      );
                    })}
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
            </>
          )}
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
    title: `${blog?.fields?.title || "404 Page not found"} - Confident AI`,

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
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog?.fields?.title} - Confident AI`,
      description: blog?.fields?.excerpt,
      images: [fullImageUrl],
    },
  };
}
