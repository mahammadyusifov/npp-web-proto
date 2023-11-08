import { css } from "@emotion/react";

export const cssObj = {
  wrapper: css`
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: #eaeaea;

    & > section {
      width: 448px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    & section > img {
      margin-bottom: 15px;
    }

    & section > h1 {
      margin-bottom: 15px;
    }

    & section > p {
      margin-bottom: 42px;
    }

    & section > form {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 24px;
    }

    & section > form input {
      height: 38px;
      border: 1px solid var(--gray-300);
      padding: 8px 12px;

      &:focus {
        outline: none;
      }
    }

    & section > form input::-webkit-input-placeholder {
      font-size: var(--font-sm);
      color: var(--gray-500);
    }

    & section > form input::-moz-placeholder {
      font-size: var(--font-sm);
      color: var(--gray-500);
    }

    & section > form input:-ms-input-placeholder {
      font-size: var(--font-sm);
      color: var(--gray-500);
    }

    & section > form input::-ms-input-placeholder {
      font-size: var(--font-sm);
      color: var(--gray-500);
    }

    & section > form input::placeholder {
      font-size: var(--font-sm);
      color: var(--gray-500);
    }

    & section > form input:first-of-type {
      border-radius: 5px 5px 0 0;
    }

    & section > form input:last-of-type {
      border-radius: 0 0 5px 5px;
      margin-top: -1px;
      margin-bottom: 42px;
    }

    & section > form button {
      height: 38px;
      border: none;
      background-color: var(--primary-color);
      color: var(--white);
      border-radius: 5px;
      font-size: var(--font-sm);
    }

    & section > div {
      width: 100%;
    }

    & section > div > a {
      color: var(--blue-900);
      text-decoration: none;
      font-size: var(--font-sm);
    }
  `,
};
