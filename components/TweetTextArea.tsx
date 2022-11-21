import { Icon, InlineIcon } from "@iconify/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import Toast from './Toast'
import usePrevious from './utils/usePrevious'
import { text } from "stream/consumers";

interface TweetTextAreaProps {
    tweetText: string
    setTweetText: Function
	selectedKeywords: string[]
}

export default function TweetTextArea({
    tweetText,
    setTweetText,
	selectedKeywords
}: TweetTextAreaProps){
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const prev = usePrevious({selectedKeywords})

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
		setTweetText(e.target.value.substring(0, 280));
	}

    useEffect(() => {
        var t = tweetText
        const removed = prev?.selectedKeywords.filter(x => !selectedKeywords.includes(x));
        const added = selectedKeywords.filter(x => !prev?.selectedKeywords.includes(x));

        removed?.forEach(keyword =>{
            t = t.replace(' ' + keyword, '')
        })
        added?.forEach(keyword => {
            t += ' ' + keyword
        })
        setTweetText(t.substring(0, 280))
        textAreaRef.current?.focus()
        // setTweetText(newValue);
    }, [selectedKeywords, setTweetText])

	return (
        <div>
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
                value={tweetText}
                onChange={handleChange}
                placeholder="Type tweet here ..."
            />
        </div>
	);
}
