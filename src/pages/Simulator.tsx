import { simulator } from "mips-simulator-js";
import AssembleFilePanel from "../components/assembler/AssembleFilePanel";
import FileSelector from "../components/common/FileSelector";
import Panel from "../components/common/Panel";
import { HL_ORANGE } from "../styles/color";
import { SimulatorBody } from "../styles/theme";
import { useRecoilValue } from "recoil";
import { selectedFileContentState } from "../recoil/state";
import { useEffect } from "react";

const Simulator = () => {
  const fileContent = useRecoilValue(selectedFileContentState);

  const fetchSimulator = async (fileContent: string[] | null) => {
    if (fileContent) {
      const { result, history } = await simulator(fileContent, 10, true);
      console.log(result);
      console.log(history);
    }
  };

  useEffect(() => {
    fetchSimulator(fileContent);
    return () => {};
  }, [fileContent]);

  return (
    <SimulatorBody>
      <FileSelector />
      <AssembleFilePanel />
      <Panel
        title={"test"}
        data={["one", "two", "three"]}
        highlightNumbers={[1, 3, 5]}
        highlightColor={HL_ORANGE}
        width={"592px"}
      />
    </SimulatorBody>
  );
};

export default Simulator;
