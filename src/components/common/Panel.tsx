import {
  HoveringInfo,
  MainNumber,
  MainText,
  PanelBody,
  PanelDisplay,
  PanelMargin,
} from "../../styles/panelStyle";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  IMapDetail,
  assemblyExecutedLine,
  mappingTableOutput,
} from "../../recoil/state";
import { useState } from "react";

const getHoverInfo = (
  mappingTable: IMapDetail[] | null,
  lineNums: number,
  type: string
): string => {
  if (mappingTable) {
    return type === "assemble"
      ? mappingTable[lineNums]["binary"][0]["data"]
      : mappingTable[lineNums]["assembly"];
  } else {
    return "";
  }
};

const Panel = ({
  highlightNumbers,
  data,
  highlightColor,
  width,
  type,
}: {
  highlightNumbers: number[];
  data: string[];
  highlightColor: string;
  width: string;
  type: string;
}) => {
  const [, setHighlightNumbers] = useRecoilState(assemblyExecutedLine);
  const [hoveringNum, setHoveringNum] = useState(-1);
  const mappingTable = useRecoilValue(mappingTableOutput);

  return (
    <PanelDisplay width={width}>
      <PanelBody>
        {data.map((ele, index) => {
          return (
            <div
              key={index}
              style={{ textAlign: "left" }}
              onClick={() => {
                setHighlightNumbers([index]);
                setHoveringNum(index);
              }}
              onMouseOver={() => setHoveringNum(index)}
              onMouseOut={() => setHoveringNum(-1)}
            >
              {hoveringNum === index ? (
                <HoveringInfo>
                  {getHoverInfo(mappingTable, hoveringNum, type)}
                </HoveringInfo>
              ) : null}
              <div style={{ display: "flex" }}>
                <MainNumber>{index + 1}</MainNumber>
                <MainText
                  isHighlighted={highlightNumbers.includes(index)}
                  color={highlightColor}
                >
                  {ele}
                </MainText>
              </div>
            </div>
          );
        })}
        <PanelMargin />
      </PanelBody>
    </PanelDisplay>
  );
};

export default Panel;
