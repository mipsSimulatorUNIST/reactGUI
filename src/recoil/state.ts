import {atom} from "recoil";

export const selectedAssemblyFileState = atom<string>({
  key: "selectedAssemblyFileState",
  default: "example1.s",
});

export const selectedFileContentState = atom<string[] | null>({
  key: "selectedFileContentState",
  default: ["loading..."],
});

export const assemblyExecutedLine = atom<number[]>({
  key: "assemblyExecutedLine",
  default: [0],
});
