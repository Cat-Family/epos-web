import { atom } from "recoil";

const basicAtom = atom({
  key: "basicInfo",
  default: JSON.stringify(localStorage.getItem("basicInfo")),
});

export default basicAtom;
