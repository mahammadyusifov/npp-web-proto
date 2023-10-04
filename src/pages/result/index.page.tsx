import { cssObj } from "./style";
import { useRouter } from "next/router";
import Link from "next/link";

import LogoImage from "@/assets/logo.svg";
import LogoutImage from "@/assets/logout.svg";

import { Chart } from "react-google-charts";
import { ROUTER } from "@/constants/ROUTER";

export default function Result() {
  const router = useRouter();
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
        <Chart
          chartType="AreaChart"
          data={[
            ["", "Iterations"],
            ["0", 0],
            ["5000", 50],
            ["10000", 100],
            ["15000", 0],
            ["20000", 40],
          ]}
          options={{
            title: "Trace of IC_Detect_introduced_in_current", // 타이틀
            titleTextStyle: { color: "#111827", fontSize: 12 },
            colors: ["#2563EB"], // 라인 색상
            areaOpacity: 0.05, // 영역 색상
            chartArea: { left: 30, top: 20 },
            hAxis: { textStyle: { color: "#9AA1A9" } }, // 가로축
            vAxis: { textStyle: { color: "#9AA1A9" } }, // 세로축
          }}
        />
        <Chart
          chartType="LineChart"
          data={[
            ["", "N", "Bendwidth"],
            ["0", 0.04, 0.01],
            ["50", 0.01, 0.03],
            ["100", 0.01, 0.02],
            ["150", 0.01, 0.04],
          ]}
          options={{
            title: "Density of IC_Defect_introduced_in_current",
            titleTextStyle: { color: "#111827", fontSize: 12 },
            curveType: "function",
            legend: { position: "rigth" },
            colors: ["#2563EB", "#059669"],
            chartArea: { left: 30, top: 20 },
            hAxis: { textStyle: { color: "#9AA1A9" } }, // 가로축
            vAxis: { textStyle: { color: "#9AA1A9" } }, // 세로축
          }}
        />
        <Chart
          chartType="AreaChart"
          data={[
            ["", "Iterations"],
            ["0", 0],
            ["5000", 50],
            ["10000", 100],
            ["15000", 0],
            ["20000", 40],
          ]}
          options={{
            title: "Trace of IC_Total_Remained_Defect", // 타이틀
            titleTextStyle: { color: "#111827", fontSize: 12 },
            colors: ["#2563EB"], // 라인 색상
            areaOpacity: 0.05, // 영역 색상
            chartArea: { left: 30, top: 20 },
            hAxis: { textStyle: { color: "#9AA1A9" } }, // 가로축
            vAxis: { textStyle: { color: "#9AA1A9" } }, // 세로축
          }}
        />
        <Chart
          chartType="LineChart"
          data={[
            ["", "N", "Bendwidth"],
            ["0", 0.04, 0.01],
            ["50", 0.01, 0.03],
            ["100", 0.01, 0.02],
            ["150", 0.01, 0.04],
          ]}
          options={{
            title: "Density of IC_Total_Remained_Defect",
            titleTextStyle: { color: "#111827", fontSize: 12 },
            curveType: "function",
            legend: { position: "rigth" },
            colors: ["#2563EB", "#059669"],
            chartArea: { left: 30, top: 20 },
            hAxis: { textStyle: { color: "#9AA1A9" } }, // 가로축
            vAxis: { textStyle: { color: "#9AA1A9" } }, // 세로축
          }}
        />
        <Chart
          chartType="AreaChart"
          data={[
            ["", "Iterations"],
            ["0", 0],
            ["5000", 50],
            ["10000", 100],
            ["15000", 0],
            ["20000", 40],
          ]}
          options={{
            title: "IC_Evfest_introdused_h_cursent", // 타이틀
            titleTextStyle: { color: "#111827", fontSize: 12 },
            colors: ["#2563EB"], // 라인 색상
            areaOpacity: 0.05, // 영역 색상
            chartArea: { width: 1090, left: 30, top: 20 },
            hAxis: { textStyle: { color: "#9AA1A9" } }, // 가로축
            vAxis: { textStyle: { color: "#9AA1A9" } }, // 세로축
          }}
        />
        <Chart
          chartType="AreaChart"
          data={[
            ["", "Iterations"],
            ["0", 0],
            ["5000", 50],
            ["10000", 100],
            ["15000", 0],
            ["20000", 40],
          ]}
          options={{
            title: "IC Total Romained Defest", // 타이틀
            titleTextStyle: { color: "#111827", fontSize: 12 },
            colors: ["#2563EB"], // 라인 색상
            areaOpacity: 0.05, // 영역 색상
            chartArea: { width: 1090, left: 30, top: 20 },
            hAxis: { textStyle: { color: "#9AA1A9" } }, // 가로축
            vAxis: { textStyle: { color: "#9AA1A9" } }, // 세로축
          }}
        />
      </section>
    </>
  );
}
