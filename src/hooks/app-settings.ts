// src/hooks/useAppSettings.ts

import { useState } from 'react';

// 1. Create and export the custom hook function.
export const AppSettings = (): AppSettings => {
  // 2. Move all your useState calls inside this function.
  const [nChains, setnChains] = useState(4);
  const [nIter, setnIter] = useState(10000);
  const [nBurnin, setnBurnin] = useState(2000);
  const [nThin, setnThin] =  useState(1);
  const [computeDIC, setcomputeDIC] = useState(true);
  const [workingDir, setworkingDir] = useState('/app/results');

  // 3. Return all the values and setters in a single object.
  return {
    nChains, nIter, nBurnin, computeDIC, nThin, workingDir,
    setnChains, setnIter, setnBurnin, setcomputeDIC, setnThin, setworkingDir
  };
};