import React from "react";
import "./styles/App.css";
import {ActiveTab} from "./styles/theme";
import {useRecoilState} from "recoil";
import {tabState, TabTypes} from "./recoil/tab";

const App = () => {
  const [tabs, setTabs] = useRecoilState<TabTypes[]>(tabState);
  const changeActiveTab = (tabs: TabTypes[], curTab: TabTypes) => {
    let newTabs: TabTypes[];
    newTabs = tabs.map((tab: TabTypes) => {
      tab.id === curTab.id
        ? (tab = {...tab, isActive: true})
        : (tab = {...tab, isActive: false});
      return tab;
    });
    setTabs(newTabs);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="Tab">
          {tabs.length > 0 ? (
            tabs.map((tab: TabTypes) => {
              const {id, name, isActive} = tab;
              return (
                <ActiveTab
                  key={id}
                  variant={isActive ? "active" : "inactive"}
                  onClick={() => changeActiveTab(tabs, tab)}
                >
                  {name}
                </ActiveTab>
              );
            })
          ) : (
            <div />
          )}
        </div>
        <div className="Body"></div>
      </header>
    </div>
  );
};

export default App;
