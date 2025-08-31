import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintPluginImport from 'eslint-plugin-import'

export default [
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'module',
			globals: {
				...globals.node,
				...globals.es2021,
				...globals.jest,
			},
		},
		plugins: {
			import: eslintPluginImport,
		},
		rules: {
			// JavaScript rules
			...pluginJs.configs.recommended.rules,
		},
		settings: {
			'import/resolver': {
				node: {
					extensions: ['.js'],
				},
			},
		},
	},
	{
		// Ignoring node_modules
		ignores: [
			'node_modules/',
			'dist/',
			'build/',
			'.env',
			'.env.*',
			'!/.env.example',
			'coverage/',
			'*.log',
		],
	},
]
