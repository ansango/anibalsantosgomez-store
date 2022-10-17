import { useEffect, useState } from "react";
import { client } from "../../.tina/__generated__/client";

export const useAllProductsQuery = () => {
  const [data, setProducts] = useState({
    loading: true,
    products: null,
  });

  useEffect(() => {
    client.queries
      .productsPublishedQuery()
      .then((res) => {
        setProducts({
          loading: false,
          products: res.data.productConnection.edges
            .map((edge) => edge.node)
            .sort((a, b) => {
              return (
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
              );
            }),
        });
      })
      .catch((err) => {
        console.error(err);
        setProducts({
          loading: false,
          products: null,
        });
      });
    return () => {
      setProducts({
        loading: false,
        products: null,
      });
    };
  }, []);
  return data;
};
