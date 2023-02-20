import {useState} from "react";
import {useRecoilState} from "recoil";
import {assemblyExecutedLine} from "../../recoil/state";
import {GREY42, HL_GREEN, TEXT_GREEN} from "../../styles/color";
import {
  MainNumber,
  MainText,
  PanelDisplay,
  PanelMargin,
} from "../../styles/panelStyle";
import Panel from "../common/Panel";
import TopTab from "../common/TopTab";

const Dashboard = ({PC}: {PC: string}) => {
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
          PC: {PC}
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
          style={{color: TEXT_GREEN, marginBottom: "20px"}}
        >
          and $17, $17, $0
        </MainText>

        <PanelMargin />
      </PanelDisplay>
    </div>
  );
};

export default Dashboard;
