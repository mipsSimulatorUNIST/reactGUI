import { useRecoilValue } from "recoil";
import {
  binaryInstructionsOutput,
  selectedAssemblyFileState,
} from "../../recoil/state";
import { assemble } from "mips-simulator-js/dist";
import Panel from "../common/Panel";
import { HL_GREEN } from "../../styles/color";

import TopTab from "../common/TopTab";

const BinaryFilePanel = () => {
  const selectedAssemblyFile = useRecoilValue(selectedAssemblyFileState);
  const binaryInstructions = useRecoilValue(binaryInstructionsOutput);

  return (
    <div style={{ flexDirection: "row" }}>
      <TopTab
        title={selectedAssemblyFile.replace(".s", ".o")}
        isBinary={true}
      />
      <Panel
        data={binaryInstructions || []}
        highlightColor={HL_GREEN}
        width={"592px"}
      />
    </div>
  );
};

export default BinaryFilePanel;
