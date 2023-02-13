import {
  MainNumber,
  MainText,
  PanelTitle,
  PanelBody,
  PanelDisplay,
} from "../../styles/panelStyle";
import {BG} from "../../styles/color";

const Panel = ({
  title,
  data,
  highlightNumbers,
  highlightColor,
  width,
}: {
  title: string;
  data: string[];
  highlightNumbers: number[];
  highlightColor: string;
  width: string;
}) => {
  return (
    <PanelDisplay width={width}>
      <PanelTitle>{title}</PanelTitle>
      <PanelBody>
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
      </PanelBody>
    </PanelDisplay>
  );
};

export default Panel;
