import { atom, selector } from "recoil";
import { assemble } from "mips-simulator-js/dist/main.js";

export const selectedAssemblyFileState = atom<string>({
  key: "selectedAssemblyFileState",
  default: "example1.s",
});

const fetchFile = async (filePath: string) => {
  let data: string[] = [];

  return data;
};

export const binaryConvertedState = selector({
  key: "binaryConvertedState",
  get: async ({ get }) => {
    const filename = get(selectedAssemblyFileState);
    const filePath = `sample_input/${filename}`;
    let data: string[] = [];
    await fetch(filePath)
      .then((response) => response.text())
      .then((text) => {
        data = text.split("\n");
      });
    if (data) return assemble(data).split("\n");
    return [];
  },
});
