import React from "react";
import { PanelTitle } from "../styles/\bfont";
import playIcon from "../assets/icons/play.png";
import resetIcon from "../assets/icons/reset.png";
import { assemblyExecutedLine } from "../recoil/state";
import { useRecoilState } from "recoil";

const Panel = ({ title, isBinary }: { title: string; isBinary: boolean }) => {
  const [highlightNumbers, setHighlightNumbers] =
    useRecoilState(assemblyExecutedLine);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              width: "20px",
              height: "24px",
              marginRight: "15px",
            }}
          />
          <img
            src={playIcon}
            alt="play"
            onClick={() =>
              setHighlightNumbers((preValues) => [preValues[0] + 1])
            }
            style={{
              width: " 16px",
              height: " 18px",
              marginRight: "20px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Panel;
