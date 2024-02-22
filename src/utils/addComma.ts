export function addComma(price: number) {
  let numString = price.toString();

  if (numString.length > 3) {
    let groups = [];
    while (numString.length > 3) {
      groups.unshift(numString.slice(-3));
      numString = numString.slice(0, -3);
    }
    groups.unshift(numString);

    return groups.join(",");
  } else {
    return numString;
  }
}
