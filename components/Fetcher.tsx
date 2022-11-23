export const mockUrl = "https://6377ed020992902a2513e93a.mockapi.io/word";
export const localUrl = "http://127.0.0.1:5000";
export const simplessUrl = "https://223.130.134.246:5000/api/simplesssearch";

export async function initFetcher(url: string, keyword?: string): Promise<object> {
	console.log("First asking backend for - keyword: " + keyword)
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"content-type": "application/json; version=2",
		},
		body: JSON.stringify({ search_keyword: keyword, continue: false, upper_round: 3, upper_count: 2}),
	});
	console.log("Asking Done")
	const res_json = await res.json();
	return res_json;
}

export async function continueFetcher(url: string, keyword?: string): Promise<object> {
	console.log("Continue asking backend for - keyword: " + keyword)
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"content-type": "application/json; version=2",
		},
		body: JSON.stringify({ search_keyword: keyword, continue: true, upper_round: 3, upper_count: 2}),
	});
	console.log("Asking Done")
	const res_json = await res.json();
	return res_json;
}

export interface ResponseType {
	keywords: string[];
	users: { profile_image_url: string; user_account: string }[];
	posts: object[];
	finished: boolean;
}