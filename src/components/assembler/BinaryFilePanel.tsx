import {useRecoilValue} from "recoil";
import {
  selectedAssemblyFileState,
  selectedFileContentState,
} from "../../recoil/state";
import {useState} from "react";
import {assemble} from "mips-simulator-js/dist/main.js";
import {useEffect} from "react";
import Panel from "../common/Panel";
import {HL_GREEN} from "../../styles/color";

const BinaryFilePanel = () => {
  const selectedAssemblyFile = useRecoilValue(selectedAssemblyFileState);
  const selectedFileContent = useRecoilValue(selectedFileContentState);
  const [binaryInstruction, setBinaryInstruction] = useState<string[] | null>(
    null
  );

  useEffect(() => {
    if (selectedFileContent)
      setBinaryInstruction(assemble(selectedFileContent).split("\n"));
  }, [selectedFileContent]);

  return (
    <Panel
      title={selectedAssemblyFile.replace(".s", ".o")}
      data={binaryInstruction ? binaryInstruction : []}
      highlightNumbers={[2, 10, 11]}
      highlightColor={HL_GREEN}
      width={"592px"}
    />
  );
};

export default BinaryFilePanel;
