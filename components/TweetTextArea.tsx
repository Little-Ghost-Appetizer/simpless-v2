import { Icon, InlineIcon } from "@iconify/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import Toast from './Toast'
import usePrevious from './utils/usePrevious'
import { text } from "stream/consumers";

interface TweetTextAreaProps {
    tweet: string
    setTweet: Function
}

export default function TweetTextArea({
    tweet,
    setTweet,
}: TweetTextAreaProps){
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
		setTweet(e.target.value.substring(0, 280));
	}

	return (
        <>
            {
                // TODO: highlight text that match with selected tags 
            /* <div 
                style={{width: textAreaRef.current?.clientWidth, height: textAreaRef.current?.clientHeight}}
                className="absolute mb-4 p-2 pointer-events-none"
            >
            {
                tweetText.split('%').map( (s, idx) => (
                    <span key={idx}> {s} </span>
                ))
            }
            </div> */}
            <textarea
                ref={textAreaRef}
                className="w-full max-h-[80%] mb-4 p-2 border-slate-200 border-b-2 outline-0"
                value={tweet}
                onChange={handleChange}
                placeholder="Type tweet here ..."
            />
        </>
	);
}
