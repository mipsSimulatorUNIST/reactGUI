import {simulator} from "mips-simulator-js";
import AssembleFilePanel from "../components/simulator/AssembleFilePanel";
import FileSelector from "../components/common/FileSelector";
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

import nextIcon from "../assets/icons/next.png";
import prevIcon from "../assets/icons/prev.png";
import {diffList} from "../assets/functions";

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
  const [pc, setPc] = useState<number>(0);
  const [curState, setCurState] = useState<simulatorOutputType>();
  const [prevState, setPrevState] = useState<simulatorOutputType>();
  const [space, setSpace] = useState<number>(1);

  const onChange = (e: any) => {
    setSpace(e.target.value);
  };

  const fetchSimulator = async (fileContent: string[] | null) => {
    if (fileContent) {
      const {output: binaryList, mappingDetail} = ASSEMTESTDATA;
      setBinaryInstruction(binaryList);
      setMappingTable(mappingDetail);
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
      const historySize = historyState.length;
      setPc((prev: number) => {
        if (historySize <= prev * 1 + space * 1) {
          return prev;
        } else {
          return prev * 1 + space * 1;
        }
      });
    }
  };

  const handleCounterPrevious = () => {
    setPc((prev) => {
      if (prev - space >= 0) {
        return prev - space;
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
      setCurState((prev) => {
        setPrevState(prev);
        return historyState[pc];
      });
    }
  }, [historyState, pc]);

  return (
    <SimulatorBody>
      <FileSelector />
      <AssembleFilePanel />
      <RegisterPanel
        register={curState ? curState.registers : []}
        prev={prevState ? prevState.registers : []}
      />
      <div
        style={{
          backgroundColor: "252B32",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
          height: "40px",
          left: "100px",
          bottom: "100px",
        }}
      >
        <div style={{color: "white"}}>{pc}</div>
        <input
          name="cycle space"
          placeholder="cycle 간격"
          onChange={onChange}
          value={space}
        />
        <div
          onClick={handleCounterPrevious}
          style={{
            backgroundColor: "#252B32",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={prevIcon}
            alt={"prev"}
            style={{
              width: "20px",
              height: "20px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          />
        </div>
        <div
          onClick={handleCounterNext}
          style={{
            backgroundColor: "#252B32",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={nextIcon}
            alt={"next"}
            style={{
              width: "20px",
              height: "20px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          />
        </div>
      </div>
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
