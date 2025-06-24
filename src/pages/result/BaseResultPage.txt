import { cssObj } from "./style";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import LogoutImage from "@/assets/logout.svg";
import { useDropdownValuesContext } from "@/contexts/DropdownValuesContext";

import { ROUTER } from "@/constants/ROUTER";
import { useResultContext } from "@/contexts/ResultContext";
import { useEffect, useState, useRef } from "react";
import { Chart } from "react-google-charts";

export default function Result() {
  const router = useRouter();
  const { resultData, pfd, defectRemained, setPfd, setDefectRemained } = useResultContext();
  const { DropdownValues, setDropdownValues} = useDropdownValuesContext();
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [defectIntroduced, setDefectIntroduced] = useState<[string, number][]>([]);
  const [genericFSD, setGenericFSD] = useState<[string, number][]>([]);

  const [meanRemained, setMeanRemained] = useState<number | null>(null);
  const [meanPfd, setMeanPfd] = useState<number | null>(null);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      e.target.value = "";
      setFileName(file.name);
      setSelectedFile(file);
    }
  };

  const handleSaveToFile = () => {
    const dataToSave = {
    'input':
      {...DropdownValues},
    'output':{
      'defectRemained' : defectRemained,
      'pfd' : pfd
    }
  }
  
    // Step 2: Convert the merged object to a JSON string
    const jsonString = JSON.stringify(dataToSave, null, 2); // Pretty-print with 2 spaces
  
    // Step 3: Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });
  
    // Step 4: Create a URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Step 5: Determine the file name
    const downloadedFileName = fileName
      ? fileName.replace(/\.[^/.]+$/, ".json") // Replace the extension with .json
      : "InputOutput.json"; // Default name if no file is uploaded
  
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

  const handleUpload = () => {
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
          const input = data['input']
  
          // Extract values
          setDropdownValues((prev) => {
            const newValues = { ...prev };
      
            Object.keys(input).forEach((tabLabel) => {
              if (newValues[tabLabel]) {
                Object.keys(input[tabLabel]).forEach((itemLabel) => {
                  if (newValues[tabLabel][itemLabel] !== undefined) {
                    newValues[tabLabel][itemLabel] = input[tabLabel][itemLabel];
                  }
                });
              }
            });
      
            return newValues;
          });

          setDefectRemained(data['output']['defectRemained']);
          setPfd(data['output']['pfd']);

          
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      }
    };
  
    reader.readAsText(selectedFile); // Read file as text
  };

  // UseEffect to update the state when resultData changes
  useEffect(() => {
    if (!resultData?.data) return;

    const data = resultData.data;
    const newDefectIntroduced: [string, number][] = [];
    const newDefectRemained: [string, number][] = [];
    const newGenericFSD: [string, number][] = [];
    const newPfd: [string, number][] = [];

    setMeanRemained(data[2]?.[0] || null);
    setMeanPfd(data[3]?.[0] || null);

    if (data[0]) {
      data[0].forEach((item: any) => {
        const iteration = String(item.iteration);
        const value = item.value;

        if (item["defect.type"] === "introduced") {
          newDefectIntroduced.push([iteration, value]);
        }
        if (item["defect.type"] === "remained") {
          newDefectRemained.push([iteration, value]);
        }
      });
    }

    if (data[1]) {
      data[1].forEach((item: any) => {
        const iteration = String(item.iteration);
        const value = item.value;

        if (item["defect.type"] === "generic_FSD") {
          newGenericFSD.push([iteration, value]);
        }
        if (item["defect.type"] === "PFD") {
          newPfd.push([iteration, value]);
        }
      });
    }

    setDefectIntroduced(newDefectIntroduced);
    setDefectRemained(newDefectRemained);
    setGenericFSD(newGenericFSD);
    setPfd(newPfd);
  }, [resultData]);

  return (
    <>
      {/* Header */}
      <header css={cssObj.header}>
        <div css={cssObj.container}>
          <div>
            <Link href={ROUTER.HOME}>
              <Logo />
            </Link>
            <nav>
              <button css={cssObj.active} onClick={() => router.push(ROUTER.HOME)}>
                Bayesian Methods
              </button>
              <button onClick={() => router.push(ROUTER.SST)}>Statistical Methods</button>
              <button onClick={() => router.push(ROUTER.RESULT)}>Reliability Views</button>
            </nav>
          </div>
          <div css={cssObj.rightSection}>
            <button css={cssObj.newButton} onClick={() => router.push(ROUTER.SETTINGS)}>
              Settings
            </button>
            <Link href={ROUTER.SIGN_IN}>
              <LogoutImage />
            </Link>
          </div>
        </div>
      </header>

      {/* Title Section */}
      <section id="results-title-section" css={[cssObj.container, cssObj.bayesianTitleSection]}>
        <h1 css={cssObj.title}>Results</h1>
      </section>

      {/* File Upload Section */}
      <section css={[cssObj.container, cssObj.scv]}>
        <p>Upload saved results or save current one</p>
        <div css={cssObj.fileUplaodForm}>
          <div css={cssObj.filebox}>
            <label>
              <div>{fileName ?? "Choose file"}</div>
            </label>
            <input type="file" css={cssObj.uploadFile} ref={fileUploadRef} onChange={onChangeFile} />
          </div>

          <button onClick={() => fileUploadRef.current?.click()}>Browse</button>
          <button onClick={handleUpload}>Upload</button>
          <button onClick={handleSaveToFile}>Save</button>
        </div>
      </section>

      {/* Charts Section */}
      <section css={cssObj.container}>
        <h1 css={cssObj.title}>Plots</h1>
      </section>

      {/* Chart 1 */}
      <section css={[cssObj.container, cssObj.chart]}>
        <div>
          <span css={cssObj.meantext}>MEAN:</span>
          <span css={cssObj.meannum}>{meanRemained}</span>
        </div>

        <div className="chart-container">
        {defectRemained && defectRemained.length > 0 ? (
          <Chart
            chartType="AreaChart"
            data={[["Iterations", "Values"], ...defectRemained]}
            options={{
              title: "IC_Total_Remained_Defect",
              titleTextStyle: { color: "#111827", fontSize: 12 },
              colors: ["#2563EB"],
              areaOpacity: 0.05,
              chartArea: { width: 1090, left: 30, top: 20 },
              hAxis: { textStyle: { color: "#9AA1A9" } },
              vAxis: { textStyle: { color: "#9AA1A9" } },
            }}
          />
       ) : (
    <div className="chart-placeholder">
      <svg width="400" height="200">
        <line x1="0" y1="50" x2="400" y2="50" stroke="lightgray" strokeWidth="2" />
        <line x1="0" y1="150" x2="400" y2="150" stroke="lightgray" strokeWidth="2" />
      </svg>
    </div>
  )}
</div>
      </section>

      {/* Chart 2 */}
      <section css={[cssObj.container, cssObj.chart]}>
        <div>
          <span css={cssObj.meantext}>MEAN:</span>
          <span css={cssObj.meannum}>{meanPfd}</span>
        </div>

        <div className="chart-container">
          {pfd && pfd.length > 0 ? (
            <Chart
              chartType="AreaChart"
              data={[["Iterations", "Values"], ...pfd]}
              options={{
                title: "PFD",
                titleTextStyle: { color: "#111827", fontSize: 12 },
                colors: ["#2563EB"],
                areaOpacity: 0.05,
                chartArea: { width: 1090, left: 30, top: 20 },
                hAxis: { textStyle: { color: "#9AA1A9" } },
                vAxis: { textStyle: { color: "#9AA1A9" } },
              }}
            />
          ) : (
            <div className="chart-placeholder">
              <svg width="400" height="200">
                <line x1="0" y1="50" x2="400" y2="50" stroke="lightgray" strokeWidth="2" />
                <line x1="0" y1="150" x2="400" y2="150" stroke="lightgray" strokeWidth="2" />
              </svg>
            </div>
          )}
        </div>

      </section>
    </>
  );
}


