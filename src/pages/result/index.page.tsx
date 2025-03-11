import { cssObj } from "./style";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import LogoutImage from "@/assets/logout.svg";

import { ROUTER } from "@/constants/ROUTER";

import { DUMMY_RESULT } from "@/constants/DUMMY_RESULT";

import { useResultContext } from "@/contexts/ResultContext";
import { useEffect, useState, useRef } from "react";
import ChartOne from "./chartOne";

export default function Result() {
  const router = useRouter();
  
  const [fileName, setFileName] = useState<string>();
  const {resultData, setResultData} = useResultContext();
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
    
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
  
        e.target.value = "";
        
        setFileName(file.name); // Store file name
        setSelectedFile(file);  // Store file for later processing
      }
    };

  {/* Some dummy data defined here*/}
  
  let resultData0 = null; 
  /* type = 
  {
    value: number;
    "defect.type": string;
    iteration: number;
  }[] and value = null or resultData.data[0];*/

  let defect_introduced: [string, number][] = [];
  let defect_remained: [string, number][] = [];
  let generic_fsd: [string, number][] = [];
  let pfd: [string, number][] = [];

  let mean_remained = null; /* type = number and its values = null or resultData.data[2][0]; */ 
  let mean_pfd = null /* type = number and  its values =  null or resultData.data[3][0]; */

  let resultData1 = null;
  /* type = {
    value: number;
    "defect.type": string;
    iteration: number;
  }[] and its value = null or resultData.data[1]; */

  {/* Some dummy data defined here */}

  {/* UseEffect is to dynamically set the dummy variables*/}
  useEffect(() => {
    const data = resultData?.data;
    
    if (data) {
      resultData0 = data[0];
      mean_remained = data[2][0];
      mean_pfd = data[3][0];
  
      resultData0.forEach(item => {
        const iteration = String(item.iteration);
        const value = item.value;
  
        if (item["defect.type"] === "introduced") {
          defect_introduced.push([iteration, value]);
        }
  
        if (item["defect.type"] === "remained") {
          defect_remained.push([iteration, value]);
        }
      });
  
      resultData1 = data[1];
  
      resultData1.forEach(item => {
        const iteration = String(item.iteration);
        const value = item.value;
  
        if (item["defect.type"] === "generic_FSD") {
          generic_fsd.push([iteration, value]);
        }
  
        if (item["defect.type"] === "PFD") {
          pfd.push([iteration, value]);
        }
      });
    }
  }, [resultData]);
  {/* UseEffect is to dynamically set the dummy variables*/}

  return (
  <>
    {/* Header starts here */}
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
    {/* Header ends here */}

    {/* Buttons and title starts here*/}
    <section
              id="results-title-section"
              css={[cssObj.container, cssObj.bayesianTitleSection]}
            >
              <h1 css={cssObj.title}>Results</h1>
            </section>
    <section css={[cssObj.container, cssObj.scv]}>
              <p>Upload saved results or save current one</p>
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
    
                <button onClick={() => fileUploadRef.current?.click()} >Browse</button>
                <button >Upload</button>
                <button >Save</button>
              </div>
    </section>
    {/* Buttons and title ends here*/}

    <section css={cssObj.container}>
        <h1 css={cssObj.title}>Plots</h1>
      </section>

      <section css={[cssObj.container, cssObj.chart]}>
        <div>
          <span css={cssObj.meantext}>MEAN:</span>
          <span css={cssObj.meannum}>{mean_remained}</span>
        </div>

      {/* Conditional Chart One here */}
      <div className="chart-container">
            {defect_remained && defect_remained.length > 0 ? (
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


      {/* Conditional Chart One here */ }
    <section css={[cssObj.container, cssObj.chart]}>
      <div>
          <span css={cssObj.meantext}>MEAN:</span>
          <span css={cssObj.meannum}>{mean_pfd}</span>
        </div>
      
      {/* Conditional Chart Two here */}
      <div className="chart-container">
            {defect_remained && defect_remained.length > 0 ? (
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
      
      {/* Conditional Chart Two here */}
    </section>
  </>
  )
}