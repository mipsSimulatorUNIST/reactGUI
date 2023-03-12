import styled from "styled-components";
import {GREYD4} from "./color";
import {NoneDragImg} from "./theme";

export const BarDisplay = styled.div`
  background-color: #252b32;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  height: 40px;
  left: 100px;
  bottom: 100px;
  border: 1px solid powderblue;
  box-shadow: 4px 4px 8px #000;
`;

export const BarText = styled.div`
  font-size: 16px;
  line-height: 24px;
  display: flex;
  color: ${GREYD4};
  font-family: RobotoMonoTTFMedium;
  margin-left: 20px;
  margin-right: 10px;
  align-items: center;
`;

export const BarIcon = styled(NoneDragImg)`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
`;
