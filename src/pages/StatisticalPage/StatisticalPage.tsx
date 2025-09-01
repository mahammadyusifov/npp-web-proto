/** @jsxImportSource @emotion/react */
import { useState } from "react";
import axios from "axios";
import { Global } from "@emotion/react";
import { cssObj } from "./style";

export default function StatisticalPage() {
  // 입력값
  const [pfdGoal, setPfdGoal] = useState("");
  const [confidenceGoal, setConfidenceGoal] = useState("");

  // trace 재사용용
  const [traceId, setTraceId] = useState<string | null>(null);

  // 2단계 입력
  const [tests, setTests] = useState<number>(0);
  const [failures, setFailures] = useState<number>(0);

  // 상태/링크
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  // 환경변수로 빼두면 배포 시 편합니다.
  //const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN ?? "http://localhost:8000";
  const API_ORIGIN = "http://localhost:8000";
  const API_BASE = `${API_ORIGIN}/api`;

  // 1) Number of Tests 계산
  const handleSensitivitySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    setDownloadLink(null);
    try {
      const payload: any = {
        pfd_goal: parseFloat(pfdGoal),
        confidence_goal: parseFloat(confidenceGoal),
      };
      if (traceId) payload.trace_id = traceId;

      const res = await axios.post(`${API_BASE}/sensitivity-analysis`, payload);
      const { num_tests } = res.data.data;
      if (res.data.trace_id) setTraceId(res.data.trace_id);
      setTests(Number(num_tests));
    } catch (err) {
      console.error(err);
      setErrorMsg("Sensitivity Analysis 호출 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 2) Update PFD
  const handlePfdUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    setDownloadLink(null);
    try {
      const payload: any = {
        pfd_goal: parseFloat(pfdGoal),
        demand: tests,
        failures: failures,
      };
      if (traceId) payload.trace_id = traceId;

      const res = await axios.post(`${API_BASE}/update-pfd`, payload);
      if (res.data.trace_id) setTraceId(res.data.trace_id);
      // 출력은 생략
    } catch (err) {
      console.error(err);
      setErrorMsg("Update PFD 호출 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 3) Full Analysis (저장 & 다운로드 링크 노출)
  const handleFullAnalysisSubmit = async () => {
    setErrorMsg(null);
    setLoading(true);
    setDownloadLink(null);
    try {
      const payload: any = {
        pfd_goal: parseFloat(pfdGoal),
        confidence_goal: parseFloat(confidenceGoal),
        failures: failures,
      };
      if (traceId) payload.trace_id = traceId;

      const res = await axios.post(`${API_BASE}/full-analysis`, payload);
      if (res.data.trace_id) setTraceId(res.data.trace_id);

      // 서버가 준 상대 경로를 절대 URL로 변환
      const dl = res.data.download_url as string | undefined; // 예: /api/download/uuid.json
      if (dl) {
        const absolute = new URL(dl, API_ORIGIN).toString();
        setDownloadLink(absolute);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Full Analysis 호출 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Global styles={cssObj.globalStyles} />
      <div css={cssObj.pageWrapper}>
        <main css={cssObj.mainContent}>
          <section id="settings-title-section" css={[cssObj.container, cssObj.settingsTitleSection]}>
            <h1 css={cssObj.title}>Statistical Methods</h1>
          </section>

          {loading && (
            <div css={cssObj.container} style={{ marginTop: 8 }}><p>처리 중입니다...</p></div>
          )}
          {errorMsg && (
            <div css={cssObj.container} style={{ marginTop: 8, color: "#d33" }}><p>{errorMsg}</p></div>
          )}

          <div css={cssObj.settingsGrid}>
            {/* 1. Sensitivity Analysis */}
            <div css={cssObj.settingBox}>
              <form onSubmit={handleSensitivitySubmit} css={cssObj.formWrapper}>
                <h2>1. Sensitivity Analysis</h2>
                <div css={cssObj.inputGroup}>
                  <label css={cssObj.inputLabel}>PFD Goal</label>
                  <input
                    type="number"
                    step="any"
                    value={pfdGoal}
                    onChange={(e) => setPfdGoal(e.target.value)}
                    placeholder="예: 0.0001"
                    css={cssObj.inputBox}
                    required
                  />
                </div>
                <div css={cssObj.inputGroup}>
                  <label css={cssObj.inputLabel}>Confidence Goal</label>
                  <input
                    type="number"
                    step="any"
                    value={confidenceGoal}
                    onChange={(e) => setConfidenceGoal(e.target.value)}
                    placeholder="예: 0.95"
                    css={cssObj.inputBox}
                    required
                  />
                </div>
                <button type="submit" css={cssObj.saveButton} disabled={loading}>
                  Calculate Number of Tests
                </button>
              </form>
            </div>

            {/* 2. Update PFD */}
            <div css={cssObj.settingBox}>
              <form onSubmit={handlePfdUpdateSubmit} css={cssObj.formWrapper}>
                <h2>2. Update PFD</h2>
                <div css={cssObj.inputGroup}>
                  <label css={cssObj.inputLabel}>Number of Tests</label>
                  <input
                    type="number"
                    value={tests}
                    onChange={(e) => setTests(Number(e.target.value))}
                    css={cssObj.inputBox}
                    min={1}
                    required
                  />
                </div>
                <div css={cssObj.inputGroup}>
                  <label css={cssObj.inputLabel}>Number of Failures</label>
                  <input
                    type="number"
                    value={failures}
                    onChange={(e) => setFailures(Number(e.target.value))}
                    css={cssObj.inputBox}
                    min={0}
                    required
                  />
                </div>
                <button type="submit" css={cssObj.saveButton} disabled={loading}>
                  Update
                </button>
              </form>
            </div>

            {/* 3. Full Analysis */}
            <div css={[cssObj.settingBox, cssObj.longSettingBox]}>
              <h2>3. Full Analysis (Save JSON)</h2>
              <button css={cssObj.saveButton} onClick={handleFullAnalysisSubmit} disabled={loading}>
                Run Full Analysis and Save
              </button>

              {downloadLink && (
                <p css={cssObj.output} style={{ marginTop: 12 }}>
                  저장됨:&nbsp;
                  {/* download 속성 넣지 마세요! 서버의 Content-Disposition 파일명을 사용해야 함 */}
                  <a href={downloadLink} target="_blank" rel="noreferrer">
                    결과 JSON 다운로드
                  </a>
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}