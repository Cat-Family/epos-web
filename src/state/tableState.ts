import { atom } from "recoil";

const tableState = atom({
  key: "table",
  default: "未选择",
});

export default tableState;
