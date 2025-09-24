// Import the Layout component to wrap the page with consistent site layout
import Layout from '../../components/layout';

// Import the Head component to set metadata for the page (e.g., title)
import Head from 'next/head';

// Import the custom Date component to format and display post dates
import Date from '../../components/date';

// Import CSS module for scoped styles
import utilStyles from '../../styles/utils.module.css';
 

import { getAllPostIds, getPostData } from '../../lib/posts-json';
 

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
 
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
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
        <h2 className={utilStyles.descText}>{postData.description}</h2>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

