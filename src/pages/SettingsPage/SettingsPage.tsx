/** @jsxImportSource @emotion/react */

import { cssObj } from "./style";
import { useState } from "react";
import React from "react";

export default function SettingsPage({
  nChains,
  nIter,
  nBurnin,
  computeDIC,
  nThin,
  setnChains,
  setnIter,
  setnBurnin,
  setcomputeDIC,
  setnThin,
}) {
    
    const UnsavednChains = nChains
    const UnsavednIter = nIter
    const UnsavednBurnin = nBurnin
    const UnsavedcomputeDIC = computeDIC
    const UnsavednThin = nThin

    const [inputValues, setInputValues] = useState({
      UnsavednChains,
      UnsavednIter,
      UnsavednBurnin,
      UnsavedcomputeDIC,
      UnsavednThin,
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
      setcomputeDIC(inputValues.UnsavedcomputeDIC);
      setnThin(inputValues.UnsavednThin);
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
      if (key === 'B2') return 'UnsavedcomputeDIC';
    }

    const settingsFields = [
        { label: "Number of Chains", key: "N1" },
        { label: "Number of Iterations", key: "N2" },
        { label: "Number of Burns", key: "N3" },
        { label: "Thinning Rate", key: "N4" },
        { label: "Compute DIC, pD and deviance", key: "B2" },
    ];

    return (
      <div css={cssObj.pageWrapper}> 
        
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