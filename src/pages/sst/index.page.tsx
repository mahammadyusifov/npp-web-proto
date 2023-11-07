import { cssObj } from "./style";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
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
  const [activeContent, setActiveContent] = useState("Requirement Dev");
  const [valueObj, setValueObj] = useState<Record<string, string>>({});
//   const [fileName, setFileName] = useState<string>();
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

    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
    const [z, setZ] = useState<number | null>(null);
  
    const handleCalculate = () => {
      const result = x + y;
      setZ(result)
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

    try {
      // const response = await axios.post(API_URL.CONTENT.COMMON2,
      //   data,
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

      const response = await axios.get(API_URL.CONTENT.COMMON2,
        {
          timeout: 60 * 4 * 1000,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers":
              "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
          }
        }
      );

      setIsLoading(false);

      return response.data;
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
        // pathname: ROUTER.RESULT,
        // query: { data: JSON.stringify(resultData) }
      });
    } catch (error) {
      console.error("Error posting data", error);
    }
  };


  return (
    <>
      {/* {isLoading && (
        <div style={loadingLayerStyle}>
          <p>Loading...</p>
        </div>
      )} */}
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
          </div>
        </header>

        <section
          id="sst-title-section"
          css={[cssObj.container, cssObj.sstTitleSection]}
        >
          <h1 css={cssObj.title}>Statistical Methods</h1>
        </section>

   

        <section css={cssObj.tabs}>
          <div css={cssObj.container}>
            <ul>
              {/* {TABS.map((tab) => (
                <li
                  key={`tab-${tab.label}`}
                  css={activeContent === tab.label ? cssObj.activeTab : {}}
                  onClick={() => showContent(tab.label)}
                >
                  {tab.label}
                </li>
              ))} */}
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
                    {/* <button type="submit" css={cssObj.footerButton}>
                      Submit
                    </button> */}
                  </div>
                  <div css={cssObj.content}>
                    <div>
                        <h1>Calculator</h1>
                        <label>
                            Number of tests
                            <input
                            type="number"
                            value={x}
                            onChange={(e) => setX(Number(e.target.value))}
                            />
                        </label>
                        <br />
                        <label>
                            Number of failures
                            <input
                            type="number"
                            value={y}
                            onChange={(e) => setY(Number(e.target.value))}
                            />
                        </label>
                        <button onClick={handleCalculate}>Calculate</button>
                        <br />
                        {z !== null && (
                            <div>
                            <p>Result: {z}</p>
                            </div>
                        )}
                    </div>                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}




