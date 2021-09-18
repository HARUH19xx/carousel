//環境に依存しないpathを通すため、pathモジュールを読み込む。
const path = require('path');
//MiniCssExtractPlugin、CleanWebpackPlugin。
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//entry, output, module, plugins, devServer, devtool, watchOptionsを入れておく。
module.exports = {
  //エントリポイント。
  entry: {
    main: './src/index.js'
  },  
  //出力先。filename、pathを用意する。pluginを使うのでpublicPathも用意しておく。"__dirname"はpathモジュールに用意されている、現在のディレクトリを表す定数。
  output: { 
    //ファイル名。
    filename: 'main.js',
    //ファイルまでのパス。
    path: path.resolve(__dirname, 'dist'),
    //pluginが参照するpath。空欄でいい。
    publicPath: '',
  },
  //webpack-dev-serverを追加したとき、この項目も入れておく。contentBase、open、watchContentBase、writeToDiskを用意する。
  devServer: {
    //ルートディレクトリの指定。
    contentBase: path.join(__dirname, ''),
    //サーバー起動時にブラウザを自動的に起動。
    open: true,
    // ルートディレクトリのファイルを監視（変更があると自動的にリロードされる）
    watchContentBase: true,
    //バンドルされたファイルを出力する（実際に書き出す）
    writeToDisk: true,
  }, 
  //各モジュールの設定。
  module: {
    //モジュールに適用するrulesを設定する。rulesはルールの配列。rulesの中には対象を指定するtestと適用するuseを用意し、useの中にはloaderとoptionsを用意する。
    rules: [
      {
        // 対象となるファイルの拡張子(scss)
        test: /\.scss$/,
        // Sassファイルの読み込みとコンパイル
        use: [
          // CSSファイルを抽出するように MiniCssExtractPlugin のローダーを指定
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // CSSをバンドルするためのローダー
          {
            loader: "css-loader",
            options: {
              // ソースマップを有効に
              sourceMap: true,
            },
          },
          // Sass を CSS へ変換するローダー
          {
            loader: "sass-loader",
            options: {
              // dart-sass を優先
              implementation: require('sass'),
              sassOptions: {
                // fibers を使う場合は以下でrequire('fibers')を指定
                fiber: require('fibers'),
              },
              // ソースマップを有効に
              sourceMap: true,
            },
          },
        ],
      },
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpe?g|svg|eot|wof|woff|ttf)$/i,
        use: [
          {
            //画像を出力フォルダーにコピーするローダー
            loader: 'file-loader',
            options: {
              // 画像ファイルの名前とパスの設定
              name: './images/[name].[ext]'
            }
          }
        ],
      },
    ],
  },
  //以上、rulesの設定。
  //プラグインの設定。それぞれのコンストラクタからインスタンスを作り、プロパティに値を渡す。
  plugins: [
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({
      // 抽出する CSS のファイル名
      filename: "style.css",
    }),
  ],
  //source-mapタイプのソースマップを出力。
  devtool: "source-map",
  // node_modules を監視（watch）対象から除外
  watchOptions: {
    ignored: /node_modules/  //正規表現で指定
  },
};