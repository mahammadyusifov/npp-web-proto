import { createContext, useState, useContext } from "react";

const ResultContext = createContext();

export const ResultContextProvider = ({ children }) => {
    const [resultData, setResultData] = useState(null);

    return (
        <ResultContext.Provider value={{resultData, setResultData}}>
            {children}
        </ResultContext.Provider>
    );
};

export const useResultContext = () => useContext(ResultContext);