import Badge from "./Tag";
import { scraper } from "./Fetcher";
import useSWR, { mutate, useSWRConfig } from "swr";
import { useEffect } from "react";

interface BadgeListProps {
	keyword?: string;
}

interface ResponseType {
	keywords: string[];
}

const mockUrl = "https://6377ed020992902a2513e93a.mockapi.io/word";

function BadgeList({ keyword }: BadgeListProps) {
	const { data, mutate, error, isValidating } = useSWR(
		keyword ? mockUrl : null,
		(url) => scraper(url, keyword),
		{ revalidateOnFocus: false }
	);
	const res = data as ResponseType;

	useEffect(() => {
		mutate();
	}, [keyword, mutate]);

	return (
		<div className="space-y-4 flex-col flex-wrap">
			{data && !isValidating && !error ? (
				res.keywords.map((t: any, idx: number) => {
					return <Badge className="mr-4" key={idx} label={t} type="keyword" />;
				})
			) : (
				<div className="text-center">
					<span className="text-lg text-center">Searching for</span>
					<br />
					<span>{keyword}</span>
					<br />
					<div className="animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-blue-700" />
				</div>
			)}
		</div>
	);
}

export default BadgeList;
