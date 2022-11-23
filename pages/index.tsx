import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import TagList from "../components/TagList";
import TweetBox from "../components/TweetBox";
import Image from "next/image"
import { SearchResult } from "../components/Fetcher";



export default function Home() {
	const [tweet, setTweet] = useState<string>("");
	const [searchResult, setSearchResult] = useState<SearchResult>();
	const [fetchStarted, setFetchStarted] = useState(false);

	return (
		<div className="h-screen bg-gradient-to-br from-sky-50 to-sky-200">
			<Head>
				<title>Simpless</title>
				<meta name="description" content="Simpless search twitter" />
				<link rel="icon" href="/simpless_feather.ico" />
			</Head>

			<main className="flex flex-col md:flex-row h-full">
				<TweetBox
					tweet={tweet}
					setTweet={setTweet}
					setSearchResult={setSearchResult}
					setFetchStarted={setFetchStarted}
				/>
				<div className="bg-gradient-to-br to-cyan-500 from-blue-300 bg-opacity-90 flex flex-col flex-1 p-6 lg:p-12 lg:py-6 overflow-y-scroll">
					{fetchStarted ? (
						 <TagList
							tweet={tweet}
							setTweet={setTweet}
							searchResult={searchResult}
							setSearchResult={setSearchResult}
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
