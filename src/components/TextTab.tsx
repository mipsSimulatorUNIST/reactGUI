import {MainNumber, MainText, PanelTitle} from "../styles/\bfont";
import {BG} from "../styles/color";

const TextTab = ({
  title,
  data,
  highlightNumbers,
  highlightColor,
}: {
  title: string;
  data: string[];
  highlightNumbers: number[];
  highlightColor: string;
}) => {
  return (
    <div>
      <div style={{display: "flex", justifyContent: "flex-start"}}>
        <PanelTitle>{title}</PanelTitle>
      </div>
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
