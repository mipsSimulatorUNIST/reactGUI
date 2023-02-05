import { useRecoilValue } from "recoil";
import {
  binaryConvertedState,
  selectedAssemblyFileState,
} from "../../recoil/tab";
import { AssembleFilePanelDisplay } from "../../styles/theme";
import TextTab from "../TextTab";
import { useEffect, useState } from "react";
import { assemble } from "mips-simulator-js/dist/main.js";
const datas = [
  "example1.s",
  "example2.s",
  "example3.s",
  "example4.s",
  "example5.s",
  "example6.s",
  "example7.s",
];
const AssembleFilePanel = () => {
  const selectedAssemblyFile = useRecoilValue(selectedAssemblyFileState);
  const binaryConverted = useRecoilValue(binaryConvertedState);

  return (
    <AssembleFilePanelDisplay>
      <TextTab title={selectedAssemblyFile} data={binaryConverted} />
    </AssembleFilePanelDisplay>
  );
};

export default AssembleFilePanel;
