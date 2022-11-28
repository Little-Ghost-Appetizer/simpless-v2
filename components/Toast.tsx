import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

interface ToastProps {
	shouldShow: boolean;
	setShouldShow: Function;
	text: string;
}

function Toast({ shouldShow, setShouldShow, text }: ToastProps) {
	const [isShow, setIsShow] = useState(false);
    
	useEffect(() => {
		if(shouldShow) setIsShow(true);
	}, [shouldShow]);

    useEffect(() => {
        let timer = setTimeout(() => {
			setIsShow(false);
            setShouldShow(false);
		}, 2000);

		return () => {
			clearTimeout(timer);
		};
    }, [isShow, setShouldShow])

	return (
		<div
			id="toast"
			className={`${
				isShow ? "opacity-1 center" : "opacity-0"
			} transition-all absolute max-w-xs flex items-center p-4 w-1/2 left-1/3 -translate-x-1/2 bg-slate-300 rounded-lg drop-shadow-xl z-50`}
			role="alert"
		>
			<div className="ml-3 text-sm font-semibold"> {text} </div>
			<button
				type="button"
				className="ml-auto -mx-1.5 -my-1.5 bg-white hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
				aria-label="Close"
				onClick={() => {
					setIsShow(false);
					setShouldShow(false);
				}}
			>
				<Icon icon="akar-icons:cross" className="inline text-center m-auto"/>
			</button>
		</div>
	);
}

export default Toast;
