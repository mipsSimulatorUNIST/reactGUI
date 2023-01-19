import React from "react";
import {Link} from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <div>
        <Link to="/">홈</Link>
      </div>
      <div>
        <Link to="/simulator">시뮬레이터</Link>
      </div>
      <div>
        <Link to="/cacheviewer">캐쉬</Link>
      </div>
    </nav>
  );
};

export default Navigation;
