import { useRecoilValue } from "recoil";
import {
  assemblyExecutedLine,
  selectedAssemblyFileState,
  selectedFileContentState,
} from "../../recoil/state";
import { useState } from "react";

import { useEffect } from "react";
import Panel from "../common/Panel";
import { HL_GREEN } from "../../styles/color";
import { ASSEMTESTDATA } from "../../assets/TestData";

import TopTab from "../common/TopTab";

interface IBinaryData {
  lineNumber: number;
  data: string;
}
interface IMapDetail {
  key: number;
  assembly: string;
  binary: IBinaryData[];
}

const BinaryFilePanel = () => {
  const selectedAssemblyFile = useRecoilValue(selectedAssemblyFileState);
  const selectedFileContent = useRecoilValue(selectedFileContentState);
  const assemblyHighlightNum = useRecoilValue(assemblyExecutedLine);
  const [binaryInstruction, setBinaryInstruction] = useState<string[] | null>(
    null
  );
  const [mappingTable, setMappingTable] = useState<IMapDetail[] | null>(null);
  const [highlightNumbers, setHighlightNumbers] =
    useState(assemblyHighlightNum);

  useEffect(() => {
    if (selectedFileContent) {
      //const { output: binaryList, mappingDetail } = assemble(selectedFileContent, true, true);
      const { output: binaryList, mappingDetail } = ASSEMTESTDATA;
      setBinaryInstruction(binaryList);
      setMappingTable(mappingDetail);
    }
  }, [selectedFileContent]);

  useEffect(() => {
    if (mappingTable && assemblyHighlightNum[0]) {
      const hightlightList = mappingTable[assemblyHighlightNum[0]][
        "binary"
      ].map((value) => {
        return value["lineNumber"];
      });
      setHighlightNumbers(hightlightList);
    }
  }, [assemblyHighlightNum, mappingTable]);

  return (
    <div style={{ flexDirection: "row" }}>
      <TopTab
        title={selectedAssemblyFile.replace(".s", ".o")}
        isBinary={true}
      />
      <Panel
        data={binaryInstruction ? binaryInstruction : []}
        highlightNumbers={highlightNumbers}
        highlightColor={HL_GREEN}
        width={"592px"}
      />
    </div>
  );
};

export default BinaryFilePanel;
