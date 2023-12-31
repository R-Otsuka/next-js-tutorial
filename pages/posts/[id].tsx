import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

// ①このファイルではどのルーティングをする可能性があるかチェック { params: {id }}
// ビルドする時に
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths, // [{ params: { id: 'ssg-ssr' } }, { params: { id: 'pre-rendering' } }]
    fallback: false, // 事前build以外のpathにアクセスした時の挙動、指定path以外なら404を返す。
  };
}

// 実際にデータを取ってくる { id, data }
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}


export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
