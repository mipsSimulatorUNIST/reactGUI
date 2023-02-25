import Panel from "../common/Panel";
import {HL_GREEN} from "../../styles/color";

import TopTab from "../common/TopTab";
import {useEffect, useState} from "react";

const RegisterPanel = ({register, prev}: {register: object; prev: object}) => {
  const [regList, setRegList] = useState<string[]>([]);
  const [regDiff, setRegDiff] = useState<number[]>([]);

  useEffect(() => {
    const entries = Object.entries(register);
    const newRegister: string[] = [];
    const newRegDiff: number[] = [];
    entries.map((reg, index) => {
      newRegister.push(`${reg[0]}: ` + reg[1]);
      if (prev && reg[1] !== Object.entries(prev)[index][1]) {
        newRegDiff.push(index);
      }
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
