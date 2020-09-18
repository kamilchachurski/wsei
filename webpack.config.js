const path = require('path');
const merge = require('webpack-merge');

const Webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunksWebpackPlugin = require('extract-css-chunks-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpack = require('imagemin-webpack');

const common = {
    context: path.resolve(__dirname, 'source'),
    entry: 'index.jsx',
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'source')],
        extensions: ['.js', '.jsx']
    },
    output: {
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 2
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [require('autoprefixer')(), require('cssnano')()]
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }, {
                        loader: 'eslint-loader'
                    }
                ]
            }, {
                test: /\.(eot|(o|t)tf|woff2?)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        outputPath: 'fonts',
                        name: '[name].[contenthash].[ext]'
                    }
                }]
            }, {
                test: /\.(a?png|bmp|gif|ico|jpe?g|mp3|mp4|ogg|svg|tiff?|wav|webm|webp)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        outputPath: 'multimedia',
                        name: '[name].[contenthash].[ext]'
                    }
                }]
            }, {
                test: /\.pdf$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        outputPath: 'documents',
                        name: '[name].[contenthash].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new DotenvWebpack(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: 'static/favicon.ico',
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true
            }
        })
    ]
};

const development = merge({
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        useLocalIp: true,
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 8888,
        historyApiFallback: true,
        hot: true,
        open: true,
        overlay: true,
        compress: true,
        stats: 'errors-warnings',
        clientLogLevel: 'warn'
    },
    module: {
        rules: [{
            test: /\.s?css$/,
            use: 'style-loader'
        }]
    },
    plugins: [new Webpack.HotModuleReplacementPlugin()]
}, common);

const production = merge({
    mode: 'production',
    performance: {
        hints: false
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            maxInitialRequests: Infinity,
            maxAsyncRequests: Infinity
        }
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'scripts/[name].[contenthash].js',
        chunkFilename: 'scripts/[name].[contenthash].js'
    },
    module: {
        rules: [{
            test: /\.s?css$/,
            use: [{
                loader: ExtractCssChunksWebpackPlugin.loader,
                options: {
                    publicPath: '../'
                }
            }]
        }]
    },
    plugins: [
        new ExtractCssChunksWebpackPlugin({
            filename: 'styles/[name].[contenthash].css',
            chunkFilename: 'styles/[name].[contenthash].css'
        }),
        new CopyWebpackPlugin([{
            from: 'static',
            to: ''
        }]),
        new ImageminWebpack({
            imageminOptions: {
                plugins: [
                    ['mozjpeg', {
                        quality: 80
                    }],
                    ['pngquant', {
                        speed: 1,
                        strip: true,
                        quality: [0.8, 1]
                    }],
                    ['svgo', {}],
                    ['gifsicle', {
                        interlaced: true,
                        optimizationLevel: 3
                    }]
                ]
            }
        })
    ]
}, common);

module.exports =
    (process.env.NODE_ENV === 'development')
        ? (development)
        : (production);