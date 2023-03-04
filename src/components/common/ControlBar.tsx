import Draggable from "react-draggable";

import draggableIcon from "../../assets/icons/draggable.png";
import nextIcon from "../../assets/icons/next.png";
import prevIcon from "../../assets/icons/prev.png";
import {BarDisplay, BarIcon, BarText} from "../../styles/barStyle";
import {CenterAlign, NoneDragImg} from "../../styles/theme";

const ControlBar = ({
  cycle,
  onChange,
  handleCounterPrevious,
  handleCounterNext,
  space,
}: {
  cycle: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCounterPrevious: () => void;
  handleCounterNext: () => void;
  space: number;
}) => {
  return (
    <Draggable>
      <BarDisplay>
        <NoneDragImg
          src={draggableIcon}
          alt={"draggable"}
          style={{width: "15px", height: "24px", marginLeft: "4px"}}
        />
        <BarText>CYCLE: {cycle}</BarText>
        <CenterAlign onClick={handleCounterPrevious}>
          <BarIcon src={prevIcon} alt={"prev"} />
        </CenterAlign>
        <input
          name="cycle space"
          placeholder=""
          onChange={onChange}
          value={space}
          style={{height: "24px", width: "40px", textAlign: "center"}}
        />
        <CenterAlign onClick={handleCounterNext}>
          <BarIcon src={nextIcon} alt={"next"} />
        </CenterAlign>
      </BarDisplay>
    </Draggable>
  );
};

export default ControlBar;
