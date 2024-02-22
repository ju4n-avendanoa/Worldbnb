export function capitalize(name: string) {
  const nameArray = name.split(" ");
  const capitalized = nameArray.map(
    (string) => string[0].toLocaleUpperCase() + string.slice(1)
  );

  return capitalized.join(" ");
}
