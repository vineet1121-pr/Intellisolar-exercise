import { useRef } from "react";
import { Upload, FileText } from "lucide-react";

interface FIleUploadProps {
  onFileSelect: (file: File) => void;
  loading: boolean;
}

export const  FileUpload = ({ onFileSelect, loading }: FIleUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      onFileSelect(file);
    }

    e.target.value = "";
  };

  return (
    <div className="upload-section">
      <div className="upload-content">
        <FileText size={32} />

        <div>
          <h3>Upload Your dataset</h3>
          <p>Upload CSV</p>
        </div>
        <button
          className="upload-button"
          type="button"
          disabled={loading}
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <Upload size={16} />
          {loading ? "Proccessing..." : "Choose Files"}
        </button>
        <input
          ref={inputRef}
          type="file"
        //   accept=".csv,.json"
          hidden
          onChange={handleChange}
        />
        <p>Supported Formats : CSV, Json</p>
      </div>
    </div>
  );
}

export default FileUpload;
