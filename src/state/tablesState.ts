import { atom } from "recoil";

const tablesState = atom({
  key: "tables",
  default: [],
});

export default tablesState;
