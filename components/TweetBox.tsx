import { Icon } from "@iconify/react";
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
			<div className="flex">
				<div className="flex-1">{`${tweet.length} / 280`}</div>
				<button className="bg-slate-400 rounded-full p-2 hover:bg-slate-600">
					<Icon icon="akar-icons:copy" className="text-xl text-white" />
				</button>
			</div>
		</div>
	);
}
