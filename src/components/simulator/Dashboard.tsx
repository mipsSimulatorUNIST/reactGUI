import {GREY42, HL_GREEN, TEXT_GREEN} from "../../styles/color";
import {MainText, PanelDisplay, PanelMargin} from "../../styles/panelStyle";
import TopTab from "../common/TopTab";
import {simulatorOutputType} from "mips-simulator-js/dist/src/utils/functions";
const Dashboard = ({
  curState,
  prevState,
}: {
  curState: simulatorOutputType;
  prevState: simulatorOutputType;
}) => {
  const regChange = (curReg: object, prevReg: object) => {
    interface regChangeForm {
      reg: string;
      cur: string;
      prev: string;
    }
    const regList: regChangeForm[] = [];
    Object.entries(curReg).map((reg, index) => {
      if (reg[1] !== Object.entries(prevReg)[index][1]) {
        regList.push({
          reg: reg[0],
          cur: reg[1],
          prev: Object.entries(prevReg)[index][1],
        });
      }
    });
    return regList;
  };

  return (
    <div
      style={{
        flexDirection: "row",
        borderBottom: `1px solid ${GREY42}`,
      }}
    >
      <TopTab title={"Dashboard"} isBinary={false} />
      <PanelDisplay
        width={"442px"}
        height={"367px"}
        style={{textAlign: "left"}}
      >
        <MainText isHighlighted={false} color={""}>
          PC: {curState ? curState.PC : 0}
        </MainText>
        <MainText isHighlighted={false} color={""}>
          실행된 어셈블리 코드
        </MainText>
        <MainText
          isHighlighted={false}
          color={""}
          style={{color: TEXT_GREEN, marginBottom: "20px"}}
        >
          and $17, $17, $0
        </MainText>
        <MainText isHighlighted={false} color={""}>
          실행된 바이너리 코드
        </MainText>
        <MainText
          isHighlighted={false}
          color={""}
          style={{color: TEXT_GREEN, marginBottom: "20px"}}
        >
          and $17, $17, $0
        </MainText>
        <MainText isHighlighted={false} color={""}>
          변경된 레지스터
        </MainText>
        <MainText
          isHighlighted={false}
          color={""}
          style={{marginBottom: "20px"}}
        >
          {Object.entries(
            regChange(curState.registers, prevState.registers)
          ).map((item, index) => {
            return (
              <div key={index} style={{display: "flex", flexDirection: "row"}}>
                <div>{item[1].reg + ": "}</div>
                <div>{item[1].prev + " -> "} </div>
                <div style={{color: TEXT_GREEN}}>{item[1].cur}</div>
              </div>
            );
          })}
        </MainText>
        <PanelMargin />
      </PanelDisplay>
    </div>
  );
};

export default Dashboard;
