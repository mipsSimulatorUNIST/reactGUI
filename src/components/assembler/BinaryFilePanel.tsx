import { BinaryFilePanelDisplay } from "../../styles/theme";
import { useRecoilValue } from "recoil";
import {
  selectedAssemblyFileState,
  selectedFileContentState,
} from "../../recoil/state";
import { useState } from "react";
import { assemble } from "mips-simulator-js/dist/main.js";
import { useEffect } from "react";
import TextTab from "../TextTab";

const BinaryFilePanel = () => {
  const selectedAssemblyFile = useRecoilValue(selectedAssemblyFileState);
  const selectedFileContent = useRecoilValue(selectedFileContentState);
  const [binaryInstruction, setBinaryInstruction] = useState<string[] | null>(
    null
  );

  useEffect(() => {
    if (selectedFileContent)
      setBinaryInstruction(assemble(selectedFileContent).split("\n"));
  }, [selectedFileContent]);

  return (
    <BinaryFilePanelDisplay>
      <TextTab
        title={selectedAssemblyFile.replace(".s", ".o")}
        data={binaryInstruction ? binaryInstruction : []}
      />
    </BinaryFilePanelDisplay>
  );
};

export default BinaryFilePanel;
