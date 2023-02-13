import { BinaryFilePanelDisplay } from "../../styles/theme";
import { useRecoilValue } from "recoil";
import {
  assemblyExecutedLine,
  selectedAssemblyFileState,
  selectedFileContentState,
} from "../../recoil/state";
import { useState } from "react";
import { assemble } from "mips-simulator-js";
import { useEffect } from "react";
import TextTab from "../TextTab";
import { HL_GREEN } from "../../styles/color";
import { ASSEMTESTDATA } from "../../assets/TestData";

import TopTab from "../TopTab";

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
      //const { output: binaryLsit, mappingDetail } = assemble(selectedFileContent, true, true);
      const { output: binaryLsit, mappingDetail } = ASSEMTESTDATA;
      setBinaryInstruction(binaryLsit);
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
  }, [assemblyHighlightNum]);

  return (
    <BinaryFilePanelDisplay>
      <TopTab
        title={selectedAssemblyFile.replace(".s", ".o")}
        isBinary={true}
      />
      <TextTab
        data={binaryInstruction || []}
        highlightNumbers={highlightNumbers}
        highlightColor={HL_GREEN}
      />
    </BinaryFilePanelDisplay>
  );
};

export default BinaryFilePanel;
