import { atom } from "recoil";

const storeAtom = atom({
  key: "storeInfo",
  default: localStorage.getItem("storeInfo"),
});

export default storeAtom;
