import React from "react";

type Props = {
  title: string;
  description: string;
};

function Heading({ title, description }: Props) {
  return (
    <section className="flex flex-col gap-2">
      <h4 className="text-base font-semibold whitespace-pre-line md:text-xl">
        {title}
      </h4>
      <p className="whitespace-pre-line text sm md:text-base">{description}</p>
    </section>
  );
}

export default Heading;
