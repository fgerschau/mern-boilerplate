import { IItem } from './IItem';

export interface IIssue {
  _id: string;
  issueId: number;
  items?: IItem[];
  publishingDate?: string;
  title: string;
  published: boolean;
  draft: boolean;
  recipients?: string[];
}
