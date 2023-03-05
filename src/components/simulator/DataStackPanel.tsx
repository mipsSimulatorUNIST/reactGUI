import { useEffect, useState } from "react";
import TopTab from "../common/TopTab";
import { MainText, PanelDisplay, PanelMargin } from "../../styles/panelStyle";
import { GREY42 } from "../../styles/color";

const DataStackPanel = ({ data, stack }: { data: object; stack: object }) => {
  const [dataList, setDataList] = useState<string[]>([]);
  const [stackList, setStackList] = useState<string[]>([]);

  useEffect(() => {
    const newDataList = Object.entries(data).map(
      ([key, value]) => key + ": " + value
    );
    setDataList(newDataList);
  }, [setDataList, data]);

  useEffect(() => {
    const newStackList = Object.entries(stack).map(
      ([key, value]) => key + ": " + value
    );
    setStackList(newStackList);
  }, [setStackList, stack]);

  return (
    <div style={{ flexDirection: "row" }}>
      <TopTab title={"Data & Stack"} isBinary={false} />
      <div
        style={{
          flexDirection: "row",
          borderBottom: `1px solid ${GREY42}`,
        }}
      >
        <PanelDisplay width={"442px"} height={"330px"}>
          <MainText style={{ marginBottom: "10px" }}>[Data]</MainText>
          {dataList.map((ele, index) => (
            <MainText key={index}>{ele}</MainText>
          ))}
          <MainText style={{ marginTop: "20px", marginBottom: "10px" }}>
            [Stack]
          </MainText>
          {stackList.map((ele, index) => (
            <MainText key={index}>{ele}</MainText>
          ))}
          <PanelMargin />
        </PanelDisplay>
      </div>
    </div>
  );
};

export default DataStackPanel;
