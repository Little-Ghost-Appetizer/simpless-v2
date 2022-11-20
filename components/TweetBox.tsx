import { Icon, InlineIcon } from "@iconify/react";
import { ChangeEvent, useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

interface TweetBoxProps {
	setKeyword: Function;
}

export default function TweetBox({ setKeyword }: TweetBoxProps) {
	const [tweet, setTweet] = useState("");

	function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
		setTweet(e.target.value.substring(0, 280));
	}

	useEffect(() => {
		let timer = setTimeout(() => {
			setKeyword(tweet);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [setKeyword, tweet]);

	return (
		<div className="shadow-md bg-white rounded-2xl m-4 p-4 md:w-1/2 md:p-6 lg:w-3/5 md:m-12 w-auto">
			<textarea
				className="w-full max-h-[80%] mb-4 p-4 border-slate-200 border-b-2 outline-0"
				value={tweet}
				onChange={handleChange}
				placeholder="Type tweet here ..."
			/>
			<div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-1">
				<ToggleSwitch/>
				<div className="ml-auto flex">
					<div className="text-sm md:text-base  pr-2 border-r-slate-600 border-r-2">{`${tweet.length} / 280`}</div>
					<button className="bg-white hover:bg-slate-200 rounded-full w-6 h-6 mx-2" onClick={() => navigator.clipboard.writeText(tweet)}>
						<InlineIcon icon="bx:copy" className="inline text-lg"/>
					</button>
				</div>
				<button className="text-white bg-blue-700 hover:bg-blue-900 rounded-full p-2 px-4 font-semibold">
					SEARCH
				</button>
			</div>
		</div>
	);
}
