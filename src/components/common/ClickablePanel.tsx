import {useRecoilState, useRecoilValue} from "recoil";
import {
  IMapDetail,
  assemblyExecutedLine,
  assemblyHovering,
  binaryHovering,
  mappingTableOutput,
} from "../../recoil/state";
import {
  HighlightedText,
  HoveringInfo,
  Line,
  MainNumber,
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

    return type === "assembly" || type === "simulator"
      ? mappingTable[assemblyLineNum]["binary"][0]["data"]
      : assemblyInstruction;
  } else {
    return "";
  }
};

const ClickablePanel = ({
  highlightNumbers,
  data,
  highlightColor,
  width,
  height,
  type,
}: {
  highlightNumbers: number[];
  data: string[];
  highlightColor: string;
  width: string;
  height: string;
  type: string;
}) => {
  const [, setHighlightNumbers] = useRecoilState(assemblyExecutedLine);
  const mappingTable = useRecoilValue(mappingTableOutput);

  const [assemblyHoveringNum, setAssemblyHoveringNum] =
    useRecoilState(assemblyHovering);
  const [binaryHoveringNum, setBinaryHoveringNum] =
    useRecoilState(binaryHovering);

  const showHoveringInfo = (index: number) => {
    return (
      isVaildHovered(highlightNumbers, index) && (
        <HoveringInfo>{getHoverInfo(mappingTable, index, type)}</HoveringInfo>
      )
    );
  };

  const handleHighlight = (
    index: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setHighlightNumbers(() =>
      type === "assembly"
        ? [index]
        : convertLineNumAssemblyToBinary(mappingTable, index)
    );
  };

  const handleMouseOver = (
    index: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (type === "assembly") {
      setAssemblyHoveringNum([index]);
      setBinaryHoveringNum(convertLineNumBinaryToAssembly(mappingTable, index));
    } else {
      setAssemblyHoveringNum(
        convertLineNumAssemblyToBinary(mappingTable, index)
      );
      setBinaryHoveringNum([index]);
    }
  };

  const handleMouseOut = () => {
    setAssemblyHoveringNum([-1]);
    setBinaryHoveringNum([-1]);
  };

  return (
    <PanelDisplay width={width} height={height}>
      <PanelBody>
        {data.map((ele, index) => {
          return (
            <div
              key={index}
              onClick={(e) => handleHighlight(index, e)}
              onMouseOver={(e) => handleMouseOver(index, e)}
              onMouseOut={() => handleMouseOut()}
            >
              {showHoveringInfo(index)}
              <Line>
                <MainNumber>{index + 1}</MainNumber>
                <HighlightedText
                  isHighlighted={highlightNumbers.includes(index)}
                  isHovered={
                    type === "simulator"
                      ? false
                      : type === "assembly"
                      ? assemblyHoveringNum?.includes(index)
                      : binaryHoveringNum?.includes(index)
                  }
                  color={highlightColor}
                >
                  {ele}
                </HighlightedText>
              </Line>
            </div>
          );
        })}
        <PanelMargin />
      </PanelBody>
    </PanelDisplay>
  );
};

export default ClickablePanel;
