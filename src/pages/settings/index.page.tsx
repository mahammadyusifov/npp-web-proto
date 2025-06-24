import { cssObj } from "./style";
import { ROUTER } from "@/constants/ROUTER";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import LogoutImage from "@/assets/logout.svg";
import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";
import { useSettingsContext } from "@/contexts/settingsContext";

export default function SettingsPage() {
    const router = useRouter();
    
    const { nChains, nIter, nBurnin, autoCloseWinBugs, computeDIC, nThin, winBugsExecutableDir, workingDir ,
      setnChains, setnIter, setnBurnin, setautoCloseWinBugs, setcomputeDIC, setnThin, setwinBugsExecutableDir, setworkingDir
    } = useSettingsContext();

    // The user's original state structure is preserved
    const UnsavednChains = nChains
    const UnsavednIter = nIter
    const UnsavednBurnin = nBurnin
    const UnsavedautoCloseWinBugs = autoCloseWinBugs
    const UnsavedcomputeDIC = computeDIC
    const UnsavednThin = nThin
    const UnsavedwinBugsExecutableDir = winBugsExecutableDir
    const UnsavedworkingDir = workingDir

    const [inputValues, setInputValues] = useState({
      UnsavednChains,
      UnsavednIter,
      UnsavednBurnin,
      UnsavedautoCloseWinBugs,
      UnsavedcomputeDIC,
      UnsavednThin,
      UnsavedwinBugsExecutableDir,
      UnsavedworkingDir
    });

    
    const handleInputChange = (e, key) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setInputValues(prevValues => ({
        ...prevValues, 
        [determineValue(key)]: value
      }));
    }

    const handleSave = () => {
      setnChains(inputValues.UnsavednChains);
      setnIter(inputValues.UnsavednIter);
      setnBurnin(inputValues.UnsavednBurnin);
      setautoCloseWinBugs(inputValues.UnsavedautoCloseWinBugs);
      setcomputeDIC(inputValues.UnsavedcomputeDIC);
      setnThin(inputValues.UnsavednThin);
      setwinBugsExecutableDir(inputValues.UnsavedwinBugsExecutableDir);
      setworkingDir(inputValues.UnsavedworkingDir);
      alert('Settings Saved!');
    }
    
    const determineType = (key) => {
      if (key.includes("N")) {return 'number'}
      else if (key.includes('B')) {return 'checkbox'}
      else {return 'text'}
    }

    const determineValue = (key) => {
      if (key === 'N1') return 'UnsavednChains';
      if (key === 'N2') return 'UnsavednIter';
      if (key === 'N3') return 'UnsavednBurnin';
      if (key === 'N4') return 'UnsavednThin';
      if (key === 'B1') return 'UnsavedautoCloseWinBugs';
      if (key === 'B2') return 'UnsavedcomputeDIC';
      if (key === 'S1') return 'UnsavedwinBugsExecutableDir';
      return 'UnsavedworkingDir';
    }

    const settingsFields = [
        { label: "Number of Chains", key: "N1" },
        { label: "Number of Iterations", key: "N2" },
        { label: "Number of Burns", key: "N3" },
        { label: "Thinning Rate", key: "N4" },
        { label: "AutoClose WinBugs", key: "B1" },
        { label: "Compute DIC, pD and deviance", key: "B2" },
        { label: "Directory for OpenBugs Executable", key: "S1", long: true },
        { label: "Working directory for input/output from WinBugs execution", key: "S2", long: true }
    ];

    return (
      <div css={cssObj.pageWrapper}> 
        {/* Header starts here */}
        <header css={cssObj.header}>
            <div css={cssObj.container}>
                <div>
                  <Link href={ROUTER.HOME}>
                    <Logo />
                  </Link>
                  <nav>
                    <button
                      className="active" 
                      css={cssObj.active}
                      onClick={() => router.push(ROUTER.HOME)}
                    >
                      Bayesian Methods
                    </button>
                    <button onClick={() => router.push(ROUTER.SST)}>
                      Statistical Methods
                    </button>
                    <button onClick={() => router.push(ROUTER.RESULT)}>
                      Reliability Views
                    </button>
                  </nav>
                </div>
                <div css={cssObj.rightSection}>
                    <button 
                        css={cssObj.newButton}
                        onClick={() => router.push(ROUTER.SETTINGS)}
                    >
                        Settings
                    </button>
                    <Link href={ROUTER.SIGN_IN}>
                        <LogoutImage />
                    </Link>
                </div>
            </div>
        </header>
        {/* Header ends here */}
        
        <main css={cssObj.mainContent}>
            <section
                id="settings-title-section"
                css={[cssObj.container, cssObj.settingsTitleSection]}
            >
                <h1 css={cssObj.title}>BBN Hyperparameters</h1>
            </section>

            <section css={cssObj.settingsGrid}>
              {settingsFields.map(({ label, key, long }) => {
                const valueKey = determineValue(key);
                const inputType = determineType(key);
                return (
                  <div key={key} css={[cssObj.settingBox, long && cssObj.longSettingBox]}>
                    <label htmlFor={key} css={cssObj.inputLabel}>{label}</label>
                    <input
                      type={inputType}
                      id={key}
                      value={inputType === 'checkbox' ? undefined : inputValues[valueKey as keyof typeof inputValues] || ""}
                      checked={inputType === 'checkbox' ? !!inputValues[valueKey as keyof typeof inputValues] : undefined}
                      onChange={(e) => handleInputChange(e, key)}
                      css={cssObj.inputBox}
                    />
                  </div>
                );
              })}
            </section>
        </main>
        
        {/* Save Button */}
        <div css={cssObj.saveButtonContainer}>
            <button 
              css={cssObj.saveButton}
              onClick={handleSave}
            >
              Save
            </button>
        </div>
        {/* Save Button ends here */}
      </div>
    );
}
