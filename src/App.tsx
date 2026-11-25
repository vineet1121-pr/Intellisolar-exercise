// import { Camera } from 'lucide-react';
// import {Camera} from 'lucide-react'

import { useState } from "react";
import { DataTable } from "./component/DataTable";
import { FileUpload } from "./component/FileUpload";
import { parseFile } from "./utils/fileUtils";
// Usage
const App = () => {
  // return <h1>Smart Data Explorer</h1>;
  // return <></>
  const [data, setData] = useState<any[]>([]);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = async (file: File) => {
    try {
      setLoading(true);
      setError("");

      const records = await parseFile(file);
      setData(records);
      setFileName(file.name);
      setFileSize(file.size);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <FileUpload onFileSelect={handleFileSelect} loading={loading} />
      {error && <div>{error}</div>}
      {fileName && (
        <div>
          <strong>{fileName}</strong>
          <p>{fileSize}</p>
        </div>
      )}
      <div style={{marginTop:'3rem'}}>
        <DataTable />
      </div>
    </>
  );
};
export default App;
