import { createContext, useState, useContext } from "react";

const ResultContext = createContext();

export const ResultContextProvider = ({ children }) => {
    const [resultData, setResultData] = useState(null);
    const [pfd, setPfd] = useState(null);
    const [defectRemained, setDefectRemained] = useState(null)

    return (
        <ResultContext.Provider value={{resultData, pfd, defectRemained,setPfd, setDefectRemained, setResultData}}>
            {children}
        </ResultContext.Provider>
    );
};

export const useResultContext = () => useContext(ResultContext);