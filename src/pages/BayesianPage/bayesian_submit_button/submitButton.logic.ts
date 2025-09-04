import type { Dispatch, SetStateAction } from 'react';

// This defines the structure of the dropdown data object
export interface DropdownValues {
  [key: string]: string;
}

export type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

type SetState<T> = Dispatch<SetStateAction<T>>;

// This is the function that formats your data into the correct JSON structure for the API
const formatPayload = (values: DropdownValues, settings ) => {
  const payload: { [key: string]: any } = {};

  for (const key in values) {
    const [tabLabel, childLabel] = key.split('/');
    if (!payload[tabLabel]) {
      payload[tabLabel] = {};
    }
    payload[tabLabel][childLabel] = values[key];
  }

  console.log('INPUTTED settings:', settings);
  payload['FP'] = { 'FP Input': '120' };
  payload['settings'] = {
    nChains: String(settings.nChains),
    nIter: String(settings.nIter),
    nBurnin: String(settings.nBurnin),
    nThin: String(settings.nThin),
    computeDIC: String(settings.computeDIC),
    workingDir: settings.workingDir,
  };
  return payload;
};

export const handleSubmitLogic = async (
  dropdownValues: DropdownValues,
  settings,
  setIsLoading: SetState<boolean>,
  setStatusMessage: SetState<string>,
  setSubmissionState: SetState<SubmissionState>
) => {
  setIsLoading(true);
  setStatusMessage('Submitting...');
  setSubmissionState('submitting');

  const API_URL = "https://a2gxqrwnzi.execute-api.ap-northeast-2.amazonaws.com/dev/start-simulation";
  const payload = formatPayload(dropdownValues, settings);
  const requestBody = { data: JSON.stringify(payload) };

  try {
    // These are the required options for sending JSON data in a POST request
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || `API Error: ${response.status}`);
    
    setStatusMessage('Success!');
    setSubmissionState('success');

  } catch (error) {
    console.error('Submission failed:', error);
    setStatusMessage('Error!');
    setSubmissionState('error');

  } finally {
    setTimeout(() => {
      setStatusMessage('Submit');
      setIsLoading(false);
      setSubmissionState('idle');
    }, 5000);
  }
};