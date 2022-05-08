import React from "react";

type TabPanelProps = {
  className?: string;
  children?: React.ReactNode;
  index: number;
  value: number;
};

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  index,
  value,
  className,
}) => {
  return (
    <div
      className={`w-full ${value === index ? "" : "hidden"} ${className}`}
      role="tabpanel"
    >
      {children}
    </div>
  );
};

export default TabPanel;
