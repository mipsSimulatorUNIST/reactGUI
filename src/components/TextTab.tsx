const TextTab = ({ title, data }: { title: string; data: string[] }) => {
  return (
    <>
      <div>{title}</div>
      <div>
        {data.map((ele, index) => {
          return (
            <div key={index} style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>{index}</div>
              <div style={{ flex: 1 }}>{ele}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TextTab;
