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

export const MainScreen = styled.body`
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const Body = styled.body`
  text-align: center;
  width: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: powderblue;
`;

export const AssemblerBody = styled(Body)`
  background-color: gray;
`;

export const SimulatorBody = styled(Body)`
  background-color: skyblue;
`;

export const CacheBody = styled(Body)`
  background-color: pink;
`;
