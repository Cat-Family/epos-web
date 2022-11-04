import { atom } from "recoil";

const authAtom = atom({
  key: "authInfo",
  default: localStorage.getItem("authInfo"),
});

export default authAtom;
