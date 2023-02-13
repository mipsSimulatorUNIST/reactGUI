import {useRecoilState, useRecoilValue} from "recoil";
import {
  selectedAssemblyFileState,
  selectedFileContentState,
} from "../../recoil/state";
import {AssembleFilePanelDisplay} from "../../styles/theme";
import TextTab from "../TextTab";
import {useEffect} from "react";
import {HL_ORANGE} from "../../styles/color";

const AssembleFilePanel = () => {
  const selectedAssemblyFile = useRecoilValue(selectedAssemblyFileState);
  const [fileContent, setFileContent] = useRecoilState(
    selectedFileContentState
  );

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
      <TextTab
        title={selectedAssemblyFile}
        data={fileContent ? fileContent : []}
        highlightNumbers={[1, 3, 5]}
        highlightColor={HL_ORANGE}
      />
    </AssembleFilePanelDisplay>
  );
};

export default AssembleFilePanel;
