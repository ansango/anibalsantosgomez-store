/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "../../.tina/__generated__/client";
import { useTina } from "tinacms/dist/edit-state";
import { Layout } from "../../components/layout";
import FourOhFour from "../404";

import { motion } from "framer-motion";
import { Lightbox } from "../../components/layout/lightbox";
import { NextSeoProps } from "next-seo";

const SeriePage = (props: AsyncReturnType<typeof getStaticProps>["props"]) => {
  const { prev, next, route } = props;

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const { product } = data;

  if (product && product.isPublished) {
    const {
      publishedAt,
      title,
      description,

      cover,
    } = product;

    return (
      <Layout rawData={data} data={data.global as any}>
        <motion.div
          key={route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hola
        </motion.div>
      </Layout>
    );
  }
  return <FourOhFour />;
};

export default SeriePage;

export const getStaticProps = async ({ params }) => {
  const allProducts = await (
    await client.queries.productConnection()
  ).data.productConnection.edges
    .map(({ node }) => node)
    .filter((serie) => serie.isPublished);

  const productIndex = allProducts
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1))
    .findIndex((serie) => serie._sys.filename === params.filename);

  const prevProduct = allProducts[productIndex - 1] || null;
  const nextProduct = allProducts[productIndex + 1] || null;

  const prev =
    (prevProduct && {
      title: prevProduct.title,
      route: prevProduct._sys.filename,
    }) ||
    null;
  const next =
    (nextProduct && {
      title: nextProduct.title,
      route: nextProduct._sys.filename,
    }) ||
    null;

  const tinaProps = await client.queries.productQuery({
    relativePath: `${params.filename}.mdx`,
  });

  return {
    props: {
      ...tinaProps,
      route: `product/${params.filename}`,
      prev,
      next,
    },
  };
};

export const getStaticPaths = async () => {
  const postsListData = await client.queries.productConnection();
  return {
    paths: postsListData.data.productConnection.edges.map((post) => ({
      params: {
        filename: post.node._sys.filename,
      },
    })),
    fallback: "blocking",
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
