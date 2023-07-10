const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const ruleForJavaScript = {
	// ? test especifica los archivos que va a analisar el loader (en este caso todos los archivos .js)
	test: /\.js$/,
	loader: 'babel-loader',
	options: {
		// presets: ['@babel/preset-react'] Añade el preset con su configuracion por defecto
		// * Preset con configuracion personalisada
		presets: [
			[
				'@babel/preset-react',
				{
					// ? el valor por defecto de 'runtime' es 'classic' que indica que buscara la importacion 'React from "react"' en los archivos con sintaxis jsx
					// ? usando el valor 'automatic' no es necesario importar React para usar sintaxiis jsx
					runtime: 'automatic'
				}
			]
		]
	}
}

const ruleForStyles = {
	test: /\.css$/,
	// * para establecer mas de un loader se hace en un arreglo dentro del atributo 'use'
	use: [
		// ? style-loader reconoce las importaciones de estilos en los archivos js
		'style-loader',
		// ? css-loader carga las importaciones y los require dentro de los archivos css
		'css-loader'
	]
}

const rules = [ruleForJavaScript, ruleForStyles]

// ! Configuracion en tipo objeto
// module.exports = {
// 	// * El punto de entrada por defecto es '.src/index.js' y no hace falta ponerlo en la configuracion
// 	// entry: '.src/index.js'
// 	// * El output po0r defecto es una carpeta 'dist' que se crea en la raiz del proyecto
// 	output: {
// 		// * 'filename' indica el nombre del archivo principal de salida del build que por defecto es 'main.js' y no hace falta ponerlo
// 		// filename: 'main.js',
// 		// ? utilisamos la variable '__dirname' para saber la direccion en la que nos encontramos
// 		// ? Establecemos que el output sea la carpeta 'build' (en vez de 'dist')
// 		path: path.resolve(__dirname, 'build')
// 	},
// 	// * un plugin añade una funcionalidad a webpack
// 	plugins: [
// 		// ? html-webpack-plugin crea el index.html en la carpeta 'build' automaticamente a partir de un template especificado
// 		new HtmlWebpackPlugin({template: 'src/index.html'})
// 	],
// 	// * Configuracion de loaders
// 	module: { rules },
// 	// * Configuracion (opcional) del entorno de desarrollo
// 	devServer: {
// 		open: true, // ? abre automaticamente la app en el navegador
// 		port: 3000, // ? establece el puerto que usará el servidor
// 		// overlay: true, // ? Indica desde el navegador que existen errores en la aplicacion
// 		compress: true
// 	}
// }

// ! Configuracion en tipo funcion que devuelve un objeto
// * resive dos parametros 'env' y 'args'
module.exports = (env, argv) => {
	// * del parametro argv obtenemos el modo (el tipo de build: produccion o desarrollo)
	const { mode } = argv
	const isProduction = mode === 'production'
	return {
		output: {
			// * Establecemos un nombre diferente dependiendo el tipo de build
			filename: isProduction
			// ? Si es entorno de produccion le asignamos un hash
			// [name] por defecto 'main' [contenthash] añade un hash diferente dependiendo el contenido del archivo, es decir, un hash diferente por cada modificacion
			? '[name].[contenthash].js'
			: 'main.js',
			path: path.resolve(__dirname, 'build')
		},
		plugins: [
			new HtmlWebpackPlugin({template: 'src/index.html'})
		],
		module: { rules },
		devServer: {
			open: true,
			port: 3000,
			compress: true
		}
	}
}
