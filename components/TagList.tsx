import Tag from "./Tag";
import { scraper } from "./Fetcher";
import useSWR, { mutate, useSWRConfig } from "swr";
import { useEffect } from "react";

interface TagListProps {
	tweet?: string;
	setSelectedKeywords: Function;
}

interface ResponseType {
	keywords: string[];
}

const mockUrl = "https://6377ed020992902a2513e93a.mockapi.io/word";
const url = "http://127.0.0.1:5000"

function BadgeList({ tweet, setSelectedKeywords }: TagListProps) {
	const { data, mutate, error, isValidating } = useSWR(
		tweet ? mockUrl : null,
		(url) => scraper(url, tweet),
		{ revalidateOnFocus: false }
	);
	const res = data as ResponseType;

	useEffect(() => {
		mutate();
		setSelectedKeywords([])
	}, [tweet, mutate, setSelectedKeywords]);

	// useEffect(() => {
	// 	if(res) setSelectedKeywords(res.keywords)
	// }, [setSelectedKeywords, res]);

	return (
		<>
			{res?.keywords && !isValidating && !error ? (
				<>
				<div className="text-lg mb-2 md:text-xl md:my-4"> In this context, people are talking about... </div>
				<div className="space-y-3 md:space-y-4 flex-col flex-wrap flex-grow">
					{res.keywords.map((t: any, idx: number) => {
						return (
							<Tag
								className=""
								key={idx}
								idx={idx}
								label={t}
								setSelectedKeywords={setSelectedKeywords}
							/>
						);
					})}
				</div>
				</>
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
