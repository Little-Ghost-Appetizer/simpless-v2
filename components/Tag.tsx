import { Icon, InlineIcon } from "@iconify/react";
import { useState } from "react";

interface BadgeProps {
	label: string;
	className: string;
	idx: number;
	setSelectedKeywords: Function;
}

function Badge({ label, className, idx, setSelectedKeywords }: BadgeProps) {
	const [isSelected, setIsSelected] = useState(false);
	return (
		<div
			style={{ animationDelay: `${idx / 30}s` }}
			onClick={() => {
				setIsSelected(!isSelected);
				setSelectedKeywords((oldState: string[]) => {
					console.log(oldState, label, oldState.includes(label))
					if(oldState.includes(label)) return oldState.filter((v) => v !== label) 
					else return [...oldState, label] 
				});
			}}
			className={`opacity-0 rounded-3xl mr-2 bg-white inline-flex text-sm md:text-base font-semibold p-1 px-2 md:p-2 md:px-3 cursor-pointer 
			select-none animate-fade-in [animation-fill-mode:forwards] transition-colors ${className} ${
				isSelected
					? "bg-blue-700 hover:bg-blue-600 text-white"
					: "bg-white hover:bg-slate-300"
			}`}
		>
			{!isSelected ? (
				<InlineIcon
					icon="akar-icons:plus"
					height="16"
					className="text-xs self-center rounded-full mr-1"
				/>
			) : (
				<></>
			)}
			<span>{label}</span>
			{isSelected ? (
				<InlineIcon
					icon="akar-icons:cross"
					height="16"
					className="text-xs self-center rounded-full ml-1"
				/>
			) : (
				<></>
			)}
		</div>
	);
}

export default Badge;
