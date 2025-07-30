export const base = "74e7d9700020.ngrok-free.app";
// export const base = "";

export let baseUrl = `https://${base}/api`;
export let imgUrl = `https://${base}`;

if (!base) {
  baseUrl = `http://localhost:3001/api`;
  imgUrl = ` http://localhost:3001`;
}


export const TASKER = "TASKER"
export const POSTER = "POSTER"