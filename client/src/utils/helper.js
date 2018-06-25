const textNormalize = text => {
  // Convert camel case alike text to normal, if it's USD manually convert
  if (text === 'CrossRateUSD') return 'Cross Rate USD';
  return text.replace(/([A-Z])/g, ' $1');
};

export default textNormalize;
