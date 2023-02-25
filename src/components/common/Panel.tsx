import {MainText, PanelDisplay, PanelMargin} from "../../styles/panelStyle";
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
            <MainText
              isHighlighted={highlightNumbers.includes(index)}
              color={highlightColor}
              style={{paddingLeft: "40px"}}
            >
              {ele}
            </MainText>
          </div>
        );
      })}
      <PanelMargin />
    </PanelDisplay>
  );
};

export default Panel;
