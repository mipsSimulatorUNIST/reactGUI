import { useRecoilState, useRecoilValue } from "recoil";
import {
  IMapDetail,
  assemblyExecutedLine,
  assemblyHovering,
  binaryHovering,
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

const isVaildHovered = (highlightNumbers: number[], index: number): boolean => {
  return highlightNumbers.length === 1
    ? highlightNumbers.includes(index)
    : highlightNumbers[0] === index;
};

const convertLineNumBinaryToAssembly = (
  mappingTable: IMapDetail[] | null,
  index: number
): number[] => {
  if (mappingTable) {
    const hightlightList = mappingTable[index]["binary"].map((value) => {
      return value["lineNumber"];
    });
    return hightlightList;
  } else {
    return [0];
  }
};

const convertLineNumAssemblyToBinary = (
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

const getHoverInfo = (
  mappingTable: IMapDetail[] | null,
  assemblyLineNum: number,
  type: string
): string => {
  const binaryLineNum = convertLineNumAssemblyToBinary(
    mappingTable,
    assemblyLineNum
  );
  if (mappingTable) {
    let assemblyInstruction = "";
    binaryLineNum.forEach(
      (index) => (assemblyInstruction += mappingTable[index]["assembly"])
    );

    return type === "assembly"
      ? mappingTable[assemblyLineNum]["binary"][0]["data"]
      : assemblyInstruction;
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
  const mappingTable = useRecoilValue(mappingTableOutput);

  const [assemblyHoveringNum, setAssemblyHoveringNum] =
    useRecoilState(assemblyHovering);
  const [binaryHoveringNum, setBinaryHoveringNum] =
    useRecoilState(binaryHovering);
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
                    : convertLineNumAssemblyToBinary(mappingTable, index)
                );
              }}
              onMouseOver={() => {
                if (type === "assembly") {
                  setAssemblyHoveringNum([index]);
                  setBinaryHoveringNum(
                    convertLineNumBinaryToAssembly(mappingTable, index)
                  );
                } else {
                  setAssemblyHoveringNum(
                    convertLineNumAssemblyToBinary(mappingTable, index)
                  );
                  setBinaryHoveringNum([index]);
                }
              }}
              onMouseOut={() => {
                setAssemblyHoveringNum([-1]);
                setBinaryHoveringNum([-1]);
              }}
            >
              {isVaildHovered(highlightNumbers, index) && (
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
