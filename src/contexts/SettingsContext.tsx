import { createContext, useState, useContext } from "react";

const SettingsContext = createContext();

export const SettingsContextProvider = ({ children }) => {
    const [nChains, setnChains] = useState(1);
    const [nIter, setnIter] = useState(20000);
    const [nBurnin, setnBurnin] = useState(500);
    const [autoCloseWinBugs, setautoCloseWinBugs] = useState(false);
    const [computeDIC, setcomputeDIC] = useState(false);
    const [nThin, setnThin] = useState(1);
    // const [winBugsExecutableDir, setwinBugsExecutableDir] = useState("C:/WinBUGS14");
    const [winBugsExecutableDir, setwinBugsExecutableDir] = useState("C:/Program Files (x86)/OpenBUGS/OpenBUGS323");
    const [workingDir, setworkingDir] = useState("C:/WinBUGS14/bbn_Routput");


    return (
        <SettingsContext.Provider value={{ nChains, nIter, nBurnin, autoCloseWinBugs, computeDIC, nThin, winBugsExecutableDir, workingDir ,
            setnChains, setnIter, setnBurnin, setautoCloseWinBugs, setcomputeDIC, setnThin, setwinBugsExecutableDir, setworkingDir
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettingsContext = () => useContext(SettingsContext);