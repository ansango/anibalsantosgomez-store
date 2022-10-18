import { FC, useState } from "react";
import { ProductQuery } from "../../.tina/__generated__/types";
import { Container } from "../util/container";
import { Image } from "../util/image";
import { Section } from "../util/section";
import img from "../../public/1.jpg";

type Pagination = {
  title: string;
  route: string;
};

export type ProductProps = {
  title: ProductQuery["product"]["title"];
  description: ProductQuery["product"]["description"];
  cover: ProductQuery["product"]["cover"];
  prev?: Pagination | null;
  next?: Pagination | null;
};

const component = () => {
  return {
    default: (cover) => (
      <div
        className="p-5 2xl:p-10 aspect-square flex items-center justify-center relative"
        style={{
          backgroundImage: `url('${img.src}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-1 bg-white sm:p-2 lg:p-5 shadow-2xl">
          <Image url={cover} />
        </div>
      </div>
    ),
  };
};

export const Product: FC<ProductProps> = ({
  prev,
  next,
  title,
  description,
  cover,
}) => {
    const {default } = component();

  const [Component, setComponent] = useState(default);

  return (
    <Section>
      <Container>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-5">
            <Component />

            <div className="grid grid-cols-6 gap-5">
              <div onClick={() => setComponent(component.default(cover))}>
                <Image url={cover} aspectRatio="square" />
              </div>
            </div>
          </div>
          <div>
            <div>{title}</div>
            <div>{description}</div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
