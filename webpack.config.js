const mode = 'production'; // demo | production
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: mode,
  node: { fs: 'empty' },
  optimization: {
    minimize: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'builder.css',
      chunkFilename: 'builder.css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CopyPlugin(
      [
        { from: './src/iframe/'+mode, to: './iframe' },
        { from: './src/iframe/global/', to: './iframe/' },
        { from: './src/language/', to: './language/' },
        { from: './src/assets/image/', to: './image/' },
        { from: './src/assets/font/', to: './font/' },
        { from: './src/templates/default/', to: './templates/default/' },
      ]
    ),
  ],
  entry: ['./src/build_'+mode+'.js'],
  output: {
    filename: './builder.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'Builder'
  },
  module: {
    rules: [
      {
        test: /^((?!iframe).)*\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /font.*\.(eot|woff2|woff|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'font/[name].[ext]',
            },
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
          }
        ]
      },      
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: false,
            collapseWhitespace: false,
          }
        }],
      }      
    ]
  }
};
