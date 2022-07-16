import { atom } from "recoil";

const menuState = atom({
  key: "menu",
  default: [],
});

export default menuState;
