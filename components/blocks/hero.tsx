import { type FC } from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";

import { useTheme } from "../layout";
import { monoBgColorsBlur, monoTextColors, primaryTextColors } from "../styles";

import { ImageSerie, type ImageProps } from "../util/image";
import { Template } from "../../.tina/schema";
import { formatDate } from "../../lib/utils";

type HeroData = {
  type?: "left" | "center" | string;
  tagline?: string;
  headline?: string;
  text?: string;
  image?: ImageProps;
};

const renderHero = (
  { type, headline, tagline, text }: HeroData,
  parentField,
  color,
  mono
) => {
  switch (type) {
    case "left": {
      return (
        <Container>
          <div className="flex flex-wrap items-center mx-auto 5xl:max-w-7xl">
            <div className="flex flex-col items-start mb-16 text-left lg:flex-grow lg:w-1/2 lg:pr-24 md:mb-0">
              {tagline && (
                <span
                  className={`mb-8 text-xs font-bold tracking-widest uppercase  ${primaryTextColors[color]}`}
                  data-tinafield={`${parentField}.tagline`}
                >
                  {tagline}
                </span>
              )}
              {headline && (
                <h1
                  className={`mb-8 text-5xl font-bold leading-none tracking-tighter ${monoTextColors[700][mono]} md:text-7xl`}
                  data-tinafield={`${parentField}.headline`}
                >
                  {headline}
                </h1>
              )}
              {text && (
                <p
                  className={`mb-8 text-base leading-relaxed text-left max-w-4xl ${monoTextColors[500][mono]}`}
                  data-tinafield={`${parentField}.text`}
                >
                  {text}
                </p>
              )}
            </div>
          </div>
        </Container>
      );
    }
    case "center": {
      return (
        <Container>
          <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
            <div className="flex flex-col w-full mb-12 text-center">
              {headline && (
                <h1
                  className={`max-w-5xl text-5xl font-bold leading-none tracking-tighter ${monoTextColors[700][mono]} md:text-7xl lg:max-w-7xl`}
                  data-tinafield={`${parentField}.headline`}
                >
                  {headline}
                </h1>
              )}
              {text && (
                <p
                  className={`max-w-xl mx-auto mt-8 text-base leading-relaxed text-center ${monoTextColors[500][mono]}`}
                  data-tinafield={`${parentField}.text`}
                >
                  {text}
                </p>
              )}
            </div>
          </div>
        </Container>
      );
    }
    default: {
      return null;
    }
  }
};

export const Hero: FC<{
  data: HeroData;
  parentField?: string;
}> = ({ data, parentField = "" }) => {
  const { color, mono } = useTheme();
  return <Section>{renderHero(data, parentField, color, mono)}</Section>;
};

export const heroBlockSchema: Template = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "",

    defaultItem: {
      tagline: "Your tagline",
      headline: "This Big Text is Totally Awesome",
      text: "Here's some text above the other text",
      type: "left",
    },
  },
  fields: [
    {
      name: "tagline",
      label: "Tagline",
      type: "string",
    },
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      type: "string",
      label: "Text",
      name: "text",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      label: "Type",
      name: "type",
      options: ["left", "center"],
    },
  ],
};
