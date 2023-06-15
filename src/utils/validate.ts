export function validate(s: string) {
  const rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}
