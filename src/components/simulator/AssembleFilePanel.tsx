import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  assemblyExecutedLine,
  selectedAssemblyFileState,
  selectedFileContentState,
} from "../../recoil/state";
import TopTab from "../common/TopTab";
import ClickablePanel from "../common/ClickablePanel";
import { HL_ORANGE } from "../../styles/color";

const AssembleFilePanel = () => {
  const selectedAssemblyFile = useRecoilValue(selectedAssemblyFileState);
  const [fileContent, setFileContent] = useRecoilState(
    selectedFileContentState
  );
  const highlightNumbers = useRecoilValue(assemblyExecutedLine);

  useEffect(() => {
    const fetchFile = async (filePath: string) => {
      await fetch(filePath)
        .then((response) => response.text())
        .then((text) => {
          setFileContent(text.split("\n"));
        });
    };
    const filePath = `sample_input/${selectedAssemblyFile}`;
    fetchFile(filePath);
  }, [selectedAssemblyFile, setFileContent]);

  return (
    <div style={{ flexDirection: "row" }}>
      <TopTab title={selectedAssemblyFile} isBinary={false} />
      <ClickablePanel
        highlightNumbers={highlightNumbers}
        data={fileContent ? fileContent : []}
        highlightColor={HL_ORANGE}
        width={"420px"}
        height={"740px"}
        type={"assembly"}
      />
    </div>
  );
};

export default AssembleFilePanel;
