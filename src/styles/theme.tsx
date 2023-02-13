import {Link} from "react-router-dom";
import styled from "styled-components";
import {ROOTBG, GREYD4, GREY33, GREYCC, HL_BLUE, BG} from "./color";

export const BackGround = styled.div`
  background-color: ${ROOTBG};
  border: 2px solid ${BG};
  display: flex;
  justify-content: center;
`;

export const MainScreen = styled.div`
  background-color: ${GREYD4};
  text-align: center;
  display: flex;
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

export const FileSelectorDisplay = styled.div`
  background-color: ${ROOTBG};
  width: 200px;
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

interface selected {
  selectedAssemblyFile: string;
  element: string;
}

export const SelectedFile = styled.div<selected>`
  flex: 2.5;
  color: ${GREYCC};
  background-color: ${(props) =>
    props.selectedAssemblyFile === props.element ? HL_BLUE : ""};
  font-family: RobotoMonoTTFLight;
  font-size: 14px;
  padding-left: 4px;
  padding-top: 3px;
  padding-bottom: 3px;
  border: solid;
  border-color: #007fd4;
  border-width: ${(props) =>
    props.selectedAssemblyFile === props.element ? "1px" : "0px"};
`;
