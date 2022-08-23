export type PrimaryLanguage = {
  color: string;
  id: string;
  name: string;
};

export type Repository = {
  description: string;
  forkCount: number;
  id?: number;
  name: string;
  primaryLanguage: PrimaryLanguage;
  stargazerCount: number;
  url: string;
};
