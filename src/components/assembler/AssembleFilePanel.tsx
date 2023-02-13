import { useRecoilState, useRecoilValue } from "recoil";
import {
  assemblyExecutedLine,
  selectedAssemblyFileState,
  selectedFileContentState,
} from "../../recoil/state";
import { AssembleFilePanelDisplay } from "../../styles/theme";
import TextTab from "../TextTab";
import { useEffect } from "react";
import { HL_ORANGE } from "../../styles/color";
import Panel from "../Panel";

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
    <AssembleFilePanelDisplay>
      <Panel
        title={selectedAssemblyFile.replace(".s", ".o")}
        isBinary={false}
      />

      <TextTab
        data={fileContent || []}
        highlightNumbers={highlightNumbers}
        highlightColor={HL_ORANGE}
      />
    </AssembleFilePanelDisplay>
  );
};

export default AssembleFilePanel;
