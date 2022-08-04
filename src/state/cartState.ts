import { atom } from "recoil";

const authAtom = atom({
  key: "cart",
  default: {
    sku: {},
  },
});

export default authAtom;
