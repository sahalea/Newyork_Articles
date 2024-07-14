/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#efefef',
				secondary: '#f1f1f1',
				textColor: 'rgb(115 111 111)'
			}
		}
	},
	plugins: []
};
