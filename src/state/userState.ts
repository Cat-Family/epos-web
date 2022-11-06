import { atom } from "recoil";

const userInfoAtom = atom<any>({
  default: JSON.parse(localStorage.getItem("userInfo")),
  key: "userInfo",
});

export default userInfoAtom;
