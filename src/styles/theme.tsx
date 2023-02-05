import styled from "styled-components";
import { ROOTBG, GREYD4 } from "./color";

export const BackGround = styled.div`
  background-color: ROOTBG;
`;

export const MainScreen = styled.div`
  background-color: GREYD4;
  text-align: center;
  width: 1200px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 30px;
  border: 1px solid black;
`;

export const NavigationDisplay = styled.div`
  background-color: aliceblue;
  border: 2px solid orange;
`;

export const Body = styled.div`
  text-align: center;
  width: 90%;
  height: 90vh;
  display: flex;
  justify-content: center;
  background-color: powderblue;
  border: 3px solid purple;
`;

export const AssemblerBody = styled(Body)`
  background-color: gray;
  flex-direction: row;
`;

export const FileSelctorDisplay = styled.div`
  background-color: yellow;
  flex: 1;
`;

export const AssembleFilePanelDisplay = styled.div`
  background-color: green;
  flex: 2;
`;

export const BinaryFilePanelDisplay = styled.div`
  background-color: red;
  flex: 2;
`;

export const SimulatorBody = styled(Body)`
  background-color: skyblue;
`;

export const CacheBody = styled(Body)`
  background-color: pink;
`;
