/* eslint-disable react/prop-types */
import "./SwitchTabs.scss";
import { useState } from "react";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedtab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedtab(index);
    }, 300);
    onTabChange(tab, index);
  };
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data &&
          data.map((tab, index) => (
            <span
              key={index}
              className={`tabItem ${selectedTab == index ? "active" : ""}`}
              onClick={() => activeTab(tab, index)}
            >
              {tab}
            </span>
          ))}
        <span className="movingBg" style={{ left: left }}></span>
      </div>
    </div>
  );
};

export default SwitchTabs;
