import { Icon, InlineIcon } from "@iconify/react";
import { ChangeEvent, useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import Toast from './Toast'
import TweetTextArea from "./TweetTextArea";
interface TweetBoxProps {
	setTweet: Function;
	selectedKeywords: string[];
}

export default function TweetBox({
	setTweet,
	selectedKeywords,
}: TweetBoxProps) {
	const [tweetText, setTweetText] = useState("");
	const [autoSearch, setAutoSearch] = useState(true);
	const [showToast, setShowToast] = useState(false);

	useEffect(() => {
		let timer = setTimeout(() => {
			if (autoSearch) setTweet(tweetText);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [autoSearch, setTweet, tweetText]);


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
				<TweetTextArea tweetText={tweetText} setTweetText={setTweetText} selectedKeywords={selectedKeywords}/>

				{/* <div className="flex flex-row flex-wrap  text-xs text-blue-600">
					{selectedKeywords.length > 0 && (
						<>
							<div className="w-full font-medium"> Keyword(s) to be added </div>
							<div className="max-w-fit break-words">
								{selectedKeywords.join(", ")}
							</div>
						</>
					)}
				</div> */}
				<div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-1	">
					<ToggleSwitch setChecked={setAutoSearch} />
					<div className="ml-auto flex">
						<div className="text-sm md:text-base  pr-2 border-r-slate-600 border-r-2">{`${tweetText.length} / 280`}</div>
						<button
							className="bg-white hover:bg-slate-200 rounded-full w-6 h-6 mx-2"
							onClick={() => {
								navigator.clipboard.writeText(
									tweetText + "\n" + selectedKeywords.join(" ")
								)
								setShowToast(true);
							}}
						>
							<InlineIcon icon="bx:copy" className="inline text-lg" />
						</button>
						<Toast text={"Tweet copied to clipboard!"} shouldShow={showToast} setShouldShow={setShowToast}/>
					</div>
					<button onClick={() => setTweet(tweetText)} disabled={tweetText ? false: true} className="text-white bg-blue-700 hover:bg-blue-900 rounded-full p-2 px-4 font-semibold disabled:bg-[#858585]">
						SEARCH
					</button>
				</div>
			</div>
		</div>
	);
}
