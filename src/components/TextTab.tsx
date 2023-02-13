import { MainNumber, MainText } from "../styles/\bfont";
import { BG, GREYCC } from "../styles/color";
import { useRecoilState } from "recoil";
import { assemblyExecutedLine } from "../recoil/state";
import { useState } from "react";

const TextTab = ({
  data,
  highlightNumbers,
  highlightColor,
}: {
  data: string[];
  highlightNumbers: number[];
  highlightColor: string;
}) => {
  const [, setHighlightNumbers] = useRecoilState(assemblyExecutedLine);
  const [hoveringNum, setHoveringNum] = useState(-1);

  return (
    <div>
      <div
        style={{
          height: "calc(100vh - 42px)",
          overflow: "scroll",
          backgroundColor: BG,
        }}
      >
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
              <MainText
                isHighlighted={highlightNumbers.includes(index)}
                color={highlightColor}
              >
                {ele}
              </MainText>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TextTab;
