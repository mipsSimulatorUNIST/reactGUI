import {simulator} from "mips-simulator-js";
import AssembleFilePanel from "../components/simulator/AssembleFilePanel";
import FileSelector from "../components/common/FileSelector";
import Panel from "../components/common/Panel";
import {HL_ORANGE} from "../styles/color";
import {SimulatorBody} from "../styles/theme";
import {useRecoilValue} from "recoil";
import {selectedFileContentState} from "../recoil/state";
import {useEffect, useState} from "react";
import {simulatorOutputType} from "mips-simulator-js/dist/src/utils/functions";
import RegisterPanel from "../components/simulator/RegisterPanel";
import Dashboard from "../components/simulator/Dashboard";
import DataStackPanel from "../components/simulator/DataStackPanel";
import {IMapDetail} from "../components/assembler/BinaryFilePanel";
import {ASSEMTESTDATA} from "../assets/TestData";

const Simulator = () => {
  const fileContent = useRecoilValue(selectedFileContentState);
  const [resultState, setResultState] = useState<simulatorOutputType | null>(
    null
  );
  const [historyState, setHistoryState] = useState<
    simulatorOutputType[] | null
  >(null);
  const [binaryInstruction, setBinaryInstruction] = useState<string[] | null>(
    null
  );
  const [mappingTable, setMappingTable] = useState<IMapDetail[] | null>(null);
  const [pc, setPc] = useState(0);
  const [register, setRegister] = useState<string[]>([]);
  const [dataSection, setDataSection] = useState<object>([]);
  const [stackSection, setStackSection] = useState<object>([]);

  const fetchSimulator = async (fileContent: string[] | null) => {
    if (fileContent) {
      const {output: binaryList, mappingDetail} = ASSEMTESTDATA;
      setBinaryInstruction(binaryList);
      setMappingTable(mappingDetail);
      console.log(binaryList);
      console.log(mappingDetail);
      const {result, history} = await simulator(fileContent, 1000, true);
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
      const entries = Object.entries(historyState[pc].registers);
      const newRegister = [];
      for (let i = 0; i < entries.length; i++) {
        const v = `R${i}: ` + entries[i][1];
        newRegister.push(v);
      }
      setRegister(newRegister);
      setDataSection(historyState[pc].dataSection);
      setStackSection(historyState[pc].stackSection);
    }
  }, [resultState, historyState, pc]);

  return (
    <SimulatorBody>
      <FileSelector />
      <AssembleFilePanel />
      <RegisterPanel register={register} />
      <div
        style={{
          backgroundColor: "grey",
          display: "flex",
          flexDirection: "row",
          width: "100px",
          height: "100px",
          position: "absolute",
          left: "100px",
          bottom: "100px",
        }}
      >
        <div>{pc}</div>
        <button onClick={handleCounterPrevious}>previous</button>
        <button onClick={handleCounterNext}>next</button>
      </div>
      <div>
        <Dashboard PC={historyState ? historyState[pc].PC : ""} />
        <DataStackPanel data={dataSection} stack={stackSection} />
      </div>
    </SimulatorBody>
  );
};

export default Simulator;
