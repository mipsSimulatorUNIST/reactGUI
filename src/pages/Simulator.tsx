import {useEffect, useState, useCallback} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {
  IMapDetail,
  binaryInstructionsOutput,
  selectedFileContentState,
  mappingTableOutput,
} from "../recoil/state";
import {assemble, simulator} from "mips-simulator-js";
import {SimulatorBody} from "../styles/theme";
import {simulatorOutputType} from "mips-simulator-js/dist/src/utils/functions";

import AssembleFilePanel from "../components/simulator/AssembleFilePanel";
import FileSelector from "../components/common/FileSelector";
import RegisterPanel from "../components/simulator/RegisterPanel";
import Dashboard from "../components/simulator/Dashboard";
import DataStackPanel from "../components/simulator/DataStackPanel";
import ControlBar from "../components/common/ControlBar";

export interface instructionSet {
  key: number | null;
  assembly: string;
  binary: string;
}

const NULL_STATE = {PC: "", registers: {}, dataSection: {}, stackSection: {}};
const NULL_INSTR = {key: null, assembly: "", binary: ""};

const getInstr = (
  pc: number,
  mappingTable: IMapDetail[] | null
): instructionSet => {
  const lineNumber = (pc - 0x00400000) / 4 + 2;
  if (mappingTable) {
    const filteredTable = mappingTable.filter(
      (instr) => instr.binary.length > 0 && !instr.assembly.includes(":")
    );
    for (let instr of filteredTable) {
      for (let binary of instr.binary) {
        if (binary.lineNumber === lineNumber) {
          return {
            key: instr.key,
            assembly: instr.assembly.trim(),
            binary: binary.data,
          };
        }
      }
    }
  }
  return NULL_INSTR;
};

const Simulator = () => {
  const fileContent = useRecoilValue(selectedFileContentState);
  const [, setBinaryInstructions] = useRecoilState(binaryInstructionsOutput);
  const [mappingTable, setMappingTable] = useRecoilState(mappingTableOutput);
  const [, setResultState] = useState<simulatorOutputType | null>(null);
  const [historyState, setHistoryState] = useState<
    simulatorOutputType[] | null
  >(null);
  const [pc, setPc] = useState<number>(0);
  const [curState, setCurState] = useState<simulatorOutputType>();
  const [prevState, setPrevState] = useState<simulatorOutputType>();
  const [space, setSpace] = useState<number>(1);
  const [instr, setInstr] = useState<instructionSet>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpace(parseInt(e.target.value));
  };

  const fetchSimulator = useCallback(
    async (fileContent: string[] | null) => {
      if (fileContent) {
        const {output: binaryList, mappingDetail} = assemble(fileContent, true);
        const {result, history} = await simulator(fileContent, 1000, true);

        setBinaryInstructions(binaryList);
        setMappingTable(mappingDetail);
        setResultState(result);
        setHistoryState(history);

        if (history) {
          setCurState(history[0]);
          setPrevState(history[0]);
        }
      }
    },
    [setBinaryInstructions, setMappingTable]
  );

  const handleCounterNext = () => {
    if (historyState) {
      setPc((prev) =>
        historyState.length <= prev + space ? prev : prev + space
      );
    }
  };

  const handleCounterPrevious = () => {
    setPc((prev) => (prev - space >= 0 ? prev - space : prev));
  };

  useEffect(() => {
    fetchSimulator(fileContent);
    setPc(0);
  }, [fileContent, fetchSimulator]);

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
      <AssembleFilePanel highlighted={instr ? instr.key : null} />
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
          curState={curState || NULL_STATE}
          prevState={prevState || NULL_STATE}
          instrState={instr || NULL_INSTR}
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
