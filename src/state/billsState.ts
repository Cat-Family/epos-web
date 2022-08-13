import { atom } from "recoil";

const billsState = atom({
  key: "bills",
  default: undefined,
});

export default billsState;
