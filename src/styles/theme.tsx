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
