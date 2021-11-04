const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = () => {
  return {
    entry: './src/index.ts',
    target: 'node',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          enforce: 'pre',
          include: [path.resolve(__dirname, './src')],
          use: [{ loader: 'eslint-loader', options: { emitErrors: true } }],
        },
        // Loader for TypeScript files in ./src
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, './src'),
          exclude: [/node_modules/],
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(__dirname, './tsconfig.json'),
              },
            },
          ],
        },
        {
          test: /\.hbs$/i,
          loader: 'raw-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '#': path.resolve(__dirname, 'src'),
      },
    },
    optimization: {
      minimize: false,
      nodeEnv: false,
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: 'main.js',
    },
    plugins: [
      new Dotenv({ path: path.resolve(__dirname, './') }),
      new webpack.DefinePlugin({
        ENVIRONMENT: 'process.env',
      }),
    ],
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false, // if you don't put this is, __dirname
      __filename: false, // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
  };
};
