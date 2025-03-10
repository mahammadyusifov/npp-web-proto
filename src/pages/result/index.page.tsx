import { cssObj } from "./style";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import LogoutImage from "@/assets/logout.svg";

import { Chart } from "react-google-charts";
import { ROUTER } from "@/constants/ROUTER";

import { DUMMY_RESULT } from "@/constants/DUMMY_RESULT";

import { useResultContext } from "@/contexts/ResultContext";

export default function Result() {
  const router = useRouter();
  
  const {resultData, setResultData} = useResultContext();

  if (!resultData || !resultData.data || resultData.data.length < 4) {
  console.error("Data is missing or incorrectly structured");
  return null; // Handle the case when data is missing or malformed
  }

  // dummy data
  const resultData0: {
    value: number;
    "defect.type": string;
    iteration: number;
  }[] = resultData.data[0];

  let defect_introduced: [string, number][] = [];
  let defect_remained: [string, number][] = [];
  let generic_fsd: [string, number][] = [];
  let pfd: [string, number][] = [];

  const mean_remained: number = resultData.data[2][0];
  const mean_pfd: number = resultData.data[3][0];

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

  const resultData1: {
    value: number;
    "defect.type": string;
    iteration: number;
  }[] = resultData.data[1];

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

  return (
    <>
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

      <section css={cssObj.container}>
        <h1 css={cssObj.title}>Plots</h1>
        <button >Upload</button>
      </section>

      <section css={[cssObj.container, cssObj.chart]}>
        <div>
          <span css={cssObj.meantext}>MEAN:</span>
          <span css={cssObj.meannum}>{mean_remained}</span>
        </div>

        <Chart
          chartType="AreaChart"
          data={[["Iterations", "Values"], ...defect_remained]}
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

        <div>
          <span css={cssObj.meantext}>MEAN:</span>
          <span css={cssObj.meannum}>{mean_pfd}</span>
        </div>

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
      </section>
    </>
  );
}
