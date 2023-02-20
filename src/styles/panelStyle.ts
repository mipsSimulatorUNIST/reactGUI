import styled from "styled-components";
import {BG, GREY42, GREY85, GREYD4} from "./color";

export const PanelDisplay = styled.div<{width: string; height: string}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${BG};
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-corner {
    display: None;
  }
  &::-webkit-scrollbar-thumb {
    background: ${GREY42};
  }
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

export const PanelMargin = styled.div`
  height: 600px;
`;

export const MainNumber = styled.div`
  width: 46px;
  margin-right: 12px;
  text-align: right;
  font-size: 16px;
  line-height: 24px;
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
  line-height: 24px;
  color: ${GREYD4};
  white-space: pre-wrap;
  font-family: RobotoMonoTTFMedium;
  background-color: ${(props) => (props.isHighlighted ? props.color : BG)};
`;
