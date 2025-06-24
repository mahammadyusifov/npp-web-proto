/** @jsxImportSource @emotion/react */
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
  const { DropdownValues, setDropdownValues } = useDropdownValuesContext();
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [meanRemained, setMeanRemained] = useState<number | null>(null);
  const [meanPfd, setMeanPfd] = useState<number | null>(null);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setSelectedFile(file);
      e.target.value = "";
    }
  };

  const handleSaveToFile = () => {
    const dataToSave = {
      'input': { ...DropdownValues },
      'output': {
        'defectRemained': defectRemained,
        'pfd': pfd
      }
    };
    const jsonString = JSON.stringify(dataToSave, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const downloadedFileName = "results.json";
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadedFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        try {
          const content = event.target.result as string;
          const data = JSON.parse(content);
          const input = data['input'];

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
          alert("Failed to parse JSON file. Please check the file format.");
        }
      }
    };
    reader.readAsText(selectedFile);
  };

  useEffect(() => {
    if (!resultData?.data) return;

    const data = resultData.data;
    const newDefectRemained: [string, number][] = [];
    const newPfd: [string, number][] = [];

    setMeanRemained(data[2]?.[0] || null);
    setMeanPfd(data[3]?.[0] || null);

    if (data[0]) {
      data[0].forEach((item: any) => {
        if (item["defect.type"] === "remained") {
          newDefectRemained.push([String(item.iteration), item.value]);
        }
      });
    }

    if (data[1]) {
      data[1].forEach((item: any) => {
        if (item["defect.type"] === "PFD") {
          newPfd.push([String(item.iteration), item.value]);
        }
      });
    }

    setDefectRemained(newDefectRemained);
    setPfd(newPfd);
  }, [resultData, setDefectRemained, setPfd]);

  return (
    <div css={cssObj.pageWrapper}>
      {/* Header */}
      <header css={cssObj.header}>
        <div css={cssObj.container}>
          <div>
            <Link href={ROUTER.HOME}>
              <Logo />
            </Link>
            <nav>
              <button onClick={() => router.push(ROUTER.HOME)}>Bayesian Methods</button>
              <button onClick={() => router.push(ROUTER.SST)}>Statistical Methods</button>
              <button css={cssObj.active} onClick={() => router.push(ROUTER.RESULT)}>Reliability Views</button>
            </nav>
          </div>
          <div css={cssObj.rightSection}>
            <button css={cssObj.settingsButton} onClick={() => router.push(ROUTER.SETTINGS)}>
              Settings
            </button>
            <Link href={ROUTER.SIGN_IN}>
              <LogoutImage />
            </Link>
          </div>
        </div>
      </header>

      <main css={cssObj.mainContent}>
        {/* Title Section */}
        <section css={[cssObj.container, cssObj.titleSection]}>
          <h1 css={cssObj.title}>Results</h1>
        </section>

        {/* Original File Upload Section */}
        <section css={[cssObj.container, cssObj.scv]}>
            <div css={cssObj.fileUplaodForm}>
                <div css={cssObj.filebox}>
                    <label>
                        <div>{fileName || "Choose file"}</div>
                    </label>
                    <input type="file" accept=".json" css={cssObj.uploadFile} ref={fileUploadRef} onChange={onChangeFile} />
                </div>
                <button onClick={() => fileUploadRef.current?.click()}>Browse</button>
                <button onClick={handleUpload}>Upload</button>
                <button onClick={handleSaveToFile}>Save</button>
            </div>
        </section>

        {/* Grid for plot boxes wrapped in a container */}
        <div css={cssObj.container}>
          <div css={cssObj.resultsGrid}>
            {/* First Plot Box */}
            <div css={cssObj.resultBox}>
              <h2>IC_Total_Remained_Defect</h2>
              <div css={cssObj.metricDisplay}>
                <span>MEAN:</span>
                <span css={cssObj.metricValue}>{meanRemained?.toFixed(4) ?? "N/A"}</span>
              </div>
              <div css={cssObj.chartContainer}>
                {defectRemained && defectRemained.length > 1 ? (
                  <Chart
                    chartType="AreaChart"
                    width="2000px"
                    height="300px"
                    data={[["Iterations", "Values"], ...defectRemained]}
                    options={{
                      titleTextStyle: { color: "#111827", fontSize: 16, bold: false },
                      colors: ["#2563EB"],
                      backgroundColor: 'transparent',
                      areaOpacity: 0.1,
                      chartArea: { width: "98%", height: "80%" },
                      hAxis: { textStyle: { color: "#9AA1A9" } },
                      vAxis: { textStyle: { color: "#9AA1A9" } },
                      legend: 'none',
                    }}
                  />
                ) : (
                  <div css={cssObj.chartPlaceholder}>No data to display</div>
                )}
              </div>
            </div>

            {/* Second Plot Box */}
            <div css={cssObj.resultBox}>
              <h2>PFD (Probability of Failure on Demand)</h2>
              <div css={cssObj.metricDisplay}>
                <span>MEAN:</span>
                <span css={cssObj.metricValue}>{meanPfd?.toFixed(4) ?? "N/A"}</span>
              </div>
              <div css={cssObj.chartContainer}>
                {pfd && pfd.length > 1 ? (
                  <Chart
                    chartType="AreaChart"
                    width="2000px"
                    height="300px"
                    data={[["Iterations", "Values"], ...pfd]}
                    options={{
                      titleTextStyle: { color: "#111827", fontSize: 16, bold: false },
                      colors: ["#2563EB"],
                      backgroundColor: 'transparent',
                      areaOpacity: 0.1,
                      chartArea: { width: "98%", height: "80%" },
                      hAxis: { textStyle: { color: "#9AA1A9" } },
                      vAxis: { textStyle: { color: "#9AA1A9" } },
                      legend: 'none',
                    }}
                  />
                ) : (
                  <div css={cssObj.chartPlaceholder}>No data to display</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}