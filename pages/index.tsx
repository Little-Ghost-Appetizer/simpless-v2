import Head from "next/head";
import { useEffect, useState } from "react";
import TagList from "../components/TagList";
import TweetBox from "../components/TweetBox";
import Image from "next/image"

export default function Home() {
	const [shouldSearch, setShouldSearch] = useState(false);
	const [tweet, setTweet] = useState<string>("");
	const [autoSearch, setAutoSearch] = useState(false);

	useEffect(() =>{
		let timer = setTimeout(() => {
			if (autoSearch) setShouldSearch(true);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [autoSearch, tweet])

	return (
		<div className="h-screen bg-gradient-to-br from-sky-50 to-sky-200">
			<Head>
				<title>Simpless</title>
				<meta name="description" content="Simpless search twitter" />
				<link rel="icon" href="/simpless_feather.ico" />
			</Head>

			<main className="flex flex-col md:flex-row h-full">
				<TweetBox
					autoSearch={autoSearch}
					setAutoSearch={setAutoSearch}
					setShouldSearch={setShouldSearch}
					tweet={tweet}
					setTweet={setTweet}
				/>
				<div className="bg-gradient-to-br to-cyan-500 from-blue-300 bg-opacity-90 flex flex-col flex-1 p-6 lg:p-12 lg:py-6 overflow-y-scroll">
					{tweet ? (
						<TagList
							shouldSearch={shouldSearch}
							setShouldSearch={setShouldSearch}
							tweet={tweet}
							setTweet={setTweet} 
						/>
					) : (
						<div className="pt-8 text-white">
							<h1 className="text-6xl mb-4 font-semibold text-white"> SIMPLESS </h1>
							<p className="text-lg mb-16">
								Come up with the right hashtags to market your products.
							</p>
						</div>
					)}
				</div>
				<div className="absolute left-2 bottom-2 text-xs">
					© 2022 All rights reserved
				</div>
			</main>
		</div>
	);
}
