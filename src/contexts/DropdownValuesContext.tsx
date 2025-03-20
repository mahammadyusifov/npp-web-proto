import { TABS } from "@/constants/TABS";
import { createContext, useState, useContext } from "react";

const DropdownValuesContext = createContext();

export const DropdownValuesContextProvider = ({ children }) => {

    let initialDropdownValues: Record<string, Record<string, string>> = {};
      TABS.forEach((tab) => {
        const tabData: Record<string, string> = {};
        tab.children.forEach((item) => {
          tabData[item.label] = item.values[0];
        });
        initialDropdownValues[tab.label] = tabData;
      });

    const [DropdownValues, setDropdownValues] = useState(initialDropdownValues);

    return (
        <DropdownValuesContext.Provider value={{DropdownValues, setDropdownValues}}>
            {children}
        </DropdownValuesContext.Provider>
    );
};

export const useDropdownValuesContext = () => useContext(DropdownValuesContext);