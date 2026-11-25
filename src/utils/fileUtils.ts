import Papa from "papaparse";

export const parseFile = (file: any): Promise<any[]> => {
  return new Promise((resolved, reject) => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!["csv", "json"].includes(extension ?? "")) {
      reject(new Error("Only CSV and JSON files are supported"));
      return;
    }
    if (file.size === 0 || !file) {
      reject(new Error("The selected File is emplty"));
      return;
    }

    if (extension === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,

        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error(results?.errors[0].message));
            return;
          }
          if (results.data.length === 0) {
            reject(new Error("No Records Found"));
            return;
          }
          resolved(results.data as any[]);
        },
        error: (err) => {
          reject(new Error(err.message));
        },
      });
    }
    if (extension === "json") {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const parsedData = JSON.parse(text);
          const records = Array.isArray(parsedData) ? parsedData : [parsedData];

          if (records.length === 0) {
            reject(new Error("No Records Found"));
            return;
          }
          resolved(records);
        } catch (err) {
          reject(new WebTransportError("Invalid Json"));
        }
      };

      reader.onerror = () => {
        reject(new Error("Failed to read the json"));
      };

      reader.readAsText;
    }
  });
};
