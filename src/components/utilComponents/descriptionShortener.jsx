import React from "react";

const DescriptionShortener = ({ description }) => {
  const truncatedDescription =
    description.length > 250
      ? `${description.substring(0, 250)}...`
      : description;

  return <span>{truncatedDescription}</span>;
};

export default DescriptionShortener;
