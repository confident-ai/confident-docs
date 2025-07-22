import { getBlog } from "@/functions/get-blogs";
import GlobalLayout from "@/app/global-layout";
import ArticleContent from "@/components/Blog/ArticleContent/ArticleContent";
import ArticleHeader from "@/components/Blog/ArticleHeader/ArticleHeader";
import Callout from "@/components/Blog/Callout/Callout";
import Feature from "@/components/Blog/Feature/Feature";
import SideBar from "@/components/Blog/SideBar/SideBar";
import styles from "./styles.module.scss";
export default async function Page({ params }) {
  const { slug } = params;

  const blog = await getBlog(slug);

  return (
    <GlobalLayout staticHeader={true}>
      <div className={styles.Article}>
        <div className={styles.inner}>
          <SideBar/>
          <div className={styles.contentWrap}>
            <ArticleHeader />
          <ArticleContent content={blog?.fields?.contentBody1} />
          <Feature/>
          </div>
          <Callout/>
        </div>
      </div>
    </GlobalLayout>
  );
}
