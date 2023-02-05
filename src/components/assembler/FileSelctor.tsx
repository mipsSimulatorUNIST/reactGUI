import { FileSelctorDisplay } from "../../styles/theme";
import { useEffect } from "react";

async function getFileNames() {
  try {
    const response = await fetch("/sample_input/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const fileNames: string[] = await response.json();
    console.log(fileNames);
  } catch (error) {
    console.error(error);
  }
}

const FileSelctor = () => {
  const assemblerFileList: string[] = [
    "example1.s",
    "example2.s",
    "example3.s",
    "example4.s",
    "example5.s",
    "example6.s",
    "example7.s",
  ];

  useEffect(() => {
    getFileNames();
  }, []);

  return (
    <FileSelctorDisplay>
      <div>
        <div>sample_input</div>
        <div>
          {assemblerFileList.map((ele, index) => {
            return <div key={index}>{ele}</div>;
          })}
        </div>
      </div>
    </FileSelctorDisplay>
  );
};

export default FileSelctor;
