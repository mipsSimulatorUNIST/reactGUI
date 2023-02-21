import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  IMapDetail,
  assemblyExecutedLine,
  curHoverNumber,
  mappingTableOutput,
} from "../../recoil/state";
import {
  HoveringInfo,
  MainNumber,
  MainText,
  PanelBody,
  PanelDisplay,
  PanelMargin,
} from "../../styles/panelStyle";

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
    const assembleHighLightStates = mappingTable.filter((element) =>
      element["binary"].some((e) => e["lineNumber"] === index)
    );
    const returnValues = assembleHighLightStates.map((e) => e.key);
    return returnValues;
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
  const [assemblyHoveringNum, setAssemblyHoveringNum] =
    useRecoilState(curHoverNumber);
  const mappingTable = useRecoilValue(mappingTableOutput);
  const [binaryHoveringNum, setBinaryHoveringNum] = useState<number[] | null>(
    assemblyHoveringNum
  );

  useEffect(() => {
    const binaryHoveringList = convertLineNumAssemToBinary(
      mappingTable,
      assemblyHoveringNum[0]
    );
    setBinaryHoveringNum(binaryHoveringList);
  }, [assemblyHoveringNum]);

  return (
    <PanelDisplay width={width}>
      <PanelBody>
        {data.map((ele, index) => {
          return (
            <div
              key={index}
              style={{
                textAlign: "left",
                cursor: "pointer",
              }}
              onClick={() => {
                setHighlightNumbers(() =>
                  type === "assembly"
                    ? [index]
                    : convertLineNumAssemToBinary(mappingTable, index)
                );
              }}
              onMouseOver={() => {
                setAssemblyHoveringNum(() =>
                  type === "assembly"
                    ? [index]
                    : convertLineNumAssemToBinary(mappingTable, index)
                );
              }}
              onMouseOut={() => setAssemblyHoveringNum([-1])}
            >
              {highlightNumbers.includes(index) && (
                <HoveringInfo>
                  {getHoverInfo(mappingTable, index, type)}
                </HoveringInfo>
              )}
              <div style={{ display: "flex" }}>
                <MainNumber>{index + 1}</MainNumber>
                <MainText
                  isHighlighted={highlightNumbers.includes(index)}
                  isHovered={
                    type === "assembly"
                      ? assemblyHoveringNum?.includes(index)
                      : binaryHoveringNum?.includes(index)
                  }
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
