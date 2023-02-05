import { atom, selector } from "recoil";
import { assemble } from "mips-simulator-js/dist/main.js";

export const selectedAssemblyFileState = atom<string>({
  key: "selectedAssemblyFileState",
  default: "example1.s",
});

export const selectedFileContentState = atom<string[] | null>({
  key: "selectedFileContentState",
  default: ["loading..."],
});
