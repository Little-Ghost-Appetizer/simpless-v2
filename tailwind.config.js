/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					"0%": { opacity: '0', transform: 'translateY(10%)'},
					"100%": { opacity: '1', transform: 'translateY(0%)'},
				},
			},
			animation: {
				'fade-in': "fadeIn .5s ease-in",
			},
		},
	},
	plugins: [],
	darkMode: "class",
};
