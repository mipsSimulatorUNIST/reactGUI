import React from "react";
import { Link } from "react-router-dom";
import { NavigationDisplay } from "../styles/theme";

const Navigation = () => {
  return (
    <NavigationDisplay>
      <div>
        <Link to="/">홈</Link>
      </div>
      <div>
        <Link to="/simulator">시뮬레이터</Link>
      </div>
      <div>
        <Link to="/cacheviewer">캐쉬</Link>
      </div>
    </NavigationDisplay>
  );
};

export default Navigation;
