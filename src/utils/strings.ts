export const capitalizeFirstLetter = (value: string) => {
  const _value = value.toLowerCase();
  return _value.charAt(0).toUpperCase() + _value.slice(1);
};
