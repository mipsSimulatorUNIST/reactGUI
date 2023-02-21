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
    return type === "assembly"
      ? mappingTable[lineNums]["binary"][0]["data"]
      : mappingTable[lineNums]["assembly"];
  } else {
    return "";
  }
};

const convertLineNumAssemToBinary = (
  mappingTable: IMapDetail[] | null,
  index: number
): number[] => {
  if (mappingTable) {
    const returnValue = mappingTable.findIndex((element) =>
      element["binary"].some((e) => e["lineNumber"] === index)
    );
    return [returnValue];
  } else {
    return [0];
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
              style={{
                display: "flex",
                textAlign: "left",
              }}
              onClick={() => {
                type === "assembly"
                  ? setHighlightNumbers([index])
                  : setHighlightNumbers(
                      convertLineNumAssemToBinary(mappingTable, index)
                    );
                setHoveringNum(index);
              }}
              onMouseOver={() => setHoveringNum(index)}
              onMouseOut={() => setHoveringNum(-1)}
            >
              <MainNumber>{index + 1}</MainNumber>
              <MainText
                isHighlighted={highlightNumbers.includes(index)}
                color={highlightColor}
              >
                {ele}
              </MainText>
            </div>
          );
        })}
        <PanelMargin />
      </PanelBody>
    </PanelDisplay>
  );
};

export default Panel;
