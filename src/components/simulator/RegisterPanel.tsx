import {useEffect, useState} from "react";
import Panel from "../common/Panel";
import TopTab from "../common/TopTab";
import {HL_GREEN} from "../../styles/color";

const RegisterPanel = ({register, prev}: {register: object; prev: object}) => {
  const [regList, setRegList] = useState<string[]>([]);
  const [regDiff, setRegDiff] = useState<number[]>([]);

  useEffect(() => {
    const entries = Object.entries(register);
    const newRegDiff: number[] = [];
    const newRegister = entries.map((reg, index) => {
      if (prev && reg[1] !== Object.entries(prev)[index][1]) {
        newRegDiff.push(index);
      }
      return `${reg[0]}: ` + reg[1];
    });
    setRegList(newRegister);
    setRegDiff(newRegDiff);
  }, [register, prev]);
  return (
    <div style={{flexDirection: "row"}}>
      <TopTab title={"Register"} isBinary={false} />
      <Panel
        data={register ? regList : []}
        highlightNumbers={regDiff}
        highlightColor={HL_GREEN}
        width={"322px"}
        height={"740px"}
      />
    </div>
  );
};

export default RegisterPanel;
