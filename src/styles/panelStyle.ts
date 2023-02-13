import styled from "styled-components";
import {BG, GREY85, GREYD4} from "./color";

export const PanelDisplay = styled.div<{width: string}>`
  width: ${(props) => props.width};
`;

export const PanelTitle = styled.div`
  display: flex;
  color: white;
  width: 150px;
  height: 42px;
  background-color: ${BG};
  font-family: RobotoMonoTTFBold;
  align-items: center;
  justify-content: center;
`;

export const PanelBody = styled.div`
  height: calc(100vh - 42px);
  overflow: scroll;
  background-color: ${BG};
`;

export const MainNumber = styled.div`
  width: 46px;
  margin-right: 12px;
  text-align: right;
  font-size: 16px;
  color: ${GREY85};
  font-family: RobotoMonoTTFMedium;
`;

interface textHighlight {
  isHighlighted: boolean;
  color: string;
}

export const MainText = styled.div<textHighlight>`
  flex: 1;
  padding-left: 18px;
  font-size: 16px;
  color: ${GREYD4};
  white-space: pre-wrap;
  font-family: RobotoMonoTTFMedium;
  background-color: ${(props) => (props.isHighlighted ? props.color : BG)};
`;
