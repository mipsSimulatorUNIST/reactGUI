import {
  HighlightedText,
  PanelDisplay,
  PanelMargin,
} from "../../styles/panelStyle";
import {BG} from "../../styles/color";

const Panel = ({
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
  return (
    <PanelDisplay width={width} height={height}>
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
            <HighlightedText
              isHighlighted={highlightNumbers.includes(index)}
              color={highlightColor}
              style={{paddingLeft: "40px"}}
              isHovered={false}
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

export default Panel;