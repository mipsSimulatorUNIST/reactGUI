import React from "react";
import { AssemblerBody } from "../styles/theme";
import AssembleFilePanel from "./assembler/AssembleFilePanel";
import BinaryFilePanel from "./assembler/BinaryFilePanel";
import FileSelctor from "./assembler/FileSelctor";

const Assembler = () => {
  return (
    <AssemblerBody>
      <FileSelctor />
      <AssembleFilePanel />
      <BinaryFilePanel />
    </AssemblerBody>
  );
};

export default Assembler;
