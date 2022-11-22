export async function scraper(url: string, cont: boolean, keyword?: string): Promise<object> {
	console.log("Asking backend for - keyword: " + keyword + "cont: " + cont)
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"content-type": "application/json; version=2",
		},
		body: JSON.stringify({ search_keyword: keyword, continue: cont, upper_round: 3, upper_count: 10}),
	});
	console.log("Asking Done")
	const res_json = await res.json();
	return res_json;
}
