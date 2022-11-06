import { atom } from "recoil";

const cartAtom = atom({
  key: "cart",
  default: {
    sku: {},
  },
});

export default cartAtom;
