import { atom } from "recoil";

const printerAtom = atom({
  key: "printerInfo",
  default: localStorage.getItem("printerInfo"),
});

export default printerAtom;
