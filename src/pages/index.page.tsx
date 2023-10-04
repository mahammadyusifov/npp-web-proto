import { cssObj } from "./style";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { TABS } from "@/constants/TABS";
import { useQuery } from "@tanstack/react-query";
import { useGetProductInfo } from "@/apis/contents/useGetContent";
import { ROUTER } from "@/constants/ROUTER";

export default function Index() {
  const router = useRouter();

  const { data } = useGetProductInfo();

  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [activeContent, setActiveContent] = useState("requirement");
  /**
   * Obj으로 처리한 이유
   * 배열로 children 인덱스에 맞게 넣어줘도 되지만 그럴 경우 데이터가 추가,삭제될때 상이해짐
   */
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

  const showContent = (
    value:
      | "requirement"
      | "design"
      | "implementation"
      | "test"
      | "installlation"
  ) => {
    setActiveContent(value);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      setFileName(e.target.files[0].name);
    }
  };

  const onChangeTabValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValueObj((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
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

      <section css={cssObj.container}>
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
              <form action="">
                <div css={cssObj.content}>
                  <ul>
                    {TABS[
                      TABS.findIndex((tab) => tab.label === activeContent)
                    ].children.map((item) => (
                      <li key={`tab-${activeContent}-items-${item.label}`}>
                        <label>{item.label}</label>
                        <select
                          name={item.label}
                          value={valueObj[item.label]}
                          onChange={onChangeTabValue}
                        >
                          {item.values.map((option) => (
                            <option
                              value={option}
                              key={`tab-${activeContent}-items-${item.label}-${option}`}
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      </li>
                    ))}
                  </ul>
                </div>

                <div css={cssObj.footer}>
                  <button type="submit" css={cssObj.footerButton}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
