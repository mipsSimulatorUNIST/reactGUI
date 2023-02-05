import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedAssemblyFileState,
  selectedFileContentState,
} from "../../recoil/tab";
import { AssembleFilePanelDisplay } from "../../styles/theme";
import TextTab from "../TextTab";
import { useEffect } from "react";

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
  }, [selectedAssemblyFile]);

  return (
    <AssembleFilePanelDisplay>
      <TextTab
        title={selectedAssemblyFile}
        data={fileContent ? fileContent : []}
      />
    </AssembleFilePanelDisplay>
  );
};

export default AssembleFilePanel;
