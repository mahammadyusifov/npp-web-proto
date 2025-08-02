import { useState } from 'react';
import Box from './Components/SearchSaveUploadBox';
import { handleFileSelection, handleUpload, handleSave } from './utilities/upload-save-browse';

function BayesianPage() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <>
        <Box
        onFileSelect={(selectedFile) => handleFileSelection(selectedFile, setSelectedFile)}
        onUpload={handleUpload}
        onSave={handleSave}
        acceptedFileTypes=".json"
        placeholder="Select your simulation input file"
        width="50%"
        center={{ x: '25%', y: '30%' }}
      />
    </>
  )
}
export default BayesianPage
