const textNormalize = text => {
  if (text === "CrossRateUSD") return "Cross Rate USD";
  return text.replace(/([A-Z])/g, " $1");
};

export default textNormalize;