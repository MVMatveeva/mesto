const path = require("path"); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require("html-webpack-plugin"); // подключите плагин
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин 

module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  devtool: "source-map",
  mode: 'development', // добавили режим разработчика
  devServer: {
    static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true, // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [
        {
            // регулярное выражение, которое ищет все js файлы
            test: /\.js$/,
            // при обработке этих файлов нужно использовать babel-loader
            use: 'babel-loader',
            // исключает папку node_modules, файлы в ней обрабатывать не нужно
            exclude: '/node_modules/'
          },
        {        
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
    },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // путь к файлу index.html
    }),
  ],
};
