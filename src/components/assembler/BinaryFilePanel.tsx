import { BinaryFilePanelDisplay } from "../../styles/theme";
import { useRecoilValue } from "recoil";
import {
  selectedAssemblyFileState,
  selectedFileContentState,
} from "../../recoil/state";
import { useState } from "react";
import { assemble } from "mips-simulator-js";
import { useEffect } from "react";
import TextTab from "../TextTab";
import { HL_GREEN } from "../../styles/color";
import { ASSEMTESTDATA } from "../../assets/TestData";

import Panel from "../Panel";

const BinaryFilePanel = () => {
  const selectedAssemblyFile = useRecoilValue(selectedAssemblyFileState);
  const selectedFileContent = useRecoilValue(selectedFileContentState);
  const [binaryInstruction, setBinaryInstruction] = useState<string[] | null>(
    null
  );

  useEffect(() => {
    if (selectedFileContent) {
      //const { output: binaryLsit, mappingDetail } = assemble(selectedFileContent, true, true);
      const { output: binaryLsit, mappingDetail } = ASSEMTESTDATA;
      setBinaryInstruction(binaryLsit);
    }
  }, [selectedFileContent]);

  return (
    <BinaryFilePanelDisplay>
      <Panel title={selectedAssemblyFile.replace(".s", ".o")} isBinary={true} />

      <TextTab
        data={binaryInstruction || []}
        highlightNumbers={[2, 10, 11]}
        highlightColor={HL_GREEN}
      />
    </BinaryFilePanelDisplay>
  );
};

export default BinaryFilePanel;
