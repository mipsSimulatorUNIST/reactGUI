import React from "react";
import {AssemblerBody} from "../styles/theme";
import AssembleFilePanel from "../components/assembler/AssembleFilePanel";
import BinaryFilePanel from "../components/assembler/BinaryFilePanel";
import FileSelector from "../components/common/FileSelector";

const Assembler = () => {
  return (
    <AssemblerBody>
      <FileSelector />
      <AssembleFilePanel />
      <BinaryFilePanel />
    </AssemblerBody>
  );
};

export default Assembler;
