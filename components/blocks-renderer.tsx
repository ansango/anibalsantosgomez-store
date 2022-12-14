import React from "react";
import type { Page } from "../.tina/__generated__/types";
import {
  Hero,
  Content,
  ContactForm,
  WrapperContent,
  Masonry,
  Gallery,
} from "./blocks";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map((block, i) => {
            switch (block.__typename) {
              case "PageBlocksContent":
                return (
                  <WrapperContent
                    parentField={`blocks.${i}`}
                    key={i + block.__typename}
                    highlight={block.highlight}
                  >
                    <Content body={block.body} />
                  </WrapperContent>
                );
              case "PageBlocksHero":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Hero data={block} parentField={`blocks.${i}`} />
                  </div>
                );

              case "PageBlocksContactForm":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <ContactForm data={block} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksMasonry":
                return (
                  <div
                    key={i + block.__typename}
                    data-tinafield={`blocks.${i}`}
                  >
                    <Masonry data={block} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksGallery":
                return (
                  <div
                    key={i + block.__typename}
                    data-tinafield={`blocks.${i}`}
                  >
                    <Gallery />
                  </div>
                );
              default:
                return null;
            }
          })
        : null}
    </>
  );
};
