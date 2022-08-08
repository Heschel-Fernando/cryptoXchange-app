import React from "react";

const Shorten = (address) => {
  return `${address.slice(0, 5)}.....${address.slice(address.length - 4)}`;
};

export default Shorten;
