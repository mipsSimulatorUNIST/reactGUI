import { useRecoilValue } from "recoil";
import {
  binaryInstructionsOutput,
  selectedAssemblyFileState,
} from "../../recoil/state";
import Panel from "../common/Panel";
import { HL_GREEN } from "../../styles/color";
import TopTab from "../common/TopTab";

const BinaryFilePanel = ({
  highlightNumbers,
}: {
  highlightNumbers: number[];
}) => {
  const selectedAssemblyFile = useRecoilValue(selectedAssemblyFileState);
  const binaryInstructions = useRecoilValue(binaryInstructionsOutput);
  return (
    <div style={{ flexDirection: "row" }}>
      <TopTab
        title={selectedAssemblyFile.replace(".s", ".o")}
        isBinary={true}
      />
      <Panel
        highlightNumbers={highlightNumbers}
        data={binaryInstructions || []}
        highlightColor={HL_GREEN}
        width={"592px"}
        type={"binary"}
      />
    </div>
  );
};

export default BinaryFilePanel;
