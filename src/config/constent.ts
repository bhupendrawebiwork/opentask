export const base = "9b24d0e87d0a.ngrok-free.app";
// export const base = "";

export let baseUrl = `https://${base}/api`;
export let imgUrl = `https://${base}`;

if (!base) {
  baseUrl = `http://localhost:3001/api`;
  imgUrl = ` http://localhost:3001`;
}


export const TASKER = "TASKER"
export const POSTER = "POSTER"