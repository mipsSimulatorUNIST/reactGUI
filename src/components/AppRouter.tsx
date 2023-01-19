import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {MainScreen} from "../styles/theme";
import Assembler from "./Assembler";
import CacheViewer from "./CacheViewer";
import Navigation from "./Navigation";
import Simulator from "./Simulator";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <MainScreen>
        <Navigation />
        <Routes>
          <Route path="/" element={<Assembler />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/cache" element={<CacheViewer />} />
        </Routes>
      </MainScreen>
    </BrowserRouter>
  );
};

export default AppRouter;
