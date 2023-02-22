import React, { useEffect, useState } from "react";
import { AssemblerBody } from "../styles/theme";
import AssembleFilePanel from "../components/assembler/AssembleFilePanel";
import BinaryFilePanel from "../components/assembler/BinaryFilePanel";
import FileSelector from "../components/common/FileSelector";
import { useRecoilState, useRecoilValue } from "recoil";
import { assemble } from "mips-simulator-js";
import {
  assemblyExecutedLine,
  binaryInstructionsOutput,
  mappingTableOutput,
  selectedFileContentState,
  selectedAssemblyFileState,
} from "../recoil/state";

const Assembler = () => {
  const assemblyHighlightNums = useRecoilValue(assemblyExecutedLine);
  const selectedAssemblyFile = useRecoilValue(selectedAssemblyFileState);

  const [fileContent, setFileContent] = useRecoilState(
    selectedFileContentState
  );
  const [, setBinaryInstructions] = useRecoilState(binaryInstructionsOutput);
  const [mappingTable, setMappingTable] = useRecoilState(mappingTableOutput);

  const [binaryHighlightNums, setBinaryHighlightNums] = useState(
    assemblyHighlightNums
  );

  useEffect(() => {
    const filePath = `sample_input/${selectedAssemblyFile}`;

    const fetchFile = async (filePath: string) => {
      await fetch(filePath)
        .then((response) => response.text())
        .then((text) => {
          setFileContent(text.split("\n"));
        });
    };

    const saveOutput = () => {
      if (fileContent) {
        const { output: binaryList, mappingDetail } = assemble(
          fileContent,
          true
        );
        setBinaryInstructions(binaryList);
        setMappingTable(mappingDetail);
      }
    };

    fetchFile(filePath);
    saveOutput();
  }, [selectedAssemblyFile, fileContent]);

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
