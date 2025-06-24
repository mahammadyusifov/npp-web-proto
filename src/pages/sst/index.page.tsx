/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { cssObj } from "./style"; 
import Logo from "@/assets/logo.svg";
import LogoutImage from "@/assets/logout.svg";
import { ROUTER } from "@/constants/ROUTER";

export default function StatisticalPage() {
  const router = useRouter();

  const [pfdGoal, setPfdGoal] = useState("");
  const [confidenceGoal, setConfidenceGoal] = useState("");
  const [numTests, setNumTests] = useState("");

  const [tests, setTests] = useState<number>(0);
  const [failures, setFailures] = useState<number>(0);
  const [updatedPfd, setUpdatedPfd] = useState<number | null>(null);
  const [updatedConfidence, setUpdatedConfidence] = useState<number | null>(
    null
  );

  const [fullResultPath, setFullResultPath] = useState<string | null>(null);

  const handleSensitivitySubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/sensitivity-analysis",
        {
          pfd_goal: parseFloat(pfdGoal),
          confidence_goal: parseFloat(confidenceGoal),
        }
      );
      setNumTests(`계산된 테스트 수: ${response.data.data.num_tests}`);
    } catch (error) {
      console.error("Error calling sensitivity analysis API", error);
    }
  };

  const handlePfdUpdateSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/update-pfd",
        {
          pfd_goal: 0.0001,
          demand: tests,
          failures: failures,
        }
      );
      setUpdatedPfd(response.data.data.updated_pfd);
      setUpdatedConfidence(response.data.data.updated_confidence);
    } catch (error) {
      console.error("Error calling update PFD API", error);
    }
  };

  const handleFullAnalysisSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/full-analysis",
        {
          pfd_goal: parseFloat(pfdGoal),
          confidence_goal: parseFloat(confidenceGoal),
          failures: failures,
        }
      );
      setFullResultPath(response.data.filepath);
      alert("전체 분석이 완료되었습니다.");
    } catch (error) {
      console.error("Error running full analysis", error);
    }
  };

  return (
    <div css={cssObj.pageWrapper}>
      <header css={cssObj.header}>
        <div css={cssObj.container}>
          <div>
            <Link href={ROUTER.HOME}>
              <Logo />
            </Link>
            <nav>
              <button onClick={() => router.push(ROUTER.HOME)}>
                Bayesian Methods
              </button>
              <button
                css={cssObj.active}
                onClick={() => router.push(ROUTER.SST)}
              >
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

      <main css={cssObj.mainContent}>
        <section
          id="settings-title-section"
          css={[cssObj.container, cssObj.settingsTitleSection]}
        >
          <h1 css={cssObj.title}>Statistical Methods</h1>
        </section>

        <div css={cssObj.settingsGrid}>
          {/* 1. Sensitivity Analysis */}
          <div css={cssObj.settingBox}>
            <form onSubmit={handleSensitivitySubmit} css={cssObj.formWrapper}>
              <h2>1. Sensitivity Analysis</h2>
              <div css={cssObj.inputGroup}>
                <label css={cssObj.inputLabel}>PFD Goal:</label>
                <input
                  type="text"
                  value={pfdGoal}
                  onChange={(e) => setPfdGoal(e.target.value)}
                  css={cssObj.inputBox}
                />
              </div>
              <div css={cssObj.inputGroup}>
                <label css={cssObj.inputLabel}>Confidence Goal:</label>
                <input
                  type="text"
                  value={confidenceGoal}
                  onChange={(e) => setConfidenceGoal(e.target.value)}
                  css={cssObj.inputBox}
                />
              </div>
              <button type="submit" css={cssObj.saveButton}>
                Submit
              </button>
              {numTests && <p css={cssObj.output}>{numTests}</p>}
            </form>
          </div>

          {/* 2. Update PFD */}
          <div css={cssObj.settingBox}>
            <form onSubmit={handlePfdUpdateSubmit} css={cssObj.formWrapper}>
              <h2>2. Update PFD</h2>
              <div css={cssObj.inputGroup}>
                <label css={cssObj.inputLabel}>Number of Tests:</label>
                <input
                  type="number"
                  value={tests}
                  onChange={(e) => setTests(Number(e.target.value))}
                  css={cssObj.inputBox}
                />
              </div>
              <div css={cssObj.inputGroup}>
                <label css={cssObj.inputLabel}>Number of Failures:</label>
                <input
                  type="number"
                  value={failures}
                  onChange={(e) => setFailures(Number(e.target.value))}
                  css={cssObj.inputBox}
                />
              </div>
              <button type="submit" css={cssObj.saveButton}>
                Submit
              </button>
              {updatedPfd !== null && updatedConfidence !== null && (
                <div css={cssObj.output}>
                  <p>
                    <strong>Updated PFD:</strong> {updatedPfd}
                  </p>
                  <p>
                    <strong>Updated Confidence:</strong> {updatedConfidence}
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* 3. Full Analysis */}
          <div css={[cssObj.settingBox, cssObj.longSettingBox]}>
            <h2>3. Full Analysis (Save JSON)</h2>
            <button css={cssObj.saveButton} onClick={handleFullAnalysisSubmit}>
              Run Full Analysis and Save
            </button>
            {fullResultPath && (
              <p css={cssObj.output}>
                저장됨:{" "}
                <a
                  href={`http://localhost:8000/${fullResultPath}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  결과 JSON 다운로드
                </a>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}