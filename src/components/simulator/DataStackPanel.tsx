import {useEffect, useState} from "react";
import {BG, GREY42} from "../../styles/color";
import {MainText, PanelDisplay, PanelMargin} from "../../styles/panelStyle";
import TopTab from "../common/TopTab";

const DataStackPanel = ({data, stack}: {data: object; stack: object}) => {
  const [dataList, setDataList] = useState<string[]>([]);
  const [stackList, setStackList] = useState<string[]>([]);
  useEffect(() => {
    const newDataList: string[] = [];
    Object.entries(data).map(([key, value]) =>
      newDataList.push(key + ": " + value)
    );
    setDataList(newDataList);
  }, [setDataList, data]);

  useEffect(() => {
    const newStackList: string[] = [];
    Object.entries(stack).map(([key, value]) =>
      newStackList.push(key + ": " + value)
    );
    setStackList(newStackList);
  }, [setStackList, stack]);

  return (
    <div style={{flexDirection: "row"}}>
      <TopTab title={"Data & Stack"} isBinary={false} />
      <div
        style={{
          flexDirection: "row",
          borderBottom: `1px solid ${GREY42}`,
        }}
      >
        <PanelDisplay width={"442px"} height={"330px"}>
          <MainText style={{textAlign: "left", marginBottom: "10px"}}>
            [Data]
          </MainText>
          {dataList.map((ele, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  textAlign: "left",
                  backgroundColor: BG,
                }}
              >
                <MainText>{ele}</MainText>
              </div>
            );
          })}
          <MainText
            style={{textAlign: "left", marginTop: "20px", marginBottom: "10px"}}
          >
            [Stack]
          </MainText>
          {stackList.map((ele, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  textAlign: "left",
                  backgroundColor: BG,
                }}
              >
                <MainText>{ele}</MainText>
              </div>
            );
          })}
          <PanelMargin />
        </PanelDisplay>
      </div>
    </div>
  );
};

export default DataStackPanel;
