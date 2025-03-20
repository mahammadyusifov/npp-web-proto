import { cssObj } from "./style";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import LogoutImage from "@/assets/logout.svg";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { TABS } from "@/constants/TABS";
import { useQuery } from "@tanstack/react-query";
import { useGetProductInfo } from "@/apis/contents/useGetContent";
import { ROUTER } from "@/constants/ROUTER";
import { getCookie } from "@/utils/cookies";
import { API_URL } from "@/constants/API_URL";
import React from "react";
import { useSettingsContext } from "@/contexts/settingsContext";
import { useResultContext } from "@/contexts/ResultContext";
import { useDropdownValuesContext } from "@/contexts/DropdownValuesContext";

export default function Index() {
  const router = useRouter();
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [activeContent, setActiveContent] = useState("FP");
  const [valueObj, setValueObj] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { nChains, nIter, nBurnin, autoCloseWinBugs, computeDIC, nThin, winBugsExecutableDir, workingDir ,
        setnChains, setnIter, setnBurnin, setautoCloseWinBugs, setcomputeDIC, setnThin, setwinBugsExecutableDir, setworkingDir
      } = useSettingsContext();

  const {resultData, setResultData} = useResultContext();
  const {DropdownValues, setDropdownValues} = useDropdownValuesContext();

  const loadingLayerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  useEffect(() => {
    const obj: Record<string, string> = {};
    TABS.forEach((tab) => {
      tab.children.forEach((item) => {
        obj[item.label] = item.values[0];
      });
    });
    setValueObj(obj);
  }, [activeContent]);

  useEffect(() => {
    const authToken = getCookie("authToken");

    if (!authToken) {
      // router.push(ROUTER.SIGN_IN);
    }
  }, [router]);

  const showContent = (
    value:
      | "FP"
      | "Requirement Dev"
      | "Requirement V&V"
      | "Design Dev"
      | "Design V&V"
      | "Implementation Dev"
      | "Implementation V&V"
      | "Test Dev"
      | "Test V&V"
      | "Installlation and Checkout Dev"
      | "Installlation and Checkout V&V"
  ) => {
    setActiveContent(value);
  };

  const moveToPrevTab = () => {
    const currentIndex = TABS.findIndex(tab => tab.label === activeContent);
    if (currentIndex > 0) {
      setActiveContent(TABS[currentIndex - 1].label);
    }
  };

  const moveToNextTab = () => {
    const currentIndex = TABS.findIndex(tab => tab.label === activeContent);
    if (currentIndex < TABS.length - 1) {
      setActiveContent(TABS[currentIndex + 1].label);
    }
  };



  // const [allTabValues, setAllTabValues] = useState(initialTabData);
  

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      e.target.value = "";
      
      setFileName(file.name); // Store file name
      setSelectedFile(file);  // Store file for later processing
    }
  };

  const postTabValues = async (data: Record<string, Record<string, string>>) => {
    setIsLoading(true);

    for (let key in data) {
      for (let key2 in data[key]) {
        if (data[key][key2] === "High") {
          data[key][key2] = "1";
        }
        else if (data[key][key2] === "Medium"){
          data[key][key2] = "2";
        }
        else if (data[key][key2] === "Low"){
          data[key][key2] = "3";
        }
      }
    }

    const fpInput = document.getElementById("FPInput") as HTMLInputElement;
    const fpInputValue = fpInput.value;
    data["FP"]["FP Input"] = fpInputValue;

    data['settings'] = {'nChains': nChains, 'nIter' : nIter, 'nBurnin': nBurnin, 'nThin':nThin,
      'computeDIC':computeDIC, 'autoCloseWinBugs':autoCloseWinBugs, 'winBugsExecutableDir': winBugsExecutableDir,
      'workingDir': workingDir
    }
    try {
      console.log(data)

      const response = await axios.post(API_URL.CONTENT.COMMON, {
        data: JSON.stringify(data),
        timeout: 60 * 4 * 1000,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        },
      });

      const response_data = await response;
      console.log('Response data at postTabValues = ' + response_data);

      setIsLoading(false);

      return response_data;
    } catch (error) {
      console.error("Error Axios", error);
      setIsLoading(false);
    }
  };

  const [inputValue, setInputValue] = useState(""); // Default empty Temporary

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const dummy = await postTabValues(DropdownValues);
      setResultData(dummy);
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  const onUpload = () => {
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        try {
          const content = event.target.result as string; // Get file content
          console.log("File content:", content);
  
          // Parse JSON
          const data = JSON.parse(content);
  
          // Extract values
          setDropdownValues((prev) => {
            const newValues = { ...prev };
      
            Object.keys(data).forEach((tabLabel) => {
              if (newValues[tabLabel]) {
                Object.keys(data[tabLabel]).forEach((itemLabel) => {
                  if (newValues[tabLabel][itemLabel] !== undefined) {
                    newValues[tabLabel][itemLabel] = data[tabLabel][itemLabel];
                  }
                });
              }
            });
      
            return newValues;
          });
      
          setInputValue(data["FP"]["FP Input"].toString());
          
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      }
    };
  
    reader.readAsText(selectedFile); // Read file as text
  };
  
  const handleSaveToFile = () => {
    const dataToSave = {
      ...DropdownValues
    };
  
    // Step 2: Convert the merged object to a JSON string
    const jsonString = JSON.stringify(dataToSave, null, 2); // Pretty-print with 2 spaces
  
    // Step 3: Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });
  
    // Step 4: Create a URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Step 5: Determine the file name
    const downloadedFileName = fileName
      ? fileName.replace(/\.[^/.]+$/, ".json") // Replace the extension with .json
      : "TabValues.json"; // Default name if no file is uploaded
  
    // Step 6: Create a temporary <a> element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadedFileName; // Use the dynamic file name
    document.body.appendChild(a); // Append the <a> element to the DOM
    a.click(); // Programmatically click the <a> element to trigger the download
  
    // Step 7: Clean up
    document.body.removeChild(a); // Remove the <a> element from the DOM
    URL.revokeObjectURL(url); // Release the Blob URL
  };


  return (
    <>
      {isLoading && (
        <div style={loadingLayerStyle}>
          <p>Loading...</p>
        </div>
      )}
        <header css={cssObj.header}>
          <div css={cssObj.container}>
            <div>
              <Link href={ROUTER.HOME}>
                <Logo />
              </Link>
              <nav>
                <button
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

        <section
          id="bayesian-title-section"
          css={[cssObj.container, cssObj.bayesianTitleSection]}
        >
          <h1 css={cssObj.title}>Bayesian</h1>
        </section>

        <section css={[cssObj.container, cssObj.scv]}>
          <p>Bayesian Input File</p>
          <div css={cssObj.fileUplaodForm}>
            <div css={cssObj.filebox}>
              <label>
                <div>{fileName ?? "Choose file"}</div>
              </label>
              <input
                type="file"
                css={cssObj.uploadFile}
                ref={fileUploadRef}
                onChange={onChangeFile}
              />
            </div>

            <button onClick={() => fileUploadRef.current?.click()}>Browse</button>
            <button onClick = {onUpload}>Upload</button>
            <button onClick={handleSaveToFile}>Save</button>
          </div>
        </section>

        <section css={cssObj.tabs}>
          <div css={cssObj.container}>
            <ul>
              {TABS.map((tab) => (
                <li
                  key={`tab-${tab.label}`}
                  css={activeContent === tab.label ? cssObj.activeTab : {}}
                  onClick={() => showContent(tab.label)}
                >
                  {tab.label}
                </li>
              ))}
            </ul>
            <div>
              <div css={[cssObj.tabContent, cssObj.show]}>
                <form action="" onSubmit={onSubmit}>
                  <div css={cssObj.footer}>
                    <button type="button" onClick={moveToPrevTab} css={cssObj.navigateButton}>
                      Prev
                    </button>
                    <button type="button" data-button="next" onClick={moveToNextTab} css={cssObj.navigateButton}>
                      Next
                    </button>
                    <button type="submit" css={cssObj.footerButton}>
                      Submit
                    </button>
                  </div>
                  <div css={cssObj.content}>
                    <ul>
                      {TABS.map((tab) =>
                        tab.label === "FP" ? (
                          <li
                            key={`tab-${tab.label}-input`}
                            style={{
                              display: tab.label === activeContent ? "block" : "none",
                            }}
                          >
                            <label>FP value </label>
                            <input
                              id="FPInput"
                              type="text"
                              name="FPInput"
                              value={DropdownValues['FP']['FP Input']} // This updates dynamically
                              onChange={(e) => setDropdownValues((prev) => ({
                                ...prev,
                                [tab.label]: {
                                  ...prev[tab.label],
                                  ['FP Input']: e.target.value,
                                },
                              }))} // Keeps it editable
                            />
                          </li>
                        ) : (
                          tab.children.map((item) => (
                            <li
                              key={`tab-${tab.label}-items-${item.label}`}
                              style={{
                                display: tab.label === activeContent ? "block" : "none",
                              }}
                            >
                              <label>{item.label}</label>
                              <select
                                    name={item.label}
                                    value={DropdownValues[tab.label]?.[item.label] || ""}
                                    onChange={(e) =>
                                      setDropdownValues((prev) => ({
                                        ...prev,
                                        [tab.label]: {
                                          ...prev[tab.label],
                                          [item.label]: e.target.value,
                                        },
                                      }))
                                    }
                                  >
                                    {item.values.map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                          </select>
                            </li>
                          ))
                        )
                      )}
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
