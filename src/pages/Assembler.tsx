import React, { useEffect, useState } from "react";
import { AssemblerBody } from "../styles/theme";
import AssembleFilePanel from "../components/assembler/AssembleFilePanel";
import BinaryFilePanel from "../components/assembler/BinaryFilePanel";
import FileSelector from "../components/common/FileSelector";
import { useRecoilState, useRecoilValue } from "recoil";
import { ASSEMTESTDATA } from "../assets/TestData";
import {
  assemblyExecutedLine,
  binaryInstructionsOutput,
  mappingTableOutput,
  selectedFileContentState,
} from "../recoil/state";

const Assembler = () => {
  const selectedFileContent = useRecoilValue(selectedFileContentState);
  const assemblyHighlightNum = useRecoilValue(assemblyExecutedLine);
  const [, setBinaryInstructions] = useRecoilState(binaryInstructionsOutput);
  const [mappingTable, setMappingTable] = useRecoilState(mappingTableOutput);
  const [highlightNumbers, setHighlightNumbers] =
    useState(assemblyHighlightNum);

  useEffect(() => {
    if (selectedFileContent) {
      // const { output: binaryList, mappingDetail } = assemble(
      //   selectedFileContent,
      //   true,
      //   true
      // );
      const { output: binaryList, mappingDetail } = ASSEMTESTDATA;
      setBinaryInstructions(binaryList);
      setMappingTable(mappingDetail);
    }
  }, [selectedFileContent]);

  useEffect(() => {
    if (mappingTable && assemblyHighlightNum[0]) {
      const hightlightList = mappingTable[assemblyHighlightNum[0]][
        "binary"
      ].map((value) => {
        return value["lineNumber"];
      });
      setHighlightNumbers(hightlightList);
    }
  }, [assemblyHighlightNum, mappingTable]);

  return (
    <AssemblerBody>
      <FileSelector />
      <AssembleFilePanel highlightNumbers={assemblyHighlightNum} />
      <BinaryFilePanel highlightNumbers={highlightNumbers} />
    </AssemblerBody>
  );
};

export default Assembler;
