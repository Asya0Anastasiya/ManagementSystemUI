import { DocumentWithSourceId } from "../../../models/documentWithSourceId.model";

export interface RowWithDocs {
    date: string;
    hours: number;
    type: string;
    status: string;
    color: string;
    id: string;
    docs: DocumentWithSourceId[];
}