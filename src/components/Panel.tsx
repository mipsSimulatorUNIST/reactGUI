import React from "react";
import { PanelTitle } from "../styles/\bfont";
import playIcon from "../assets/icons/play.png";
import resetIcon from "../assets/icons/reset.png";

const Panel = ({ title, isBinary }: { title: string; isBinary: boolean }) => {
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
            onClick={() => console.log("play")}
            style={{
              width: "20px",
              height: "24px",
            }}
          />
          <img
            src={playIcon}
            alt="play"
            onClick={() => console.log("play")}
            style={{
              width: " 16px",
              height: " 18px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Panel;
