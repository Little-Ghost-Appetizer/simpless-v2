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
				'fade-in': {
					"0%": { opacity: '0', transform: 'translateY(10%)'},
					"100%": { opacity: '1', transform: 'translateY(0%)'},
				},
				'fade-out': {
					"0%": { opacity: '1', transform: 'translateY(0%)'},
					"100%": { opacity: '0', transform: 'translateY(10%)'},
				},
			},
			animation: {
				'fade-in': "fade-in .5s ease-in",
				'fade-out': "fade-out .5s ease-in"
			},
		},
	},
	plugins: [],
	darkMode: "class",
};
