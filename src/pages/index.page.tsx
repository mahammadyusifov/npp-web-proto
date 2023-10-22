import { cssObj } from "./style";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { TABS } from "@/constants/TABS";
import { useQuery } from "@tanstack/react-query";
import { useGetProductInfo } from "@/apis/contents/useGetContent";
import { ROUTER } from "@/constants/ROUTER";
import { getCookie } from "@/utils/cookies";

export default function Index() {
  const router = useRouter();
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [activeContent, setActiveContent] = useState("Requirement Dev");
  const [valueObj, setValueObj] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState<string>();

  useEffect(() => {
    const obj: Record<string, string> = {};
    TABS.forEach((tab) => {
      tab.children.forEach((item) => {
        obj[item.label] = item.values[0];
      });
    });
    setValueObj(obj);
  }, [activeContent]);

  useEffect(() => {
    const authToken = getCookie("authToken");

    if (!authToken) {
      // router.push(ROUTER.SIGN_IN);
    }
  }, [router]);

  const showContent = (
    value:
      | "Requirement Dev"
      | "Requirement V&V"
      | "Design Dev"
      | "Design V&V"
      | "Implementation Dev"
      | "Implementation V&V"
      | "Test Dev"
      | "Test V&V"
      | "Installlation and Checkout Dev"
      | "Installlation and Checkout V&V"
  ) => {
    setActiveContent(value);
  };

  const moveToPrevTab = () => {
    const currentIndex = TABS.findIndex(tab => tab.label === activeContent);
    if (currentIndex > 0) {
      setActiveContent(TABS[currentIndex - 1].label);
    }
  };

  const moveToNextTab = () => {
    const currentIndex = TABS.findIndex(tab => tab.label === activeContent);
    if (currentIndex < TABS.length - 1) {
      setActiveContent(TABS[currentIndex + 1].label);
    }
  };

  const initialTabData: Record<string, Record<string, string>> = {};
  TABS.forEach((tab) => {
    const tabData: Record<string, string> = {};
    tab.children.forEach((item) => {
      tabData[item.label] = item.values[1];
    });
    initialTabData[tab.label] = tabData;
  });

  const [allTabValues, setAllTabValues] = useState(initialTabData);

  const onChangeTabValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAllTabValues((prevValues) => ({
      ...prevValues,
      [activeContent]: {
        ...prevValues[activeContent],
        [name]: value,
      },
    }));
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      setFileName(e.target.files[0].name);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const activeTabData = allTabValues[activeContent];
    console.log(">>> submit tab value");
    console.log(allTabValues);
  };

  return (
    <>
      <header css={cssObj.header}>
        <div css={cssObj.container}>
          <div>
            <Link href={ROUTER.HOME}>
              <Logo />
            </Link>
            <nav>
              <button
                css={cssObj.active}
                onClick={() => router.push(ROUTER.HOME)}
              >
                Bayesian Methods
              </button>
              <button disabled>Statistical Methods</button>
              <button onClick={() => router.push(ROUTER.RESULT)}>
                Reliability Views
              </button>
            </nav>
          </div>
        </div>
      </header>

      <section
        id="bayesian-title-section"
        css={[cssObj.container, cssObj.bayesianTitleSection]}
      >
        <h1 css={cssObj.title}>Bayesian</h1>
      </section>

      <section css={[cssObj.container, cssObj.scv]}>
        <p>Bayesian Input File</p>
        <div css={cssObj.fileUplaodForm}>
          <div css={cssObj.filebox}>
            <label>
              <div>{fileName ?? "Choose file"}</div>
            </label>
            <input
              type="file"
              css={cssObj.uploadFile}
              ref={fileUploadRef}
              onChange={onChangeFile}
            />
          </div>

          <button onClick={() => fileUploadRef.current?.click()}>Browse</button>
          <button type="submit">Upload</button>
        </div>
      </section>

      <section css={cssObj.tabs}>
        <div css={cssObj.container}>
          <ul>
            {TABS.map((tab) => (
              <li
                key={`tab-${tab.label}`}
                css={activeContent === tab.label ? cssObj.activeTab : {}}
                onClick={() => showContent(tab.label)}
              >
                {tab.label}
              </li>
            ))}
          </ul>
          <div>
            <div css={[cssObj.tabContent, cssObj.show]}>
              <form action="" onSubmit={onSubmit}>
                <div css={cssObj.footer}>
                  <button type="button" onClick={moveToPrevTab} css={cssObj.navigateButton}>
                    Prev
                  </button>
                  <button type="button" data-button="next" onClick={moveToNextTab} css={cssObj.navigateButton}>
                    Next
                  </button>
                  <button type="submit" css={cssObj.footerButton}>
                    Submit
                  </button>
                </div>
                <div css={cssObj.content}>
                  <ul>
                    {TABS.map((tab) =>
                      tab.children.map((item) => (
                        <li
                          key={`tab-${tab.label}-items-${item.label}`}
                          style={{
                            display:
                              tab.label === activeContent ? "block" : "none",
                          }}
                        >
                          <label>{item.label}</label>
                          <select
                            name={item.label}
                            value={allTabValues[tab.label][item.label]}
                            onChange={onChangeTabValue}
                          >
                            {item.values.map((option) => (
                              <option
                                value={option}
                                key={`tab-${tab.label}-items-${item.label}-${option}`}
                              >
                                {option}
                              </option>
                            ))}
                          </select>
                        </li>
                      )),
                    )}
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
