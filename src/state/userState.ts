import { atom } from "recoil";

const userInfoAtom = atom<any>({
  default: localStorage.getItem("userInfo"),
  key: "userInfo",
});

export default userInfoAtom;
