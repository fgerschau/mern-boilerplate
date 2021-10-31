export interface IExternalItem {
  _id: string;
  title?: string;
  url: string;
  originalUrl: string;
  date: string;
  likes?: number;
  origin: 'Reddit';
  externalId?: string;
  liked?: boolean;
}
