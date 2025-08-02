import React, { useRef, useState, CSSProperties } from 'react';

// --- Type Definition for the Component's Props ---
interface FileHandlerBoxProps {
  // A callback function that receives the selected file object.
  onFileSelect: (file: File | null) => void;
  // Callback for the Upload button.
  onUpload?: () => void;
  // Callback for the Save button.
  onSave?: () => void;
  // An optional string to specify the accepted file types (e.g., ".json, .txt").
  acceptedFileTypes?: string;
  // Placeholder text to display when no file is chosen.
  placeholder?: string;
  // --- New Props for Sizing and Positioning ---
  width?: string;
  height?: string;
  center?: { x: string; y: string };
}

// --- Main Component ---
const Box: React.FC<FileHandlerBoxProps> = ({
  onFileSelect,
  onUpload,
  onSave,
  acceptedFileTypes = "*",
  placeholder = "Choose a file or drag it here",
  width = '100%',
  height = 'auto',
  center,
}) => {
  // State to hold the name of the selected file for display.
  const [fileName, setFileName] = useState<string | null>(null);
  // A ref to programmatically access the hidden file input element.
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Compartmentalized Browse Function ---
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  // --- File Change Handler ---
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    } else {
      setFileName(null);
      onFileSelect(null);
    }
  };

  // --- Dynamic Styling for Positioning and Sizing ---
  const containerStyle: CSSProperties = {
    width: width,
    height: height,
  };

  if (center) {
    containerStyle.position = 'absolute';
    containerStyle.top = center.y;
    containerStyle.left = center.x;
    containerStyle.transform = 'translate(-50%, -50%)';
  }

  return (
    <div style={containerStyle} className={`font-sans ${!center ? 'max-w-2xl mx-auto' : ''}`}>
      <div className="flex items-center justify-between bg-white border-2 border-dashed border-gray-300 rounded-lg p-2 pl-4 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 h-full">
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={acceptedFileTypes}
          className="hidden"
        />

        <div className="flex items-center space-x-3 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${fileName ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className={`text-sm truncate ${fileName ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
            {fileName || placeholder}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleBrowseClick}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Browse
          </button>
          <button
            type="button"
            onClick={onUpload}
            className="px-4 py-2 text-sm font-semibold text-green-700 bg-green-100 rounded-md shadow-sm hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            Upload
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-4 py-2 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-md shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Box;


// --- Example Usage in your App/Homepage component ---
/*
function YourPageComponent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelection = (file: File | null) => {
    console.log("File selected in parent:", file);
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
    } else {
      console.log("No file selected to upload.");
    }
  };

  const handleSave = () => {
    console.log("Save action triggered.");
  };

  return (
    <div className="relative w-full h-screen p-10 bg-gray-100">
      <ModernFileSelector
        onFileSelect={handleFileSelection}
        onUpload={handleUpload}
        onSave={handleSave}
        acceptedFileTypes=".json, .txt"
        placeholder="Select your simulation input file"
        width="50%"
        center={{ x: '50%', y: '30%' }}
      />
    </div>
  );
}
*/
