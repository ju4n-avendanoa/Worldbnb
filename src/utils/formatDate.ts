export function fromLongToShortDate(date: Date) {
  const fechaActual = date;

  const dia = ("0" + fechaActual.getDate()).slice(-2);
  const mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
  const año = fechaActual.getFullYear().toString().slice(-2);

  const fechaFormateada = `${dia}-${mes}-${año}`;
}

export function fromShortToLongDate(date: string) {
  const fechaString = "5-2-24";
  const partesFecha = fechaString.split("-");

  const dia = parseInt(partesFecha[0]);
  const mes = parseInt(partesFecha[1]);
  const año = parseInt(partesFecha[2]) + 2000;
  const fechaObjeto = new Date(año, mes - 1, dia);
}
