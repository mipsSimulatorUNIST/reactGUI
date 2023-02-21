import React, { useEffect, useState } from "react";
import { AssemblerBody } from "../styles/theme";
import AssembleFilePanel from "../components/assembler/AssembleFilePanel";
import BinaryFilePanel from "../components/assembler/BinaryFilePanel";
import FileSelector from "../components/common/FileSelector";
import { useRecoilState, useRecoilValue } from "recoil";
import { assemble } from "mips-simulator-js";
import { ASSEMTESTDATA } from "../assets/TestData";
import {
  assemblyExecutedLine,
  binaryInstructionsOutput,
  mappingTableOutput,
  selectedFileContentState,
} from "../recoil/state";

const Assembler = () => {
  const selectedFileContent = useRecoilValue(selectedFileContentState);
  const assemblyHighlightNums = useRecoilValue(assemblyExecutedLine);
  const [, setBinaryInstructions] = useRecoilState(binaryInstructionsOutput);
  const [mappingTable, setMappingTable] = useRecoilState(mappingTableOutput);
  const [binaryHighlightNums, setBinaryHighlightNums] = useState(
    assemblyHighlightNums
  );

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
    if (mappingTable && assemblyHighlightNums[0] !== undefined) {
      const hightlightList = mappingTable[assemblyHighlightNums[0]][
        "binary"
      ].map((value) => {
        return value["lineNumber"];
      });
      setBinaryHighlightNums(hightlightList);
    }
  }, [assemblyHighlightNums, mappingTable]);

  return (
    <AssemblerBody>
      <FileSelector />
      <AssembleFilePanel highlightNumbers={assemblyHighlightNums} />
      <BinaryFilePanel highlightNumbers={binaryHighlightNums} />
    </AssemblerBody>
  );
};

export default Assembler;
