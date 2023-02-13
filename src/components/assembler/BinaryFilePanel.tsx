import { BinaryFilePanelDisplay } from "../../styles/theme";
import { useRecoilValue } from "recoil";
import {
  selectedAssemblyFileState,
  selectedFileContentState,
} from "../../recoil/state";
import { useState } from "react";
import { assemble } from "mips-simulator-js";
import { useEffect } from "react";
import TextTab from "../TextTab";
import { HL_GREEN } from "../../styles/color";

const TESTDATA = {
  output: [
    "00000000000000000000000001011000",
    "00000000000000000000000000001100",
    "00000010001000001000100000100100",
    "00000010010000001001000000100100",
    "00111100000010000001000000000000",
    "00111100000010010001000000000000",
    "00110101001010010000000000000100",
    "00000001010000000101000000100100",
    "00000001011000000101100000100100",
    "00100010001100010000000000000001",
    "00100001011010110000000000000001",
    "00000001001000000100100000100101",
    "00010101011010001111111111111100",
    "00100010010100100000000000000010",
    "00100001011010110000000000000001",
    "00000000000100011001000001000000",
    "00000000000100101000100001000010",
    "00000010001100101001100000100100",
    "00010101011010011111111111111010",
    "00000000101111110010100000100000",
    "00000010001100101000000000100111",
    "00010001010010000000000000000001",
    "00001000000100000000000000000110",
    "00110110000100001111000011110000",
    "00000000000000000000000001100100",
    "00000000000000000000000011001000",
    "00010010001101000101011001111000",
  ],
  mappingDetail: [
    { key: 0, assembly: "\t.data", binary: [] },
    { key: 1, assembly: "data1:\t.word\t100", binary: [] },
    { key: 2, assembly: "data2:\t.word\t200", binary: [] },
    { key: 3, assembly: "data3:\t.word\t0x12345678", binary: [] },
    { key: 4, assembly: "\t.text", binary: [] },
    { key: 5, assembly: "main:", binary: [] },
    { key: 6, assembly: "\tand\t$17, $17, $0", binary: [Array] },
    { key: 7, assembly: "\tand\t$18, $18, $0", binary: [Array] },
    { key: 8, assembly: "\tla\t$8, data1", binary: [Array] },
    { key: 9, assembly: "\tla\t$9, data2", binary: [Array] },
    { key: 10, assembly: "\tand\t$10, $10, $0", binary: [Array] },
    { key: 11, assembly: "lab1:", binary: [] },
    { key: 12, assembly: "\tand\t$11, $11, $0", binary: [Array] },
    { key: 13, assembly: "lab2:", binary: [] },
    { key: 14, assembly: "\taddi\t$17, $17, 0x1", binary: [Array] },
    { key: 15, assembly: "\taddi\t$11, $11, 0x1", binary: [Array] },
    { key: 16, assembly: "\tor\t$9, $9, $0", binary: [Array] },
    { key: 17, assembly: "\tbne\t$11, $8, lab2", binary: [Array] },
    { key: 18, assembly: "lab3:", binary: [] },
    { key: 19, assembly: "\taddi\t$18, $18, 0x2", binary: [Array] },
    { key: 20, assembly: "\taddi\t$11, $11, 1", binary: [Array] },
    { key: 21, assembly: "\tsll\t$18, $17, 1", binary: [Array] },
    { key: 22, assembly: "\tsrl\t$17, $18, 1", binary: [Array] },
    { key: 23, assembly: "\tand\t$19, $17, $18", binary: [Array] },
    { key: 24, assembly: "\tbne\t$11, $9, lab3", binary: [Array] },
    { key: 25, assembly: "lab4:", binary: [] },
    { key: 26, assembly: "\tadd\t$5, $5, $31", binary: [Array] },
    { key: 27, assembly: "\tnor\t$16, $17, $18", binary: [Array] },
    { key: 28, assembly: "\tbeq\t$10, $8, lab5", binary: [Array] },
    { key: 29, assembly: "\tj\tlab1", binary: [Array] },
    { key: 30, assembly: "lab5:", binary: [] },
    { key: 31, assembly: "\tori\t$16, $16, 0xf0f0", binary: [Array] },
  ],
};

const BinaryFilePanel = () => {
  const selectedAssemblyFile = useRecoilValue(selectedAssemblyFileState);
  const selectedFileContent = useRecoilValue(selectedFileContentState);
  const [binaryInstruction, setBinaryInstruction] = useState<string[] | null>(
    null
  );

  useEffect(() => {
    if (selectedFileContent) {
      //const { output: binaryLsit, mappingDetail } = assemble(selectedFileContent, true, true);
      const { output: binaryLsit, mappingDetail } = TESTDATA;
      setBinaryInstruction(binaryLsit);
    }
  }, [selectedFileContent]);

  return (
    <BinaryFilePanelDisplay>
      <TextTab
        title={selectedAssemblyFile.replace(".s", ".o")}
        data={binaryInstruction ? binaryInstruction : []}
        highlightNumbers={[2, 10, 11]}
        highlightColor={HL_GREEN}
      />
    </BinaryFilePanelDisplay>
  );
};

export default BinaryFilePanel;
