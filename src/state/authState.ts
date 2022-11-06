import { atom } from "recoil";

const authAtom = atom<any>({
  key: "authInfo",
  default: localStorage.getItem("authInfo"),
});
export default authAtom;
