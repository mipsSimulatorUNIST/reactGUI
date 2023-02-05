import styled from "styled-components";

const backgroundColor = {
  active: "#1c7ed6",
  inactive: "#ae3ec9",
};

interface StyledButtonProps {
  readonly variant: "active" | "inactive";
}

export const ActiveTab = styled.button<StyledButtonProps>`
  background-color: ${(props) => backgroundColor[props.variant]};
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  margin: 0;
  cursor: pointer;
  transition: 0.1s background-color ease-in-out;
`;

export const MainScreen = styled.div`
  text-align: center;
  width: 1200px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 30px;
`;

export const Body = styled.div`
  text-align: center;
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  background-color: powderblue;
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
