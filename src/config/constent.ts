export const base = "";
export let baseUrl = `https://${base}/api`;
export let imgUrl = `https://${base}`;

if (!base) {
  baseUrl = `http://localhost:3001/api`;
  imgUrl = ` http://localhost:3001`;
}
