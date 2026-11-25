import { useEffect, useMemo, useState } from "react";
import { SampleData } from "../data/sampleData";

export const DataTable = () => {
  const [search, setSearch] = useState<any>("");
  const [sortColumn, setSortColumn] = useState<String | null>(null);
  const [data, setData] = useState<any>(SampleData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const pageSize = 5;
  const sourceData = SampleData;

  const filteredData = async (input: any) => {
    setSearch(input);

    if (!input.trim()) {
      setData(SampleData);
      return;
    }
    const tempData = data.filter((row: any) => {
      return;
    });
    console.log(tempData);
    setData(tempData);
  };

  

  return (
    <>
      <section className="table-card">
        <h2>DataSet Records</h2>
        <input
          className="search-input"
          type="search"
          placeholder="Search All Columns"
          value={search}
          onChange={(e) => {
            filteredData(e.target.value);
          }}
        />
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>email</th>
                <th>age</th>
                <th>city</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data: any) => (
                <>
                  <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.age}</td>
                    <td>{data.city}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </section>{" "}
    </>
  );
};

export default DataTable;
