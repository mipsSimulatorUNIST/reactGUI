import React, {useState} from "react";
import {PanelTitle} from "../../styles/panelStyle";

import playIcon from "../../assets/icons/play.png";
import resetIcon from "../../assets/icons/reset.png";
import {
  assemblyExecutedLine,
  selectedFileContentState,
} from "../../recoil/state";
import {useRecoilState} from "recoil";

const TopTab = ({title, isBinary}: {title: string; isBinary: boolean}) => {
  const [, setHighlightNumbers] = useRecoilState(assemblyExecutedLine);
  const [fileContent] = useRecoilState(selectedFileContentState);
  const [isHovering, setIsHovering] = useState({reset: false, play: false});

  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
      <PanelTitle>{title}</PanelTitle>

      {isBinary && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={resetIcon}
            alt="reset"
            onClick={() => setHighlightNumbers([0])}
            style={{
              width: isHovering.reset ? "24px" : "20px",
              height: isHovering.reset ? "28px" : "24px",
              marginRight: "15px",
            }}
            onMouseOver={() => setIsHovering({reset: true, play: false})}
            onMouseOut={() => setIsHovering({reset: false, play: false})}
          />
          <img
            src={playIcon}
            alt="play"
            onClick={() => {
              setHighlightNumbers((preValues) =>
                fileContent?.length === preValues[0] + 1
                  ? [0]
                  : [preValues[0] + 1]
              );
            }}
            onMouseOver={() => setIsHovering({reset: false, play: true})}
            onMouseOut={() => setIsHovering({reset: false, play: false})}
            style={{
              width: isHovering.play ? "20px" : "16px",
              height: isHovering.play ? "22px" : "18px",
              marginRight: "20px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TopTab;
