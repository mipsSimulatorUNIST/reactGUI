import {
  MainNumber,
  HighlightedText,
  PanelDisplay,
  PanelMargin,
} from "../../styles/panelStyle";
import {BG, GREYCC} from "../../styles/color";
import {useRecoilState} from "recoil";
import {assemblyExecutedLine} from "../../recoil/state";
import {useState} from "react";

const ClickablePanel = ({
  data,
  highlightNumbers,
  highlightColor,
  width,
  height,
}: {
  data: string[];
  highlightNumbers: number[];
  highlightColor: string;
  width: string;
  height: string;
}) => {
  const [, setHighlightNumbers] = useRecoilState(assemblyExecutedLine);
  const [hoveringNum, setHoveringNum] = useState(-1);
  return (
    <PanelDisplay width={width} height={height}>
      {data.map((ele, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              textAlign: "left",
              backgroundColor: hoveringNum === index ? GREYCC : BG,
            }}
            onClick={() => {
              setHighlightNumbers([index]);
              setHoveringNum(index);
            }}
            onMouseOver={() => setHoveringNum(index)}
            onMouseOut={() => setHoveringNum(-1)}
          >
            <MainNumber>{index + 1}</MainNumber>
            <HighlightedText
              isHighlighted={highlightNumbers.includes(index)}
              color={highlightColor}
            >
              {ele}
            </HighlightedText>
          </div>
        );
      })}
      <PanelMargin />
    </PanelDisplay>
  );
};

export default ClickablePanel;
