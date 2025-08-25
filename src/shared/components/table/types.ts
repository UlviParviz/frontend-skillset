export type TableColumn<T> = {
  header: string;
  accessor: keyof T;
  cell?: (row: T) => React.ReactNode;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  height?: string
};

export type TableRow = Record<string, unknown> & {
  id?: string | number | undefined;
};

