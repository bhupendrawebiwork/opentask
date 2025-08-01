// export const base = "42ba6fbd7462.ngrok-free.app";
export const base = "";

export let baseUrl = `https://${base}/api`;
export let imgUrl = `https://${base}`;

if (!base) {
  baseUrl = `http://localhost:3001/api`;
  imgUrl = `http://localhost:3001`;
}

export const TASKER = "TASKER";
export const POSTER = "POSTER";

export const getAvatarUrl = (avatar: string | null) => {
  if (!avatar || !avatar.trim()) return "/assets/profile.png";
  return `${imgUrl}${avatar.trim()}`;
};
