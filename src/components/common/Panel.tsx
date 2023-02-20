import {
  HoveringInfo,
  MainNumber,
  MainText,
  PanelBody,
  PanelDisplay,
  PanelMargin,
} from "../../styles/panelStyle";
import { BG, ROOTBG } from "../../styles/color";
import { useRecoilState } from "recoil";
import { assemblyExecutedLine } from "../../recoil/state";
import { useState } from "react";

const Panel = ({
  data,
  highlightNumbers,
  highlightColor,
  width,
}: {
  data: string[];
  highlightNumbers: number[];
  highlightColor: string;
  width: string;
}) => {
  const [, setHighlightNumbers] = useRecoilState(assemblyExecutedLine);
  const [hoveringNum, setHoveringNum] = useState(-1);
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
                <HoveringInfo>Hovering</HoveringInfo>
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
