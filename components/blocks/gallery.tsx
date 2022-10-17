import { Template } from "../../.tina/schema";
import img from "../../public/1.jpg";
import { Container } from "../util/container";
import { Image } from "../util/image";
import { Section } from "../util/section";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const variants: Variants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  hidden: { opacity: 0, scale: 1 },
};

export const Gallery = () => {
  const control = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
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
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="p-5 2xl:p-10 aspect-square flex items-center justify-center"
              style={{
                backgroundImage: `url('${img.src}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div>
                <div className="p-1 bg-white sm:p-2 lg:p-5">
                  <Image url="https://asg-cms.s3.eu-west-3.amazonaws.com/43-junio-2022-kodak-gold-200/11/2048x1365.webp" />
                </div>
              </div>
            </div>
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
