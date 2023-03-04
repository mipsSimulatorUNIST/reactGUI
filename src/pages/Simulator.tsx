import {assemble, simulator} from "mips-simulator-js";
import {SimulatorBody} from "../styles/theme";
import {useRecoilValue} from "recoil";
import {IMapDetail, selectedFileContentState} from "../recoil/state";
import {useEffect, useState} from "react";
import {simulatorOutputType} from "mips-simulator-js/dist/src/utils/functions";

import AssembleFilePanel from "../components/simulator/AssembleFilePanel";
import FileSelector from "../components/common/FileSelector";
import RegisterPanel from "../components/simulator/RegisterPanel";
import Dashboard from "../components/simulator/Dashboard";
import DataStackPanel from "../components/simulator/DataStackPanel";
import ControlBar from "../components/common/ControlBar";

export interface instructionSet {
  assembly: string;
  binary: string;
}
const Simulator = () => {
  const fileContent = useRecoilValue(selectedFileContentState);
  const [resultState, setResultState] = useState<simulatorOutputType | null>(
    null
  );
  const [historyState, setHistoryState] = useState<
    simulatorOutputType[] | null
  >(null);
  const [mappingTable, setMappingTable] = useState<IMapDetail[] | null>(null);
  const [pc, setPc] = useState<number>(0);
  const [curState, setCurState] = useState<simulatorOutputType>();
  const [prevState, setPrevState] = useState<simulatorOutputType>();
  const [space, setSpace] = useState<number>(1);
  const [instr, setInstr] = useState<instructionSet>();

  const getInstr = (
    pc: number,
    mappingTable: IMapDetail[] | null
  ): instructionSet => {
    const lineNumber = (pc - 0x00400000) / 4 + 2;
    if (mappingTable) {
      const filteredTable = mappingTable.filter(
        (instr) => instr.binary.length > 0
      );
      for (let instr of filteredTable) {
        for (let binary of instr.binary) {
          if (binary.lineNumber === lineNumber) {
            return {
              assembly: instr.assembly.trim(),
              binary: binary.data,
            };
          }
        }
      }
    }
    return {
      assembly: "",
      binary: "",
    };
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpace(parseInt(e.target.value));
  };

  const fetchSimulator = async (fileContent: string[] | null) => {
    if (fileContent) {
      const { output: binaryList, mappingDetail } = assemble(fileContent, true);
      setMappingTable(mappingDetail);
      console.log("mapping Detail : ", mappingDetail)
      const {result, history} = await simulator(fileContent, 1000, true);
      setResultState(result);
      setHistoryState(history);
      if (history) {
        setCurState(history[0]);
        setPrevState(history[0]);
      }
    }
  };

  const handleCounterNext = () => {
    if (historyState) {
      setPc((prev) => (historyState.length <= prev + space ? prev : prev + space));
    }
  };

  const handleCounterPrevious = () => {
    setPc((prev) => (prev - space>= 0 ? prev - space : prev));
  };

  useEffect(() => {
    fetchSimulator(fileContent);
    setPc(0);
  }, [fileContent]);

  useEffect(() => {
    if (historyState) {
      setCurState((prev) => {
        setPrevState(prev);
        return historyState[pc];
      });
      const instrObj = getInstr(parseInt(historyState[pc].PC), mappingTable);
      setInstr(instrObj);
    }
  }, [historyState, pc, mappingTable]);

  return (
    <SimulatorBody>
      <FileSelector />
      <AssembleFilePanel />
      <RegisterPanel
        register={curState ? curState.registers : []}
        prev={prevState ? prevState.registers : []}
      />
      <ControlBar
        cycle={pc}
        onChange={onChange}
        handleCounterNext={handleCounterNext}
        handleCounterPrevious={handleCounterPrevious}
        space={space}
      />
      <div>
        <Dashboard
          curState={
            curState
              ? curState
              : {PC: "", registers: {}, dataSection: {}, stackSection: {}}
          }
          prevState={
            prevState
              ? prevState
              : {PC: "", registers: {}, dataSection: {}, stackSection: {}}
          }
          instrState={
            instr
              ? instr
              : {
                  assembly: "",
                  binary: "",
                }
          }
        />
        <DataStackPanel
          data={curState ? curState.dataSection : []}
          stack={curState ? curState.stackSection : []}
        />
      </div>
    </SimulatorBody>
  );
};

export default Simulator;
