import Head from "next/head";
import { useState } from "react";
import BadgeList from "../components/TagList";
import TweetBox from "../components/TweetBox";

export default function Home() {
	const [keyword, setKeyword] = useState("");
	return (
		<div className="h-screen bg-slate-400">
			<Head>
				<title>SimplesS</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex flex-col h-full xs:flex-row sm:flex-row">
				<div className="shadow-md bg-white rounded-2xl m-12 p-6 w-3/5 h-2/3 flex-col">
					<TweetBox setKeyword={setKeyword} />
				</div>
				<div className="bg-slate-200 flex-col flex-1 p-6">
					<h2 className="text-4xl m-4"> Tags / Keywords </h2>
					<BadgeList keyword={keyword} />
				</div>
			</main>
		</div>
	);
}
