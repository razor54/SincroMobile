
// This function was based on
// https://pt.wikipedia.org/wiki/N%C3%BAmero_de_identifica%C3%A7%C3%A3o_fiscal

export default function (nif) {
  let comparator;
  if (!['1', '2', '3', '5', '6', '8'].includes(nif.substr(0, 1)) &&
    !['45', '70', '71', '72', '77', '79', '90', '91', '98', '99'].includes(nif.substr(0, 2))) {
    return false;
  }
  // eslint-disable-next-line max-len,no-mixed-operators
  const total = nif[0] * 9 + nif[1] * 8 + nif[2] * 7 + nif[3] * 6 + nif[4] * 5 + nif[5] * 4 + nif[6] * 3 + nif[7] * 2;
  const modulo11 = (Number(total) % 11);
  if (modulo11 == 1 || modulo11 == 0) {
    comparator = 0;
  } else {
    comparator = 11 - modulo11;
  }
  return nif[8] == comparator;
}