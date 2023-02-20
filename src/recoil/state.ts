import { atom } from "recoil";

interface IBinaryData {
  lineNumber: number;
  data: string;
}
interface IMapDetail {
  key: number;
  assembly: string;
  binary: IBinaryData[];
}
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

export const binaryInstructionsOutput = atom<string[] | null>({
  key: "binaryInstructions",
  default: null,
});

export const mappingTableOutput = atom<IMapDetail[] | null>({
  key: "mappingTable",
  default: null,
});
