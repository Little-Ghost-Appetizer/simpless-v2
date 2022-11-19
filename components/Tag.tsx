import { Icon, InlineIcon } from "@iconify/react";
import { useState } from "react";

interface BadgeProps {
	label: string;
	className: string;
	type: "keyword" | "hashtag";
	idx: number;
}

function Badge({ label, className, type, idx }: BadgeProps) {
	const [isSelected, setIsSelected] = useState(false);
	return (
		<div
			style={{ animationDelay: `${idx / 30}s` }}
			onClick={() => setIsSelected(!isSelected)}
			className={`opacity-0 rounded-3xl mr-2 bg-white inline-flex p-2 px-3 max-w-[8rem] cursor-pointer 
			select-none animate-fade-in [animation-fill-mode:forwards] transition-colors ${className} ${
				isSelected
					? "bg-blue-700 hover:bg-blue-600 text-white"
					: "bg-white hover:bg-slate-300"
			}`}
		>
			{isSelected ? 
				<InlineIcon
					icon="akar-icons:cross"
					className="text-xs self-center rounded-full mr-1"
				/> :
				<InlineIcon
					icon="akar-icons:plus"
					className="text-xs self-center rounded-full mr-1"
				/>
			}
			<span className={`truncate font-semibold `}>
				{type == "keyword" ? label : `#${label}`}
			</span>
		</div>
	);
}

export default Badge;
