/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						'.prose strong': {
							color: theme('colors.secondary.DEFAULT'),
						},
						'.prose a': {
							color: theme('colors.secondary.DEFAULT'),
							'text-decoration': 'underline',
						},
						'.prose a:hover': {
							color: theme('colors.secondary.600'),
							'text-decoration': 'none',
						},
						'.prose h1, .prose h2, .prose h3, .prose h4, .prose h5': {
							color: theme('colors.secondary.DEFAULT'),
						},
					}
				}
			}),
			colors: {
				muted: {
					'50': '#f5f6f6',
					'100': '#e4e6e9',
					'200': '#ccd1d5',
					'300': '#a9b1b7',
					'400': '#7e8892',
					'500': '#636c77',
					'600': '#555b66',
					'700': '#354154',
					'800': '#20293a',
					'900': '#393b40',
					'950': '#232529',
				},
				ebony: {
					DEFAULT: '#10172A',
					50: '#C2CCE8',
					100: '#B3C0E2',
					200: '#95A7D7',
					300: '#788ECB',
					400: '#5A76C0',
					500: '#4360AF',
					600: '#375091',
					700: '#2C3F74',
					800: '#20293a',
					900: '#10172A',
					950: '#111729'
				},
				primary: {
					DEFAULT: '#D8BE76',
					50: '#FFFFFF',
					100: '#FEFEFD',
					200: '#FAF7ED',
					300: '#F5EFDD',
					400: '#F1E7CD',
					500: '#ECE0BD',
					600: '#E8D8AE',
					700: '#E3D19E',
					800: '#DFC98E',
					900: '#DAC27E',
					950: '#D8BE76'
				},
				secondary: {
					DEFAULT: '#E84361',
					50: '#FFFFFF',
					100: '#FBDDE3',
					200: '#F9CBD4',
					300: '#F6B9C4',
					400: '#F4A7B5',
					500: '#F295A6',
					600: '#F08396',
					700: '#EE7087',
					800: '#EB5E78',
					900: '#E94C69',
					950: '#E84361'
				},
			},
			textShadow: {
				sm: "0 1px 2px var(--tw-shadow-color)",
				DEFAULT: "0 2px 4px var(--tw-shadow-color)",
				lg: "0 8px 16px var(--tw-shadow-color)",
			},
			fontFamily: {
				'body': [
					'Inter',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'system-ui',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'Noto Sans',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					'Noto Color Emoji'
				],
				'sans': [
					'Inter',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'system-ui',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'Noto Sans',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					'Noto Color Emoji'
				]
			},
		},
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					"text-shadow": (value) => ({
						textShadow: value,
					}),
				},
				{ values: theme("textShadow") }
			)
		}),
		require('flowbite/plugin'),
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/typography"),
	],
}
