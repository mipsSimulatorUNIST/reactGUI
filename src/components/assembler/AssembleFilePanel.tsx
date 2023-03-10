import { useRecoilValue } from "recoil";
import {
  selectedAssemblyFileState,
  selectedFileContentState,
} from "../../recoil/state";
import ClickablePanel from "../common/ClickablePanel";
import TopTab from "../common/TopTab";
import { HL_ORANGE } from "../../styles/color";

const AssembleFilePanel = ({
  highlightNumbers,
}: {
  highlightNumbers: number[];
}) => {
  const selectedAssemblyFile = useRecoilValue(selectedAssemblyFileState);
  const fileContent = useRecoilValue(selectedFileContentState);

  return (
    <div style={{ flexDirection: "row" }}>
      <TopTab title={selectedAssemblyFile} isBinary={false} />
      <ClickablePanel
        highlightNumbers={highlightNumbers}
        data={fileContent || []}
        highlightColor={HL_ORANGE}
        width={"592px"}
        height={"740px"}
        type={"assembly"}
      />
    </div>
  );
};

export default AssembleFilePanel;
