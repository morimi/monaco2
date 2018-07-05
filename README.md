# monaco2

> Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).


## url structure

```
### post_type post
/game/onmyoji-game/ - アプリ別 single post
/game/onmyoji-game/tweet
/game/onmyoji-game/official
/game/onmyoji-game/rss
/game/onmyoji-game/video
/game/onmyoji-game/review
/game/onmyoji-game/goods
/game/onmyoji-game/download

### category
/category/game(app)/ - category archive
/category/game/rpg/ - child category archive

### taxonomy
/publisher/netease/ - カスタム分類publisher限定
/selection/boys-rpg-game/ - カスタム分類selection限定
/tag/和風rpg/ - タグ限定

### custom post_type news(article)　ニュース・記事
/news(article)/ - archive
/news/2018/ - 2018 news archive
/news/2018/05/ - 2018/5 news archive
/news/onmyoji-game/2018/05/12/123456/ - 2018/05/12 onmyoji-game news archive

### custom post_type word　トレンドワード
/word/ - archive
/word/1234/ - ID 1234の単語ページ

#### クエリ
?post_type=post - post_type
?appname=onmyoji-game - アプリ名
?publisher=netease - パブリッシャー
/page/2/ - 2ページ目

### ランキング
/ranking/
/ranking/free-all/
/ranking/paid-all/
/ranking/grossing-game/
/ranking/free-game/
/ranking/paid-game/

### search
/search/ - 検索結果

### 固定ページ
/about/ - AppsMateについて
/company/ - 運営会社
/terms/ - ご利用に当たって
/privacy/ - プライバシーポリシー
/contact/ - お問い合わせ
```

## data structure

```
+ category
  +- entries
    +- entry.app

+ news
  +- entries
    +- entry.news

+ article
  +- entries
    +- entry.article

+ search
  +- entries
    +- entry

+ word
  +- entries
    +- entry.word
```
