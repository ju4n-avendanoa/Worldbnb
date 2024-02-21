export function fromLongToShortDate(date: Date | null) {
  if (!date) return;
  const dia = ("0" + date.getDate()).slice(-2);
  const mes = ("0" + (date.getMonth() + 1)).slice(-2);
  const año = date.getFullYear().toString().slice(-2);

  const fechaFormateada = `${dia}-${mes}-${año}`;
  return fechaFormateada;
}

export function fromShortToLongDate(date: string) {
  const partesFecha = date.split("-");

  const dia = parseInt(partesFecha[0]);
  const mes = parseInt(partesFecha[1]);
  const año = parseInt(partesFecha[2]) + 2000;
  const fechaObjeto = new Date(año, mes - 1, dia);
  return fechaObjeto;
}
