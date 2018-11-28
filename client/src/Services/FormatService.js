export const formatAddress = (a, full) => {
  let text = `${a.streetNumber} ${a.streetName}, ${a.postalCode}`;
  if (a.unitNumber) {
    text = `${a.unitNumber}-${text}`;
  }
  if (full) {
    text = `${text}, ${a.provinceOrState}, ${a.country}`;
  }
  return text;
};

export const formatDate = date =>
  `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`;