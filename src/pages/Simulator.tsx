import { simulator } from "mips-simulator-js";
import AssembleFilePanel from "../components/assembler/AssembleFilePanel";
import FileSelector from "../components/common/FileSelector";
import Panel from "../components/common/Panel";
import { HL_ORANGE } from "../styles/color";
import { SimulatorBody } from "../styles/theme";
import { useRecoilValue } from "recoil";
import { selectedFileContentState } from "../recoil/state";
import { useEffect, useState } from "react";
import { simulatorOutputType } from "mips-simulator-js/dist/src/utils/functions";

const Simulator = () => {
  const fileContent = useRecoilValue(selectedFileContentState);
  const [resultState, setResultState] = useState<simulatorOutputType | null>(
    null
  );
  const [historyState, setHistoryState] = useState<
    simulatorOutputType[] | null
  >(null);
  const [pc, setPc] = useState(0);
  const [register, setRegister] = useState<string[]>([]);

  const fetchSimulator = async (fileContent: string[] | null) => {
    if (fileContent) {
      const { result, history } = await simulator(fileContent, 1000, true);
      setResultState(result);
      setHistoryState(history);
    }
  };

  const handleCounterNext = () => {
    if (historyState) {
      const historySize = historyState.length;
      setPc((prev) => {
        if (historySize <= prev + 1) {
          return prev;
        } else return prev + 1;
      });
    }
  };

  const handleCounterPrevious = () => {
    setPc((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else return prev;
    });
  };

  useEffect(() => {
    fetchSimulator(fileContent);
    setPc(0);
    return () => {};
  }, [fileContent]);

  useEffect(() => {
    if (historyState) {
      console.log("REACT result: ", resultState);
      console.log("REACT history: ", historyState);
      console.log(historyState ? historyState[pc].registers : ["loading"]);

      const entries = Object.entries(historyState[pc].registers);
      const newRegister = [];
      for (let i = 0; i < entries.length; i++) {
        const v = entries[i][1];
        newRegister.push(v);
      }
      setRegister(newRegister);
    }
  }, [resultState, historyState, pc]);

  return (
    <SimulatorBody>
      <FileSelector />
      <div>{pc}</div>
      <button onClick={handleCounterPrevious}>previous</button>
      <button onClick={handleCounterNext}>next</button>
      <AssembleFilePanel />
      <Panel
        data={register ? register : ["loading"]}
        highlightNumbers={[1, 3, 5]}
        highlightColor={HL_ORANGE}
        width={"592px"}
      />
    </SimulatorBody>
  );
};

export default Simulator;
