import { COLORS } from "@/constants/COLORS";
import { FONT_SIZE } from "@/constants/FONT_SIZE";
import { css } from "@emotion/react";

export const cssObj = {
  header: css`
    background-color: ${COLORS.gray800};
    height: 60px;
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
    }
    & button:last-child {
      margin-right: 0;
    }
    & div a:last-child {
      margin-right: -20px;
    }
    & button.active {
      color: ${COLORS.white};
    }
  `,
  container: css`
    width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
  `,
  active: css`
    color: ${COLORS.white};
  `,
  title: css`
    font-size: ${FONT_SIZE["3xl"]};
    padding: 30px 0;
  `,
  chart: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    & > div {
      width: 50%;
      margin-bottom: 80px;
    }
    & > div:nth-child(5),
    & > div:nth-child(6) {
      width: 100%;
    }
    & > div:nth-child(6) {
      margin-bottom: 0;
    }
  `,
};
