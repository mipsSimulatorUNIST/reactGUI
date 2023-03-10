import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BackGround, MainScreen } from "./styles/theme";
import Assembler from "./pages/Assembler";
import CacheViewer from "./pages/CacheViewer";
import Navigation from "./components/common/Navigation";
import Simulator from "./pages/Simulator";

const AppRouter = () => {
  const basename =
    process.env.NODE_ENV === "production"
      ? "/reactGUI/"
      : process.env.REACT_APP_BASENAME;

  return (
    <BrowserRouter basename={basename}>
      <BackGround>
        <MainScreen>
          <Navigation />
          <Routes>
            <Route path="/" element={<Assembler />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/cacheviewer" element={<CacheViewer />} />
          </Routes>
        </MainScreen>
      </BackGround>
    </BrowserRouter>
  );
};

export default AppRouter;
