const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
        { test: /\.txt$/, use: 'raw-loader' },
        {
            test: /\.(scss)$/,
            use: [{
              loader: 'style-loader', // inject CSS to page
            }, {
              loader: 'css-loader', // translates CSS into CommonJS modules
            }, {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            }, {
              loader: 'sass-loader' // compiles Sass to CSS
            }]
          },
          {
            test: /\.(sass|css)$/,
            use: ['style-loader', 'css-loader']
          }
    ],
  },
};
// const path = require('path');

// module.exports = {
//   output: {
//     filename: 'my-first-webpack.bundle.js',
//   },
//   module: {
//     rules: [{ test: /\.txt$/, use: 'raw-loader' }],
//   },
// };
// const path = require("path");

// const Html = require('html-webpack-plugin');

// module.exports = {
// entry: [
//     "whatwg-fetch",
//     "./js/index.js",
// ],
// output: { 
//     filename: "js/out.js",
//     path: path.resolve(__dirname, "build")
// },
// devServer: {
//     port: 3001,
// },
// module: {
//     rules: [

//     {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//         loader: "babel-loader",
//         }
//     },

//     {
//         test: /\.(sass|css|scss)$/,
//         use: [
//           'style-loader',
//           'css-loader',
//           {
//             loader: "postcss-loader",
//             options: {
//               plugins: () => [
//                 require("autoprefixer")()
//               ],
//             },
//           },
//           'sass-loader',
//         ]
//       },

//     {
//         test: /\.(jpg|jpeg|gif|png)$/,
//         use: {
//         loader: 'file-loader',
//         options: {
//             name: '[name].[ext]',
//             publicPath: 'images',
//             outputPath: 'images',
//         }
//         }
//     },

//     {
//         test: /\.(eot|ttf|woff|woff2)$/,
//         use: {
//         loader: 'file-loader',
//         options: {
//             name: '[name].[ext]',
//             publicPath: 'fonts',
//             outputPath: 'fonts',
//         }
//         }
//     },
//     ]
// },

// plugins: [
//     new Html({
//         filename: 'index.html',
//         template: './index.html',
//     })
// ]
// };