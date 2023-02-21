import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedAssemblyFileState,
  selectedFileContentState,
} from "../../recoil/state";
import Panel from "../common/Panel";
import { useEffect } from "react";
import { HL_ORANGE } from "../../styles/color";
import TopTab from "../common/TopTab";

const AssembleFilePanel = ({
  highlightNumbers,
}: {
  highlightNumbers: number[];
}) => {
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
    <div style={{ flexDirection: "row" }}>
      <TopTab title={selectedAssemblyFile} isBinary={false} />
      <Panel
        highlightNumbers={highlightNumbers}
        data={fileContent ? fileContent : []}
        highlightColor={HL_ORANGE}
        width={"592px"}
        type={"assembly"}
      />
    </div>
  );
};

export default AssembleFilePanel;
