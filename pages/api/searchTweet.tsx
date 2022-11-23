import type { NextApiRequest, NextApiResponse } from "next";

export const mockUrl = "https://6377ed020992902a2513e93a.mockapi.io/word";
export const localUrl = "http://127.0.0.1:5000/api/simplesssearch";
export const simplessUrl = "http://223.130.134.246:5000/api/simplesssearch";

type SearchResult = {
	keywords?: string[];
	users?: { profile_image_url: string; user_account: string }[];
	posts?: object[];
	finished: boolean;
    error?: any
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<SearchResult>
) {
    try {
        console.log(`searchTweet called ${req.query.search_keyword} ${req.query.continue}`)
		const data = await fetch(simplessUrl, {
			method: "POST",
			headers: {
				"content-type": "application/json; version=2",
			},
			body: JSON.stringify({
				search_keyword: req.query.search_keyword,
				continue: req.query.continue,
				upper_round: 1,
				upper_count: 3,
			}),
		});
		const data_json = await data.json();
		res.status(200).send(data_json)
	} catch (err) {
        res.status(500).send({ error: err, finished: false });
    }
	
}
