import Tag from "./Tag";
import { scraper } from "./Fetcher";
import useSWR from "swr";
import { useEffect } from "react";

interface TagListProps {
	tweet?: string;
	setTweet: Function;
	shouldSearch: boolean;
	setShouldSearch: Function;
}

interface ResponseType {
	keywords: string[];
}

const mockUrl = "https://6377ed020992902a2513e93a.mockapi.io/word";
const url = "http://127.0.0.1:5000"

function TagList({ tweet, setTweet, shouldSearch, setShouldSearch }: TagListProps) {
	const { data, mutate, error, isValidating } = useSWR(
		tweet ? mockUrl : null,
		(url) => scraper(url, tweet),
		{ revalidateOnFocus: false }
	);
	const res = data as ResponseType;

	function handleClick(label: string){
		if(tweet?.includes(label)){
			setTweet(tweet.replace(' ' + label, ''))
		}
		else{
			setTweet(tweet + ' ' + label)
		}
	}


	useEffect(() => {
		if(shouldSearch) mutate();
		setShouldSearch(false);
	}, [mutate, setShouldSearch, shouldSearch]);

	// useEffect(() => {
	// 	if(res) setSelectedKeywords(res.keywords)
	// }, [setSelectedKeywords, res]);

	return (
		<>
			{res?.keywords && !isValidating && !error ? (
				<>
				<div className="text-lg mb-2 mt-4 md:text-xl md:mb-4"> In this context, people are talking about... </div>
				<div className="space-y-3 md:space-y-4 flex-col flex-wrap flex-grow">
					{res.keywords.map((t: any, idx: number) => {
						return (
							<Tag
								className=""
								key={idx}
								idx={idx}
								label={t}
								onClick={handleClick}
								tweet={tweet}
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

export default TagList;
