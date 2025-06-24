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
  meantext: {
    marginTop: '0mm', // Moves "MEAN" down
    display: 'inline-block', // Ensures margin works properly
  },
  chart: {
    marginTop: '2mm', // Adds 2mm space below "PLOTS"
  },

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
  `,
  scv: css`
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
      padding-left: 8px;
      color: ${COLORS.gray500};
      font-size: ${FONT_SIZE.sm};
    }
  `,
  fileUplaodForm: css`
    display: flex;
    margin-bottom: 45px;
    & button {
      width: 74px;
      font-size: ${FONT_SIZE.sm};
      border: 1px solid ${COLORS.gray300};
      background-color: ${COLORS.gray50};
      color: ${COLORS.gray500};
      transition: 0.3s;
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
  tabs: css`
    margin-top: 30px;
    background-color: ${COLORS.gray100};
    width: 100vw;
    height: calc(100vh - (60px + 94.5px + 58.09px + 45px));
    padding-top: 90px;

    & > div {
      display: flex;
    }
    & > div > ul {
      font-size: ${FONT_SIZE.xs};
      margin-right: 63px;
      width: 155px;
    }
    & > div > ul > li {
      padding-bottom: 16px;
      cursor: default;
      color: ${COLORS.gray600};
    }
    & > div > ul > li.active {
      color: ${COLORS.gray600};
      font-weight: bold;
    }
    & > div > div {
      width: 1022px;
    }
  `,
  activeTab: css`
    color: ${COLORS.blue600} !important;
    font-weight: bold;
  `,
  tabContent: css`
    display: flex;
    flexDirection : column;

    & > div .tab-content.show {
      display: block;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);
    }
  `,
  show: css`
    display: block;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);
  `,
  content: css`
    padding: 70px 46px;
    width: 100%;
    background-color: ${COLORS.white};
    border-radius: 5px 5px 0 0;

    & > ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      display: flex;
    }
    & > ul > li {
      width: 33.3%;
      display: flex;
      flex-direction: column;
      margin-bottom: 35px;
    }

    & > ul > li > label {
      font-size: ${FONT_SIZE.sm};
      margin-bottom: 4px;
      color: ${COLORS.gray700};
    }
    & > ul > li > select {
      width: 250px;
      max-width: 250px;
      height: 38px;
      border: 1px solid ${COLORS.gray300};
      border-radius: 5px;
      font-size: ${FONT_SIZE.sm};
      color: ${COLORS.gray500};
    }
  `,
  lastItem: css`
    margin-bottom: 0;
  `,
  footer: css`
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: ${COLORS.gray50};
    border-radius: 0 0 5px 5px;
  `,
  footerButton: css`
    margin-right: 24px;
    background-color: ${COLORS.blue600};
    color: ${COLORS.white};
    border: none;
    border-radius: 4px;
    font-size: ${FONT_SIZE.xs};
    padding: 8px 16px;
  `,
  navigateButton: css`
    background-color: ${COLORS.gray50};
    color: ${COLORS.gray500};
    border: none;
    border-radius: 4px;
    font-size: ${FONT_SIZE.xs};
    padding: 8px 16px;
    &[data-button="next"] {
      margin-right: 16px;
    }
  `,
  bayesianTitleSection: css`
    margin-top: 30px;
  `,
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '5mm', // This creates the 10mm spacing between LogoutImage and the new button
  },
  
  newButton: {
    // Add your button styling here
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },

  listItem : {
    display: 'flex',              // Flexbox to align label and input side by side
    alignItems: 'center',         // Vertically center them
    justifyContent: 'flex-start', // Align items to the start of the container
    flexWrap: 'nowrap',           // Prevent wrapping to the next line
    width: '100%',                // Ensure full width is used, preventing overflow
    position: 'relative',        // Allows fine-tuning with "top"
    top: '-40px',                // Moves labels & inputs **up** within the container
  },

  // Add this to your cssObj
  inputBox: css`
  padding: 5px;
  margin-left: 0.5cm;
  border-radius: 4px;
  border: 1px solid ${COLORS.gray300};
  min-width: 70px; // Minimum width for small values
  transition: width 0.2s ease; // Smooth transition for width changes

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`,

  inputLabel : {
    fontWeight: 'bold',           // Bold for the label
    width: '500px',               // Fixed width for the label (adjust as necessary)
    whiteSpace: 'nowrap',         // Ensure label text doesn’t wrap
    position: 'relative',
    top: '-5px',   // Fine-tune this value to move labels slightly upwards
  },

  saveButtonContainer: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',  // Blue color
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#0056b3',  // Darker blue on hover
    },
  },
};