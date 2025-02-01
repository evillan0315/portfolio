import React from "react";

type Props = {
  text?: string;
};

function FooterComponent({ text }: Props) {
  return <div className="min-h-5 text-center">{text}</div>;
}

export default FooterComponent;
