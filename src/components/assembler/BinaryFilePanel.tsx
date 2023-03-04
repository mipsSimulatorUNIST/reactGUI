import {useRecoilValue} from "recoil";
import {
  binaryInstructionsOutput,
  selectedAssemblyFileState,
} from "../../recoil/state";
import ClickablePanel from "../common/ClickablePanel";
import TopTab from "../common/TopTab";
import { HL_GREEN } from "../../styles/color";

const BinaryFilePanel = ({
  highlightNumbers,
}: {
  highlightNumbers: number[];
}) => {
  const selectedAssemblyFile = useRecoilValue(selectedAssemblyFileState);
  const binaryInstructions = useRecoilValue(binaryInstructionsOutput);
  return (
    <div style={{flexDirection: "row"}}>
      <TopTab
        title={selectedAssemblyFile.replace(".s", ".o")}
        isBinary={true}
      />
      <ClickablePanel
        highlightNumbers={highlightNumbers}
        data={binaryInstructions || []}
        highlightColor={HL_GREEN}
        width={"592px"}
        type={"binary"}
        height={"740px"}
      />
    </div>
  );
};

export default BinaryFilePanel;
