# PC Voice Command Host

## このアプリケーションについて

スマートフォン端末での音声入力を受けつけ、PC上で動作中のアプリケーションにテキスト入力します。テキスト入力されるアプリケーションは、入力時にフォーカスのあるアプリケーションです。

PC Voice Commandは、ハンズフリーでの連続音声入力が可能になるよう作られています。
スマートフォン側で音声入力を開始すると、停止ボタンを押すまでの間ずっと音声認識が続きます。スマートフォン側の操作なしに連続して音声入力可能です。

スマートフォンは充電状態で使うことを推奨します。充電状態であればスリープ状態にならないようになっています。

## スマートフォン端末用アプリ

### Android

以下からダウンロード可能です。

https://play.google.com/store/apps/details?id=com.github.kanata3249.voice_control_app

## 設定方法

メインウィンドウ右上ある歯車アイコンを押すと、設定画面が開きます。

ネットワーク設定の設定値は特に設定変更する必要はありません。
この画面に表示されているQRコードをスマートフォン側で読み取ると、スマートフォン側の設定が楽になります。

設定完了したか確認するには、スマートフォン側で音声入力やキーボード入力してみます。
入力したテキストがこのアプリケーションのメインウィンドウに表示されていれば、設定成功しています。

## テキスト置換

音声入力したテキストをアプリケーションに渡す前に加工することが可能です。

スマートフォン端末側での音声認識の際、固有名詞などが認識されず、別の言葉になってしまうことがあります。テキスト置換設定により、固有名詞に置換することができます。

> 例)  「令和元年」  音声認識: 明和元年 → 置換設定: 令和元年<br/>
     (しばらくすれば音声認識結果が変わると思います。

ほかの用途としては、ENTERキーや記号の入力があります。これらは音声入力するのが難しいため、
別の言葉で入力できるようにします。

> 例) 「ENTERキー」  音声認識: 決定 → 置換設定: \n

設定は設定ウィンドウの「置換」タブから行えます。スマートフォンから受信したテキストが
入力テキストにマッチすると、置換後テキストに変換されます。

なお、入力テキストには正規表現(javascript仕様)が使用可能です。正規表現にマッチした文字列を
置換後テキストで再利用することもできます。

> 例) 入力テキスト: 「(こんにちは|こんばんは)$」  置換後テキスト 「$1～」<br/>
       行末の「こんにちは」「こんばんは」を、「こんにちは～」「こんばんは～」に置換します。<br/>
> 例) 入力テキスト: 「^PT」  置換後テキスト 「/p 」<br/>
       行頭のPTという言葉を「/p 」に置換します。PTより後ろの部分はそのまま使われます。

## ボタン設定

スマートフォン側の画面にボタンを表示し、そのボタンが押されたらテキストを送信するよう設定することができます。ハンズフリー状態でないタイミングで入力したいようなテキストであれば、ボタンに登録しておくことで簡単に入力できます。

ボタンはグループに分けて表示することができます。グループ毎にタブで分けて表示します。

設定は設定ウィンドウの「ボタン」タブから可能です。

ボタンを追加するには「＋」ボタンをクリックしてください。空のボタンが追加されます。

各ボタンはタブ/ラベル/テキストで構成されています。
タブにはそのボタンを表示するグループ名を設定します。
ラベルにはそのボタンに表示される文字列を設定します。
テキストにはボタン押下時に入力したい文字列を設定します。

## 設定切り替え

PC側のテキスト入力先アプリケーションによって、置換設定やボタン設定を切り替えたい場合があるかもしれません。その場合には設定切り替え機能が使用できます。

各画面上に「default」と書かれた箇所があります。これで設定切り替えが可能になっています。初期設定では設定が1種類しかありませんので、切り替えることができません。

設定を追加するには、置換設定画面もしくはボタン設定画面で、「default」と書かれた部分をクリックし、追加したい設定の名称を入力してください。名称を入力すると新規作成ボタンが表示されるのでクリックします。

音声入力時に使用される設定は、メインウィンドウで選ばれている設定です。自動切り替え機能はありません。

ボタンや置換設定は、それぞれの画面の「default」部分をクリックして設定対象を変更できます。


## 参考情報

設定ファイルは以下にあります。

> C:\Users\ユーザ名\AppData\Roaming\PCVoiceCommand\storage
