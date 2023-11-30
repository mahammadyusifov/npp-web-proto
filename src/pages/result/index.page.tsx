import { cssObj } from "./style";
import { useRouter } from "next/router";
import Link from "next/link";

import LogoImage from "@/assets/logo.svg";
import LogoutImage from "@/assets/logout.svg";

import { Chart } from "react-google-charts";
import { ROUTER } from "@/constants/ROUTER";

import { DUMMY_RESULT } from "@/constants/DUMMY_RESULT";


export default function Result() {
  const router = useRouter();
  const result = router.query.data ? JSON.parse(router.query.data as string) : null;
  console.log(result);

  // dummy data
  const resultData: {
    value: number;
    "defect.type": string;
    iteration: number;
  }[] = result.data[0];

  let defect_introduced: [string, number][] = [];
  let defect_remained: [string, number][] = [];
  let generic_fsd: [string, number][] = [];
  let pfd: [string, number][] = [];

  const mean_remained: number = result.data[2][0];
  const mean_pfd: number = result.data[3][0];

  resultData.forEach(item => {
    const iteration = String(item.iteration);
    const value = item.value;

    if (item["defect.type"] === "introduced") {
      defect_introduced.push([iteration, value]);
    }

    if (item["defect.type"] === "remained") {
      defect_remained.push([iteration, value]);
    }
  });

  const resultData2: {
    value: number;
    "defect.type": string;
    iteration: number;
  }[] = result.data[1];

  resultData2.forEach(item => {
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
              <LogoImage />
            </Link>
            <nav>
              <button onClick={() => router.push(ROUTER.HOME)}>
                Bayesian Methods
              </button>
              <button onClick={() => router.push(ROUTER.SST)}>
                  Statistical Methods
              </button>
              <button
                css={cssObj.active}
                onClick={() => router.push(ROUTER.RESULT)}
              >
                Reliability Views
              </button>
            </nav>
          </div>
          <Link href={ROUTER.SIGN_IN}>
            <LogoutImage />
          </Link>
        </div>
      </header>

      <section css={cssObj.container}>
        <h1 css={cssObj.title}>Plots</h1>
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
