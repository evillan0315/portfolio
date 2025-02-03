import React from "react";

type Props = {
  text?: string;
};

function FooterComponent({ text }: Props) {
  return <div className="min-h-5 text-center py-5">{text} Copyrights 2025 | Eddie Villanueva</div>;
}

export default FooterComponent;
