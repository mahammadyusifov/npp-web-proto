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
  // const resultData = router.query.data ? JSON.parse(router.query.data as string) : null;

  // dummy data
  const resultData = DUMMY_RESULT;

  let defect_introduced: [string, number][] = [];
  let defect_remained: [string, number][] = [];

  resultData.forEach(item => {
    const iteration = String(item.iteration);
    // const iteration = "";
    const value = item.value;

    if (item["defect.type"] === "introduced") {
      defect_introduced.push([iteration, value]);
    }

    if (item["defect.type"] === "remained") {
      defect_remained.push([iteration, value]);
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
              <button disabled>Statistical Methods</button>
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
          <span css={cssObj.meannum}>14.05</span>
        </div>

        <Chart
          chartType="AreaChart"
          data={[["Iterations", "Values"], ...defect_introduced]}
          options={{
            title: "IC_Defect_introduced_in_current",
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
          <span css={cssObj.meannum}>11.05</span>
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
      </section>
    </>
  );
}
