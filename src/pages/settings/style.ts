import { COLORS } from "@/constants/COLORS";
import { FONT_SIZE } from "@/constants/FONT_SIZE";
import { css } from "@emotion/react";

export const cssObj = {
  // New wrapper to control the page layout, especially for the footer button
  pageWrapper: css`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f9fafb; // Light grey background for the whole page
  `,

  header: css`
    background-color: ${COLORS.gray800};
    height: 60px;
    flex-shrink: 0; // Prevent header from shrinking
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

  // New style for the main content area
  mainContent: css`
    flex-grow: 1; // Allows main content to fill available space
    padding-bottom: 100px; // Add padding to avoid content being hidden by the save button
  `,

  settingsTitleSection: css`
    margin-top: 40px;
    margin-bottom: 24px;
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
  
  newButton: css`
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

  // A grid layout for all the settings cards
  settingsGrid: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
  `,

  // The style for each individual setting "card"
  settingBox: css`
    background-color: ${COLORS.white};
    border: 1px solid ${COLORS.gray200};
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    /* For text and number inputs, stack the label and input vertically */
    &:not(:has(input[type="checkbox"])) {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  `,

  // Style to make a setting box span the full width of the grid
  longSettingBox: css`
    grid-column: 1 / -1; // Span all columns
  `,

  inputLabel : css`
    font-size: ${FONT_SIZE.sm};
    font-weight: 500;
    color: ${COLORS.gray700};
  `,

  inputBox: css`
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid ${COLORS.gray300};
    font-size: ${FONT_SIZE.sm};
    color: ${COLORS.gray800};
    background-color: ${COLORS.white};
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      outline: none;
      border-color: ${COLORS.blue500};
      box-shadow: 0 0 0 1px ${COLORS.blue500};
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }

    &[type='number']::-webkit-outer-spin-button,
    &[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type="checkbox"] {
      width: 20px;
      height: 20px;
    }
  `,

  // Fixed container at the bottom right for the save button
  saveButtonContainer: css`
    position: fixed;
    bottom: 30px;
    right: 40px;
  `,
  
  saveButton: css`
    padding: 12px 24px;
    background-color: ${COLORS.blue600};
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: ${FONT_SIZE.sm};
    font-weight: 600;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    transition: background-color 0.2s;

    &:hover {
      background-color: ${COLORS.blue700};
    }
  `,
};
