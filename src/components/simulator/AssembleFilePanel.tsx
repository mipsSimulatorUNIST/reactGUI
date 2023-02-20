import {useRecoilState, useRecoilValue} from "recoil";
import {
  assemblyExecutedLine,
  selectedAssemblyFileState,
  selectedFileContentState,
} from "../../recoil/state";
import ClickablePanel from "../common/ClickablePanel";
import {useEffect} from "react";
import {HL_ORANGE} from "../../styles/color";
import TopTab from "../common/TopTab";

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
    <div style={{flexDirection: "row"}}>
      <TopTab title={selectedAssemblyFile} isBinary={false} />
      <ClickablePanel
        data={fileContent ? fileContent : []}
        highlightNumbers={highlightNumbers}
        highlightColor={HL_ORANGE}
        width={"420px"}
        height={"740px"}
      />
    </div>
  );
};

export default AssembleFilePanel;
