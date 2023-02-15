import React, {useState} from "react";
import {NavigationDisplay, StyledLink} from "../../styles/theme";

import assemblerWhite from "../../assets/icons/assemblerWhite.png";
import assemblerGrey from "../../assets/icons/assemblerGrey.png";
import simulatorWhite from "../../assets/icons/simulatorWhite.png";
import simulatorGrey from "../../assets/icons/simulatorGrey.png";

const Navigation = () => {
  const [curTab, setCurTab] = useState("assembler");
  return (
    <NavigationDisplay>
      <StyledLink
        to="/"
        onClick={() => setCurTab("assembler")}
        style={{
          borderLeft: curTab === "assembler" ? "2px solid white" : "",
        }}
      >
        <img
          src={curTab === "assembler" ? assemblerWhite : assemblerGrey}
          alt="assembler"
          style={{
            width: "28px",
            height: "16px",
          }}
        />
      </StyledLink>

      <StyledLink
        to="/simulator"
        onClick={() => setCurTab("simulator")}
        style={{
          borderLeft: curTab === "simulator" ? "2px solid white" : "",
        }}
      >
        <img
          src={curTab === "simulator" ? simulatorWhite : simulatorGrey}
          alt="simulator"
          style={{
            width: "20px",
            height: "20px",
          }}
        />
      </StyledLink>
      {/* <div>
        <Link to="/cacheviewer" onClick={() => setCurTab("cacheviewer")}>
          캐쉬
        </Link>
      </div> */}
    </NavigationDisplay>
  );
};

export default Navigation;