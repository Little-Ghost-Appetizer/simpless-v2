export async function scraper(url: string, keyword?: string): Promise<object> {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"content-type": "application/json; version=2",
		},
		body: JSON.stringify({ data: keyword }),
	});

	const res_json = await res.json();
	console.log(res_json);

	return res_json;
}
