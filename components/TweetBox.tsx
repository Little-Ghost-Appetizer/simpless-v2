import { Icon, InlineIcon } from "@iconify/react";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import Toast from "./Toast";
import TweetTextArea from "./TweetTextArea";
import useSWR, { Fetcher, mutate } from "swr";
import { simplessUrl } from "./Fetcher";
import { updatePartiallyEmittedExpression } from "typescript";
interface TweetBoxProps {
	tweet: string;
	setTweet: Function;
	setSearchResult: Function;
	setFetchStarted: Function;
}

export default function TweetBox({
	tweet,
	setTweet,
	setSearchResult,
	setFetchStarted,
}: TweetBoxProps) {
	const [showToast, setShowToast] = useState(false);
	const [autoSearch, setAutoSearch] = useState(false);

	const search = useCallback(async () => {
		console.log("SEARCH CALLED")
		setFetchStarted(true);
		setSearchResult({})
		const searchParams = new URLSearchParams({
			continue: 'false',
			search_keyword: tweet
		})
		try{
			const res = await fetch("api/searchTweet?" + searchParams);
			const res_json = await res.json();
			setSearchResult(res_json);
		}
		catch(err){
			setSearchResult({finished: false});
		}
	}, [setFetchStarted, setSearchResult, tweet]);

	useEffect(() => {
		let timer = setTimeout(() => {
			if (autoSearch) search();
		}, 2000);
		return () => clearTimeout(timer);
	}, [autoSearch, search]);

	return (
		<div className="flex flex-row shadow-md bg-white rounded-2xl m-4 p-4 md:w-1/2 md:p-6 lg:w-3/5 md:m-12 w-auto space-x-2">
			<Icon
				icon="ph:user-circle-light"
				width="48"
				className="flex text-blue-600"
			/>
			<div className="flex flex-col mt-3 flex-grow space-y-2">
				<div className="flex flex-row rounded-full p-0.5 pr-1 px-2 flex-shrink w-fit border border-blue-600 text-blue-600">
					<hr className="select-none w-16 m-auto border-t-blue-600 mx-1" />
					<InlineIcon icon="mdi:chevron-down" inline className="inline" />
				</div>
				<TweetTextArea tweet={tweet} setTweet={setTweet} />
				<div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-1	">
					<ToggleSwitch checked={autoSearch} setChecked={setAutoSearch} />
					<div className="ml-auto flex">
						<div className="text-sm md:text-base  pr-2 border-r-slate-600 border-r-2">{`${tweet.length} / 280`}</div>
						<button
							className="bg-white hover:bg-slate-200 rounded-full w-6 h-6 mx-2"
							onClick={() => {
								navigator.clipboard.writeText(tweet);
								setShowToast(true);
							}}
						>
							<InlineIcon icon="bx:copy" className="inline text-lg" />
						</button>
						<Toast
							text={"Tweet copied to clipboard!"}
							shouldShow={showToast}
							setShouldShow={setShowToast}
						/>
					</div>
					<button
						onClick={() => search()}
						disabled={tweet ? false : true}
						className="text-white bg-blue-700 hover:bg-blue-900 rounded-full p-2 px-4 font-semibold disabled:bg-[#858585]"
					>
						SEARCH
					</button>
				</div>
			</div>
		</div>
	);
}
