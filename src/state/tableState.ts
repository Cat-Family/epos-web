import { atom } from "recoil";

const tableState = atom({
    key: "table",
    default: [],
});

export default tableState;
