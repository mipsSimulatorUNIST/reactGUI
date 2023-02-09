import {Link} from "react-router-dom";
import styled from "styled-components";
import {ROOTBG, GREYD4, GREY33} from "./color";

export const BackGround = styled.div`
  background-color: ${ROOTBG};
`;

export const MainScreen = styled.div`
  flex: 1;
  height: 100vh;
  background-color: ${GREYD4};
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const NavigationDisplay = styled.div`
  background-color: ${GREY33};
`;

export const Body = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
`;

export const AssemblerBody = styled(Body)`
  background-color: ${ROOTBG};
  flex-direction: row;
`;

export const FileSelctorDisplay = styled.div`
  background-color: ${ROOTBG};
  flex: 1;
`;

export const AssembleFilePanelDisplay = styled.div`
  flex: 2.5;
`;

export const BinaryFilePanelDisplay = styled.div`
  flex: 2.5;
`;

export const SimulatorBody = styled(Body)`
  background-color: skyblue;
`;

export const CacheBody = styled(Body)`
  background-color: pink;
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
`;
