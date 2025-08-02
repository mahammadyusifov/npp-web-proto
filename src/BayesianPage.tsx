import { useState } from 'react';

import { handleFileSelection, handleUpload, handleSave } from './utilities/upload-save-browse';
import NavigationBar from './Components/NavigationBar';

function BayesianPage() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <>
      <NavigationBar 
      width='100%'
      height='650px'
      color = 'bg-blue-300'
      center = {{ x: '50%', y: '75%' }}
      shape = 'sharp-rectangle'
      />
    </>
  )
}
export default BayesianPage
