import Panel from "../common/Panel";
import {HL_GREEN} from "../../styles/color";

import TopTab from "../common/TopTab";

const RegisterPanel = ({register}: {register: string[]}) => {
  return (
    <div style={{flexDirection: "row"}}>
      <TopTab title={"Register"} isBinary={false} />
      <Panel
        data={register ? register : []}
        highlightNumbers={[3, 6, 8]}
        highlightColor={HL_GREEN}
        width={"322px"}
        height={"740px"}
      />
    </div>
  );
};

export default RegisterPanel;
