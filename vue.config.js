module.exports = {
	publicPath: '/vue-admin/',
	assetsDir: 'static',
	productionSourceMap: false,
	devServer: {
		host: 'localhost',
		port: 3000,
		open: true,
		overlay: {
			warnings: false,
			errors: true
		},
		proxy: {
			'/admin': {
				target: 'http://localhost:8000',
				pathrewrite: {
					'^/admin': '/admin'
				}
			}
		}
  }
}