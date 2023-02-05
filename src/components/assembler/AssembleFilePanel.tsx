import { useRecoilValue } from "recoil";
import { selectedAssemblyFileState } from "../../recoil/tab";
import { AssembleFilePanelDisplay } from "../../styles/theme";
import TextTab from "../TextTab";
const datas = [
  "example1.s",
  "example2.s",
  "example3.s",
  "example4.s",
  "example5.s",
  "example6.s",
  "example7.s",
];
const AssembleFilePanel = () => {
  const selectedAssemblyFile = useRecoilValue(selectedAssemblyFileState);
  return (
    <AssembleFilePanelDisplay>
      <TextTab title={selectedAssemblyFile} data={datas} />
    </AssembleFilePanelDisplay>
  );
};

export default AssembleFilePanel;
