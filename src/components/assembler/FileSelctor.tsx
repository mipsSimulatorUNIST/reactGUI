import { FileSelctorDisplay } from "../../styles/theme";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { selectedAssemblyFileState } from "../../recoil/state";

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
      <div>
        <div>sample_input</div>
        <div>
          {assemblerFileList.current.map((ele, index) => {
            return (
              <div
                id={ele}
                key={index}
                onClick={handleSelect}
                style={{
                  backgroundColor:
                    selectedAssemblyFile === ele ? "red" : "grey",
                }}
              >
                {ele}
              </div>
            );
          })}
        </div>
      </div>
    </FileSelctorDisplay>
  );
};

export default FileSelctor;
