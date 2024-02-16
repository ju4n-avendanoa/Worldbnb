import React from "react";

type Props = {
  title: string;
  description: string;
};

function Heading({ title, description }: Props) {
  return (
    <section className="flex flex-col gap-2">
      <h4 className="font-semibold text-base md:text-xl whitespace-pre-line">
        {title}
      </h4>
      <p className="text sm md:text-base whitespace-pre-line">{description}</p>
    </section>
  );
}

export default Heading;
