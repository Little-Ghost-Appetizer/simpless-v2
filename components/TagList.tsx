import Tag from "./Tag";
import { scraper } from "./Fetcher";
import useSWR from "swr";
import { useEffect } from "react";
import Image from "next/image";
interface TagListProps {
	tweet?: string;
	setTweet: Function;
}

function TagList({
	tweet,
	setTweet,
}: TagListProps) {
	var isFetchFinished = false;
	const { data, mutate, error, isValidating } = useSWR(
		tweet ? url : null,
		(url) => scraper(url, isFetchFinished, tweet),
		{
			revalidateOnFocus: false,
			onSuccess: (data, key, config) => {
				let res = data as ResponseType;
				if(!res.finished){
					isFetchFinished = !res.finished
					mutate()
				}
			},
		}
	);
	const res = data as ResponseType;
	console.log(res)
	function handleClick(label: string) {
		if (tweet?.includes(label)) {
			setTweet(tweet.replace(" " + label, ""));
		} else {
			setTweet(tweet + " " + label);
		}
	}

	useEffect(() => {
		if (shouldSearch) mutate();
		setShouldSearch(false);
	}, [mutate, setShouldSearch, shouldSearch]);

	// useEffect(() => {
	// 	if(res) setSelectedKeywords(res.keywords)
	// }, [setSelectedKeywords, res]);

	return (
		<>
			{res?.finished && res.keywords ? (
				<>
					{/* Tags */}
					<div className="text-lg mb-2 mt-4 md:text-xl md:mb-4 text-white font-semibold">
						In this context, people are talking about...
					</div>
					<div className="space-y-3 md:space-y-4 flex-col flex-wrap mb-6">
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
					{/* Users */}
					<div className="text-lg mb-2 mt-4 md:text-xl md:mb-4 text-white font-semibold">
						These are people that talk about the context ...
					</div>
					<div className="flex flex-row space-x-2 mb-6">
						{res.users.map((u: any, idx: number) => {
							return (
								<div className="-z-[idx] w-fit m-0 " key={idx}>
									<a href={"https://twitter.com/" + u.user_account}>
										<Image
											className="rounded-full flex drop-shadow-lg	"
											src={u.profile_image_url}
											alt={u.user_account}
											width={36}
											height={36}
										/>
									</a>
								</div>
							);
						})}
					</div>
					{/* Posts */}
					<div className="text-lg mb-2 mt-4 md:text-xl md:mb-4 text-white font-semibold">
						Popular tweets that are related
					</div>
					<div className="flex flex-col">
						{res.posts.map((p: any, idx: number) => {
							return (
								<a key={idx} href={p.url}>
									<div className="flex flex-row items-center m-2 mb-4 p-2 px-4 rounded-lg bg-gray-50 shadow-md w-full">
										<Image
											className="rounded-full mr-3 h-8"
											src={p.profile_image_url}
											alt={p.user_account}
											width={32}
											height={32}
										/>
										<div className="flex flex-col">
											<span className="inline-flex items-center text-blue-300 font-medium"> {`@${p.user_account}`} </span>
											<span className="text-sm"> {p.content} </span>
										</div>
									</div>
								</a>
							);
						})}
					</div>
				</>
			): isValidating ? (
				<div className="flex flex-col mt-16">
					<span className="text-lg font-bold text-white text-center">
						Searching for keywords
					</span>
					<span className="text-md text-white text-center mb-2">
						this should take about 10-20 minutes
					</span>
					<div className="animate-spin inline-block w-8 h-8 border-4 rounded-full border-white border-t-blue-400 m-auto" />
				</div>
				
			):
			(
				<div className="flex flex-col mt-16">
					<span className="text-lg font-bold text-white text-center mb-2">
						Result not found! Try searching a new tweet
					</span>
				</div>
			)}
		</>
	);
}

export default TagList;
