import Badge from "./Badge";
import { scraper } from "../components/Fetcher";
import useSWR, { mutate, useSWRConfig } from "swr";
import { useEffect } from "react";

interface BadgeListProps {
	keyword?: string;
}

function BadgeList({ keyword }: BadgeListProps) {
	const { data, mutate, error, isValidating } = useSWR(
		keyword ? "http://127.0.0.1:5000" : null,
		(url) => scraper(url, keyword),
		{ revalidateOnFocus: false }
	);

	useEffect(() => {
		mutate();
	}, [keyword, mutate]);

	return (
		<div>
			{data && !isValidating && !error ? (
				Object.values(data).map((t: any, idx: number) => {
					return (
						<Badge className="mr-4" key={idx} label={t.url} type="keyword" />
					);
				})
			) : (
				<div> Searching for keyword {keyword}... </div>
			)}
		</div>
	);
}

export default BadgeList;
