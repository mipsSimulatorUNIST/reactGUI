import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  assemblyExecutedLine,
  binaryInstructionsOutput,
  mappingTableOutput,
  selectedFileContentState,
  selectedAssemblyFileState,
} from "../recoil/state";
import AssembleFilePanel from "../components/assembler/AssembleFilePanel";
import BinaryFilePanel from "../components/assembler/BinaryFilePanel";
import FileSelector from "../components/common/FileSelector";
import { AssemblerBody } from "../styles/theme";
import { assemble } from "mips-simulator-js";

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

  // const fetchFile = useCallback(
  //   async (filePath: string) => {
  //     console.log("fetchFile");
  //     await fetch(filePath)
  //       .then((response) => response.text())
  //       .then((text) => {
  //         setFileContent(text.split("\n"));
  //       });
  //   },
  //   [setFileContent]
  // );

  // const saveOutput = useCallback(() => {
  //   console.log("saveOutput");

  //   if (fileContent) {
  //     const { output: binaryList, mappingDetail } = assemble(fileContent, true);
  //     setBinaryInstructions(binaryList);
  //     setMappingTable(mappingDetail);
  //   }
  // }, [fileContent, setBinaryInstructions, setMappingTable]);

  useEffect(() => {
    const filePath = `sample_input/${selectedAssemblyFile}`;

    const fetchFile = async (filePath: string) => {
      console.log("fetchFile");
      await fetch(filePath)
        .then((response) => response.text())
        .then((text) => {
          setFileContent(text.split("\n"));
        });
    };

    const saveOutput = () => {
      console.log("saveOutput");
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
