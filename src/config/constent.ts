export const base = "24de42cab4d6.ngrok-free.app";
// export const base = "";

export let baseUrl = `https://${base}/api`;
export let imgUrl = `https://${base}`;

if (!base) {
  baseUrl = `http://localhost:3001/api`;
  imgUrl = ` http://localhost:3001`;
}


export const TASKER = "TASKER"
export const POSTER = "POSTER"