import { ELang, EMood } from "@models/users/schemas/user.schema";

export interface ISentimentResult {
  id: string;
  sentiment: EMood;
}

export interface ILanguageResult {
  id: string;
  primaryLanguage: {
    iso6391Name: string;
  };
}

export interface IUserUpdates {
  [key: string]: {
    mood?: EMood;
    lang?: ELang;
  };
}
