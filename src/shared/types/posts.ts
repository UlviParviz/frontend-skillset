import { TableRow } from "../components/table/types";

export interface Post extends TableRow {
  id: number;
  userId: number;
  title: string;
  body: string;
}
