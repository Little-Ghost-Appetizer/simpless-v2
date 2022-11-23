import { Fetcher } from "swr";

export const mockUrl = "https://6377ed020992902a2513e93a.mockapi.io/word";
export const localUrl = "http://127.0.0.1:5000";
export const simplessUrl = "https://223.130.134.246:5000/api/simplesssearch";
export interface SearchResult {
	keywords?: string[];
	users?: { profile_image_url: string; user_account: string }[];
	posts?: object[];
	finished: boolean;
}