import { Icon } from "@iconify/react";
import { useState } from "react";

interface BadgeProps {
	label: string;
	className: string;
	type: "keyword" | "hashtag";
}

function Badge({ label, className, type }: BadgeProps) {
	const [isSelected, setIsSelected] = useState(false);

	return (
		<div
			onClick={() => setIsSelected(!isSelected)}
			className={`rounded-3xl mr-2 bg-white inline-flex p-2 px-3 max-w-[8rem] ${
				isSelected ? "bg-blue-700 text-white" : "bg-white"
			}`}
		>
			{isSelected && (
				<Icon
					icon="akar-icons:cross"
					className="text-sm inline self-center rounded-full mr-1"
				/>
			)}
			<span className={`truncate font-semibold`}>
				{type == "keyword" ? label : `#${label}`}
			</span>
			{!isSelected && (
				<Icon
					icon="akar-icons:plus"
					className="text-sm inline self-center rounded-full ml-1"
				/>
			)}
		</div>
	);
}

export default Badge;
