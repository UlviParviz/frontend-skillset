import "./index.scss";
import type { TableProps } from "./types";

function Table<T>({ columns, data, height  }: TableProps<T>) {
  return (
    <table className="custom-table" style={{height}} >
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              style={{
                textAlign: "center",
              }}
              key={String(col.accessor)}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length}>No data available</td>
          </tr>
        ) : (
          data.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={String(col.accessor)}>
                  {col.cell ? col.cell(row) : String(row[col.accessor] ?? "-")}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default Table;
