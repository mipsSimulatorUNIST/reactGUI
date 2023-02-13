import { MainNumber, MainText, PanelTitle } from "../styles/\bfont";
import { BG } from "../styles/color";

const TextTab = ({
  data,
  highlightNumbers,
  highlightColor,
}: {
  data: string[];
  highlightNumbers: number[];
  highlightColor: string;
}) => {
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
                backgroundColor: BG,
              }}
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
