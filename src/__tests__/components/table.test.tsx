import { render, screen } from "@testing-library/react";
import { TableColumn } from "../../shared/components/table/types";
import { Table } from "../../shared/components";


type User = {
  id: number;
  name: string;
};

describe("Table component", () => {
  const columns: TableColumn<User>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
  ];

  const data: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];

  it("renders table headers", () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders data rows correctly", () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("shows message when data is empty", () => {
    render(<Table columns={columns} data={[]} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders custom cell content if cell function is provided", () => {
    const customColumns: TableColumn<User>[] = [
      { header: "ID", accessor: "id" },
      {
        header: "Name",
        accessor: "name",
        cell: (row) => `User: ${row.name}`,
      },
    ];

    render(<Table columns={customColumns} data={[{ id: 1, name: "Charlie" }]} />);
    expect(screen.getByText("User: Charlie")).toBeInTheDocument();
  });

  it("renders '-' if value is undefined and no custom cell", () => {
    const partialData = [{ id: 3 } as User]; 
    render(<Table columns={columns} data={partialData} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });
});
