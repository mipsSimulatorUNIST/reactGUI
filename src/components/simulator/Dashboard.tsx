import {GREY42, GREYD4, TEXT_GREEN} from "../../styles/color";
import {MainText, PanelDisplay, PanelMargin} from "../../styles/panelStyle";
import TopTab from "../common/TopTab";
import {simulatorOutputType} from "mips-simulator-js/dist/src/utils/functions";
export const objectDiff = (curState: any, prevState: any) => {
  interface changeForm {
    address: string;
    cur: string | null;
    prev: string | null;
  }
  const displayList: changeForm[] = [];
  const addrList = Object.keys(prevState);
  const newAddrList = Object.keys(curState);
  for (let addr of addrList) {
    if (newAddrList.includes(addr)) {
      if (curState[addr] !== prevState[addr]) {
        displayList.push({
          address: addr,
          cur: curState[addr],
          prev: prevState[addr],
        });
      }
    } else {
      displayList.push({
        address: addr,
        cur: null,
        prev: prevState[addr],
      });
    }
  }
  const a = newAddrList.filter((element) => !addrList.includes(element));
  for (let addr of a) {
    displayList.push({
      address: addr,
      cur: curState[addr],
      prev: null,
    });
  }
  return displayList;
};
const Dashboard = ({
  curState,
  prevState,
}: {
  curState: simulatorOutputType;
  prevState: simulatorOutputType;
}) => {
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
          {/* {curState.instruction.assembly} */}
        </MainText>
        <MainText isHighlighted={false} color={""}>
          실행된 바이너리 코드
        </MainText>
        <MainText
          isHighlighted={false}
          color={""}
          style={{color: TEXT_GREEN, marginBottom: "20px"}}
        >
          00000010001000001000100000100100
          {/* {curState.instruction.binary} */}
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
            objectDiff(curState.registers, prevState.registers)
          ).map((item, index) => {
            return (
              <div key={index} style={{display: "flex", flexDirection: "row"}}>
                <div>{item[1].address + ": "}</div>
                <div>{item[1].prev + " -> "} </div>
                <div style={{color: TEXT_GREEN}}>{item[1].cur}</div>
              </div>
            );
          })}
        </MainText>
        <MainText isHighlighted={false} color={""}>
          변경된 데이터
        </MainText>
        <MainText
          isHighlighted={false}
          color={""}
          style={{marginBottom: "20px"}}
        >
          {Object.entries(
            objectDiff(curState.dataSection, prevState.dataSection)
          ).map((item, index) => {
            return (
              <div key={index} style={{display: "flex", flexDirection: "row"}}>
                <div>{item[1].address + ": "}</div>
                {item[1].prev ? (
                  <div>{item[1].prev} </div>
                ) : (
                  <div style={{color: GREYD4, opacity: 0.5}}>(--empty--) </div>
                )}
                -{">"}
                <div style={{color: TEXT_GREEN}}>
                  {item[1].cur ? (
                    <div> {item[1].cur}</div>
                  ) : (
                    <div style={{color: GREYD4, opacity: 0.5}}>
                      {" "}
                      (--empty--)
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </MainText>
        <MainText isHighlighted={false} color={""}>
          변경된 스택
        </MainText>
        <MainText
          isHighlighted={false}
          color={""}
          style={{marginBottom: "20px"}}
        >
          {Object.entries(
            objectDiff(curState.stackSection, prevState.stackSection)
          ).map((item, index) => {
            return (
              <div key={index} style={{display: "flex", flexDirection: "row"}}>
                <div>{item[1].address + ": "}</div>
                {item[1].prev ? (
                  <div>{item[1].prev} </div>
                ) : (
                  <div style={{color: GREYD4, opacity: 0.5}}>(--empty--) </div>
                )}
                -{">"}
                <div style={{color: TEXT_GREEN}}>
                  {item[1].cur ? (
                    <div> {item[1].cur}</div>
                  ) : (
                    <div style={{color: GREYD4, opacity: 0.5}}>
                      {" "}
                      (--empty--)
                    </div>
                  )}
                </div>
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
