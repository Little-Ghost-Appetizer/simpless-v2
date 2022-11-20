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
		<>
			{!keyword ? (
				<div className="text-center h-full"> Enter a tweet </div>
			) : res?.keywords && !isValidating && !error ? (
				<div className="space-y-4 flex-col flex-wrap flex-grow">
					{res.keywords.map((t: any, idx: number) => {
						return (
							<Badge
								className=""
								key={idx}
								idx={idx}
								label={t}
								type="keyword"
							/>
						);
					})}
				</div>
			) : (
				<div className="flex flex-col mt-16">
					<span className="text-lg text-center mb-2">
						Searching for keywords
					</span>
					<div className="animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-blue-700 m-auto" />
				</div>
			)}
		</>
	);
}

export default BadgeList;
