import { COLORS } from "@/constants/COLORS";
import { FONT_SIZE } from "@/constants/FONT_SIZE";
import { css } from "@emotion/react";

export const cssObj = {
  // Page layout copied from Statistical Methods for consistency
  pageWrapper: css`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f9fafb; // Light gray background
  `,
  header: css`
    background-color: ${COLORS.gray800};
    height: 60px;
    flex-shrink: 0;
    & > div {
      display: flex;
      align-items: center;
      height: 100%;
      justify-content: space-between;
    }
    & > div > div {
      display: flex;
      align-items: center;
    }
    & > div img {
      margin-right: 20px;
    }
    & button {
      background: transparent;
      border: none;
      color: ${COLORS.gray300};
      font-size: ${FONT_SIZE.xs};
      height: 60px;
      margin-left: 20px;
      margin-right: 0;
      cursor: pointer;
      transition: color 0.2s;
      &:hover {
        color: ${COLORS.white};
      }
    }
  `,
  active: css`
    color: ${COLORS.white} !important;
  `,
  container: css`
    width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
  `,
  mainContent: css`
    flex-grow: 1;
    padding-bottom: 100px;
  `,
  titleSection: css`
    margin-top: 40px;
    /* margin-bottom is handled by the upload section's margin */
  `,
  title: css`
    font-size: ${FONT_SIZE["3xl"]};
    color: ${COLORS.gray800};
    font-weight: 700;
  `,
  rightSection: css`
    display: flex;
    align-items: center;
    gap: 20px;
  `,
  settingsButton: css`
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${COLORS.gray700};
    color: ${COLORS.white};
    border: none;
    font-size: ${FONT_SIZE.sm};
    &:hover {
      background-color: ${COLORS.gray600};
    }
  `,

  // Original File Upload Styles
  scv: css`
    margin-top: 24px;
    & > p {
      margin-bottom: 4px;
      color: ${COLORS.gray700};
      font-size: ${FONT_SIZE.sm};
    }
  `,
  filebox: css`
    position: relative;
    & > label > div {
      cursor: pointer;
      width: 430px;
      height: 38px;
      border: 1px solid ${COLORS.gray300};
      border-radius: 5px 0 0 5px;
      line-height: 38px;
      padding-left: 12px;
      color: ${COLORS.gray500};
      font-size: ${FONT_SIZE.sm};
      background-color: ${COLORS.white};
    }
  `,
  fileUplaodForm: css`
    display: flex;
    margin-bottom: 30px; // Spacing between upload and plots
    & button {
      width: 74px;
      font-size: ${FONT_SIZE.sm};
      border: 1px solid ${COLORS.gray300};
      border-left: none;
      background-color: ${COLORS.gray50};
      color: ${COLORS.gray700};
      transition: 0.2s;
      cursor: pointer;
      &:hover {
        background-color: ${COLORS.gray200};
      }
      &:last-of-type {
        border-radius: 0 5px 5px 0;
      }
    }
  `,
  uploadFile: css`
    display: none;
  `,

  // Grid and Box styles for the Plots
  resultsGrid: css`
    display: grid;
    grid-template-columns: repeat(2, 1fr); // Two columns for plots
    gap: 24px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
  `,
  resultBox: css`
    background-color: ${COLORS.white};
    border: 1px solid ${COLORS.gray200};
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 20px;
    h2 {
      font-size: ${FONT_SIZE.lg};
      font-weight: 600;
      color: ${COLORS.gray800};
      margin: 0;
    }
  `,
  metricDisplay: css`
    display: flex;
    gap: 8px;
    font-size: ${FONT_SIZE.sm};
    color: ${COLORS.gray600};
    align-items: center;
  `,
  metricValue: css`
    font-weight: 600;
    font-size: ${FONT_SIZE.md};
    color: ${COLORS.gray800};
  `,
  chartContainer: css`
    width: 100%;
    height: 300px;
  `,
  chartPlaceholder: css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${COLORS.gray50};
    border-radius: 6px;
    color: ${COLORS.gray500};
    font-size: ${FONT_SIZE.md};
  `,
};