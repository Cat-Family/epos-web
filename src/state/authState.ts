import { atom } from "recoil";

const authAtom = atom({
  key: "token",
  default: {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  },
});

export default authAtom;
