/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { cssObj } from "@/styles/statisticalStyle"; // 스타일 분리
import Logo from "@/assets/logo.svg";
import LogoutImage from "@/assets/logout.svg";

export default function StatisticalPage() {
  const router = useRouter();

  const [pfdGoal, setPfdGoal] = useState("");
  const [confidenceGoal, setConfidenceGoal] = useState("");
  const [numTests, setNumTests] = useState("");

  const [tests, setTests] = useState<number>(0);
  const [failures, setFailures] = useState<number>(0);
  const [updatedPfd, setUpdatedPfd] = useState<number | null>(null);
  const [updatedConfidence, setUpdatedConfidence] = useState<number | null>(null);

  const [fullResultPath, setFullResultPath] = useState<string | null>(null);

  const handleSensitivitySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/sensitivity-analysis", {
        pfd_goal: parseFloat(pfdGoal),
        confidence_goal: parseFloat(confidenceGoal),
      });
      setNumTests(`계산된 테스트 수: ${response.data.data.num_tests}`);
    } catch (error) {
      console.error("Error calling sensitivity analysis API", error);
    }
  };

  const handlePfdUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/update-pfd", {
        pfd_goal: 0.0001,
        demand: tests,
        failures: failures,
      });
      setUpdatedPfd(response.data.data.updated_pfd);
      setUpdatedConfidence(response.data.data.updated_confidence);
    } catch (error) {
      console.error("Error calling update PFD API", error);
    }
  };

  const handleFullAnalysisSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/full-analysis", {
        pfd_goal: parseFloat(pfdGoal),
        confidence_goal: parseFloat(confidenceGoal),
        failures: failures,
      });
      setFullResultPath(response.data.filepath);
      alert("전체 분석이 완료되었습니다.");
    } catch (error) {
      console.error("Error running full analysis", error);
    }
  };

  return (
    <>
      <header css={cssObj.header}>
        <div css={cssObj.containerHeader}>
          <Link href="/"><Logo /></Link>
          <nav css={cssObj.nav}>
            <button onClick={() => router.push("/")}>Bayesian Methods</button>
            <button css={cssObj.active}>Statistical Methods</button>
            <button onClick={() => router.push("/reliability")}>Reliability Views</button>
          </nav>
          <Link href="/sign-in"><LogoutImage /></Link>
        </div>
      </header>

      <main css={cssObj.container}>
        <h1 css={cssObj.title}>Statistical Methods</h1>

        {/* 1. Sensitivity Analysis */}
        <section css={cssObj.sectionBox}>
          <h2>1. Sensitivity Analysis</h2>
          <form onSubmit={handleSensitivitySubmit}>
            <label>
              PFD Goal:
              <input
                type="text"
                value={pfdGoal}
                onChange={(e) => setPfdGoal(e.target.value)}
                css={cssObj.input}
              />
            </label>
            <label css={cssObj.labelSpacing}>
              Confidence Goal:
              <input
                type="text"
                value={confidenceGoal}
                onChange={(e) => setConfidenceGoal(e.target.value)}
                css={cssObj.input}
              />
            </label>
            <button type="submit" css={cssObj.button}>Submit</button>
          </form>
          {numTests && <p css={cssObj.output}>Output - {numTests}</p>}
        </section>

        {/* 2. Update PFD */}
        <section css={cssObj.sectionBox}>
          <h2>2. Update PFD</h2>
          <form onSubmit={handlePfdUpdateSubmit}>
            <label>
              Number of Tests:
              <input
                type="number"
                value={tests}
                onChange={(e) => setTests(Number(e.target.value))}
                css={cssObj.input}
              />
            </label>
            <label css={cssObj.labelSpacing}>
              Number of Failures:
              <input
                type="number"
                value={failures}
                onChange={(e) => setFailures(Number(e.target.value))}
                css={cssObj.input}
              />
            </label>
            <button type="submit" css={cssObj.button}>Submit</button>
          </form>
          {(updatedPfd !== null && updatedConfidence !== null) && (
            <div css={cssObj.output}>
              <p><strong>Updated PFD:</strong> {updatedPfd}</p>
              <p><strong>Updated Confidence:</strong> {updatedConfidence}</p>
            </div>
          )}
        </section>

        {/* 3. Full Analysis */}
        <section css={cssObj.sectionBox}>
          <h2>3. Full Analysis (Save JSON)</h2>
          <button css={cssObj.button} onClick={handleFullAnalysisSubmit}>
            Run Full Analysis and Save
          </button>
          {fullResultPath && (
            <p css={cssObj.output}>
              저장됨: <a href={`http://localhost:8000/${fullResultPath}`} target="_blank" rel="noreferrer">결과 JSON 다운로드</a>
            </p>
          )}
        </section>
      </main>
    </>
  );
}