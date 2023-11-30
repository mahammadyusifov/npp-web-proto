import { cssObj } from "./style";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import LogoutImage from "@/assets/logout.svg";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { TABS } from "@/constants/TABS";
import { useQuery } from "@tanstack/react-query";
import { useGetProductInfo } from "@/apis/contents/useGetContent";
import { ROUTER } from "@/constants/ROUTER";
import { getCookie } from "@/utils/cookies";
import { API_URL } from "@/constants/API_URL";

export default function Index() {
  const router = useRouter();
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [activeContent, setActiveContent] = useState("FP");
  const [valueObj, setValueObj] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const loadingLayerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

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
      | "FP"
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
      tabData[item.label] = item.values[0];
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

  const postTabValues = async (data: Record<string, Record<string, string>>) => {
    setIsLoading(true);

    for (let key in data) {
      for (let key2 in data[key]) {
        if (data[key][key2] === "High") {
          data[key][key2] = "1";
        }
        else if (data[key][key2] === "Medium"){
          data[key][key2] = "2";
        }
        else if (data[key][key2] === "Low"){
          data[key][key2] = "3";
        }
      }
    }

    const fpInput = document.getElementById("FPInput") as HTMLInputElement;
    const fpInputValue = fpInput.value;
    data["FP"]["FP Input"] = fpInputValue;

    try {
      console.log(data)

      const response = await axios.post(API_URL.CONTENT.COMMON, {
        data: JSON.stringify(data),
        timeout: 60 * 4 * 1000,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        },
      });

      // const response = await axios.get(API_URL.CONTENT.COMMON2,
      //   {
      //     timeout: 60 * 4 * 1000,
      //     headers: {
      //       "Access-Control-Allow-Origin": "*",
      //       "Access-Control-Allow-Credentials": "true",
      //       "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      //       "Access-Control-Allow-Headers":
      //         "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
      //     }
      //   }
      // );

      const response_data = await response;
      console.log(response_data);

      setIsLoading(false);

      return response_data;
    } catch (error) {
      console.error("Error Axios", error);
      setIsLoading(false);
    }
  };


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resultData = await postTabValues(allTabValues);

      router.push({
        pathname: ROUTER.RESULT,
        query: { data: JSON.stringify(resultData) }
      });
    } catch (error) {
      console.error("Error posting data", error);
    }
  };


  return (
    <>
      {isLoading && (
        <div style={loadingLayerStyle}>
          <p>Loading...</p>
        </div>
      )}
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
                <button onClick={() => router.push(ROUTER.SST)}>
                  Statistical Methods
                  </button>
                <button onClick={() => router.push(ROUTER.RESULT)}>
                  Reliability Views
                </button>
              </nav>
            </div>
            <Link href={ROUTER.SIGN_IN}>
              <LogoutImage />
            </Link>
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
                        tab.label === "FP" ? (
                          <li
                            key={`tab-${tab.label}-input`}
                            style={{
                              display: tab.label === activeContent ? "block" : "none",
                            }}
                          >
                            <label>{tab.label}</label>
                            <input
                              id="FPInput"
                              type="text"
                              name="FPInput"
                            />
                          </li>
                        ) : (
                          tab.children.map((item) => (
                            <li
                              key={`tab-${tab.label}-items-${item.label}`}
                              style={{
                                display: tab.label === activeContent ? "block" : "none",
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
                          ))
                        )
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
