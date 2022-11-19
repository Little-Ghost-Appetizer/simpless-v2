import { Icon, InlineIcon } from "@iconify/react";
import { ChangeEvent, useEffect, useState } from "react";

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
		}, 2000);

		return () => {
			clearTimeout(timer);
		};
	}, [setKeyword, tweet]);

	return (
		<div className="w-auto h-auto">
			<textarea
				className="w-full h-full mb-4 p-4 h-1/2 border-gray-500 border outline-1"
				value={tweet}
				onChange={handleChange}
			/>
			<div className="flex items-center">
				<div className="ml-auto pr-3 border-r-slate-600 border-r-2">{`${tweet.length} / 280`}</div>
				<button className="bg-white hover:bg-slate-200 rounded-full w-8 h-8 mx-2">
					<InlineIcon icon="bx:copy" className="inline text-lg"/>
				</button>
				<button className="text-white bg-blue-700 hover:bg-blue-900 rounded-full p-2 px-6 font-semibold">
					SEARCH
				</button>
			</div>
		</div>
	);
}
