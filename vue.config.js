module.exports = {
    devServer: {
        proxy: {
            //开发环境
            '/api': {
                target: 'http://127.0.0.1:7001/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
    publicPath:'/',
    assetsDir:'static',
    productionSourceMap:false
};