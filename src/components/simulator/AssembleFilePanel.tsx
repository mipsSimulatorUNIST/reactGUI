import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedAssemblyFileState,
  selectedFileContentState,
} from "../../recoil/state";
import TopTab from "../common/TopTab";
import ClickablePanel from "../common/ClickablePanel";
import { HL_ORANGE } from "../../styles/color";

const AssembleFilePanel = ({ highlighted }: { highlighted: number | null }) => {
  const selectedAssemblyFile = useRecoilValue(selectedAssemblyFileState);
  const [fileContent, setFileContent] = useRecoilState(
    selectedFileContentState
  );
  const [highlightedList, setHighlightedList] = useState<number[]>([]);

  useEffect(() => {
    const fetchFile = async (filePath: string) => {
      await fetch(filePath)
        .then((response) => response.text())
        .then((text) => {
          setFileContent(text.split("\n"));
        });
    };
    const filePath = `https://mipssimulatorunist.github.io/reactGUI/sample_input/${selectedAssemblyFile}`;
    // const filePath = `${
    //   process.env.NODE_ENV === "production"
    //     ? "https://mipssimulatorunist.github.io/reactGUI/"
    //     : process.env.REACT_APP_BASEPATH
    // }sample_input/${selectedAssemblyFile}`;
    fetchFile(filePath);
  }, [selectedAssemblyFile, setFileContent]);

  useEffect(() => {
    const newHighlighted: number[] = [];
    if (highlighted) {
      newHighlighted.push(highlighted);
    }
    setHighlightedList(newHighlighted);
  }, [highlighted]);

  return (
    <div style={{ flexDirection: "row" }}>
      <TopTab title={selectedAssemblyFile} isBinary={false} />
      <ClickablePanel
        highlightNumbers={highlightedList}
        data={fileContent ? fileContent : []}
        highlightColor={HL_ORANGE}
        width={"420px"}
        height={"740px"}
        type={"simulator"}
      />
    </div>
  );
};

export default AssembleFilePanel;
