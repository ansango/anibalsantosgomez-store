import { Template } from "../../.tina/schema";
import img from "../../public/1.jpg";
import { Container } from "../util/container";
import { Image } from "../util/image";
import { Section } from "../util/section";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useAllProductsQuery } from "../../lib/hooks/queries";
import Link from "next/link";

const variants: Variants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  hidden: { opacity: 0, scale: 1 },
};

export const Gallery = () => {
  const { loading, products } = useAllProductsQuery();
  const control = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
    console.log(products)
  return (
    <Section>
      <Container>
        <motion.div
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={control}
          className="grid gap-2 grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-5 xl:gap-7"
        >
          {products &&
            products.map((product, i) => (
              <Link key={i} passHref href={`/product/${product._sys.filename}`}>
                <a
                  className="p-5 2xl:p-10 aspect-square flex items-center justify-center relative"
                  style={{
                    backgroundImage: `url('${img.src}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div>
                    <div className="p-1 bg-white sm:p-2 lg:p-5">
                      <Image url={product.cover} />
                    </div>
                  </div>
                  <div className="opacity-0 hover:opacity-100 absolute h-full w-full transition-opacity duration-700 ease-in-out">
                    <div className="flex flex-col justify-center h-full relative">
                      <div className="text-center absolute w-full z-10">
                        <h3 className="text-2xl font-bold text-slate-900">
                          {product.title}
                        </h3>
                      </div>
                      <div className="absolute w-full h-full bg-slate-50 opacity-80"></div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
        </motion.div>
      </Container>
    </Section>
  );
};

export const galleyBlockSchema: Template = {
  label: "Gallery",
  name: "gallery",
  ui: {
    previewSrc: "",
  },
  fields: [
    {
      name: "label",
      label: "Label",
      type: "string",
    },
  ],
};
