import {FileSelctorDisplay, SelectedFile} from "../../styles/theme";
import {useRef} from "react";
import {useRecoilState} from "recoil";
import {selectedAssemblyFileState} from "../../recoil/state";
import {GREY373D, GREY58, GREYCC} from "../../styles/color";

const FileSelctor = () => {
  const assemblerFileList = useRef<string[]>([
    "example1.s",
    "example2.s",
    "example3.s",
    "example4.s",
    "example5.s",
    "example6.s",
    "example7.s",
  ]);

  const [selectedAssemblyFile, setSelectedAssemblyFile] = useRecoilState(
    selectedAssemblyFileState
  );

  const handleSelect = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const targetId = evt.currentTarget.id;
    setSelectedAssemblyFile(targetId);
  };

  return (
    <FileSelctorDisplay>
      <div style={{marginTop: "56px"}}>
        <div
          style={{
            backgroundColor: GREY373D,
            color: "white",
            textAlign: "left",
            paddingLeft: "20px",
            fontFamily: "RobotoMonoTTFMedium",
            lineHeight: "26px",
          }}
        >
          sample_input
        </div>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div style={{width: "20px", borderRight: `1px  solid ${GREY58}`}} />
          <div>
            {assemblerFileList.current.map((ele, index) => {
              return (
                <SelectedFile
                  id={ele}
                  key={index}
                  onClick={handleSelect}
                  selectedAssemblyFile={selectedAssemblyFile}
                  element={ele}
                >
                  {ele}
                </SelectedFile>
              );
            })}
          </div>
        </div>
      </div>
    </FileSelctorDisplay>
  );
};

export default FileSelctor;
