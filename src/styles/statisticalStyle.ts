import { css } from "@emotion/react";

export const cssObj = {
  container: css`
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 20px;
    font-family: 'Segoe UI', sans-serif;
  `,
  containerHeader: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  header: css`
    background-color: #1f2937;
    color: white;
  `,
  nav: css`
    display: flex;
    gap: 20px;

    button {
      background: none;
      color: white;
      font-size: 14px;
      font-weight: 500;
      border: none;
      cursor: pointer;
    }
  `,
  active: css`
    font-weight: 700;
    text-decoration: underline;
  `,
  title: css`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 30px;
  `,
  sectionBox: css`
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 24px;
    border-radius: 8px;
    margin-bottom: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  `,
  input: css`
    padding: 8px 12px;
    margin-left: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 180px;
  `,
  labelSpacing: css`
    margin-left: 20px;
  `,
  button: css`
    background-color: #2563eb;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    margin-left: 20px;
    cursor: pointer;
    font-weight: 600;
  `,
  output: css`
    margin-top: 16px;
    font-size: 14px;
    color: #111827;
  `,
};