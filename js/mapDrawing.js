//map画面の描画部分はこのjsが担当する。

let mapArea = document.getElementById('mapArea');
mapArea.width = 1000;	//canvasの横幅
mapArea.height = 500;	//canvasの縦幅
mapArea.width = 1000;	//canvasの横幅
mapArea.height = 500;	//canvasの縦幅

//コンテキストを取得
var mapArea2D = mapArea.getContext('2d');


//キャラクターのImageオブジェクトを作る
var me = new Object();
me.front = new Image();
me.front.src = '../res/my_front.png';
me.right = new Image();
me.right.src = '../res/my_right.png';
me.left = new Image();
me.left.src = '../res/my_left.png';
me.back = new Image();
me.back.src = '../res/my_back.png';

me.x = 70;
me.y = 400;
me.move = 0;
me.direction = "front";

//キーボードのオブジェクトを作成
var key = new Object();
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = '';


//宝物のオブジェクト生成
var treasure = new Image();
treasure.src = '../res/treasure.png';

//もぐら(送ったメッセージ)のオブジェクト生成
var mogu = new Image();
mogu.src = '../res/mogumogu.png';
var rest = new Image();
rest.src = '../res/rest.png';



//花(読まれたメッセージ)のオブジェクト生成
var flower_red = new Image();
flower_red.src = '../res/red_flower.png';

var flower_orange = new Image();
flower_orange.src = '../res/orenge_flower.png';

var flower_pink = new Image();
flower_pink.src = '../res/pink_flower.png';

var flower_yellow = new Image();
flower_yellow.src = '../res/yellow_flower.png';



//背景画像のオブジェクトを作成
var scenery04 = new Image();
scenery04.src = '../res/scenery04.png';

//受け取ったメッセージの座標を格納するボックス
let receivedMesseagePoint = [];
//送ったメッセージの座標を格納するボックス
let sendMesseagePoint = [];
//読まれたメッセージの座標を格納するボックス
let readMesseagePoint = [];


//花の種類のENUM
let flower = {
    free: 1,
    request: 2,
    consultation: 3,
    sharing: 4,
};

//日時のENUM
let pressRelease = {
    yet: 1,
    done: 2,
};

hasMeeages();

scenery04.onload = function () {
    mapArea2D.drawImage(scenery04, 0, 0, mapArea.width, mapArea.height * mapArea.width / scenery04.width);
}

//☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
//描画用ループ関数
//☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
function loop() {
    // fillStyle = scenery04.onload;
    //mapArea2D.drawImage(scenery04, 0, 0, mapArea.width, mapArea.height * mapArea.width / scenery04.width);
    //mapArea2D.drawImage(scenery04, 10, 30, 100, 100);
    move(me);
    hasMeeages();
    mapArea2D.fillRect(0, 0, mapArea.width, mapArea.height);
    mapArea2D.drawImage(scenery04, 0, 0, mapArea.width, mapArea.height);
    //  自分あてにもらったメッセージを描画
    for (let i = 0; i < receivedMesseagePoint.length; i++) {
        mapArea2D.drawImage(treasure, receivedMesseagePoint[i][0], receivedMesseagePoint[i][1], 32, 32);
    }
    //送ったメッセージを描画
    for (let i = 0; i < sendMesseagePoint.length; i++) {
        if (sendMesseagePoint[i][2] === pressRelease.yet) {
            mapArea2D.drawImage(rest, sendMesseagePoint[i][0], sendMesseagePoint[i][1], 32, 32);
        }
        if (sendMesseagePoint[i][2] === pressRelease.done) {
            mapArea2D.drawImage(mogu, sendMesseagePoint[i][0], sendMesseagePoint[i][1], 32, 32);
        }

    }
    //読まれたメッセージを描画
    for (let i = 0; i < readMesseagePoint.length; i++) {
        if (readMesseagePoint[i][2] === flower.free) {
            mapArea2D.drawImage(flower_red, readMesseagePoint[i][0], readMesseagePoint[i][1], 32, 32);
        }
        if (readMesseagePoint[i][2] === flower.request) {
            mapArea2D.drawImage(flower_orange, readMesseagePoint[i][0], readMesseagePoint[i][1], 32, 32);
        }
        if (readMesseagePoint[i][2] === flower.consultation) {
            mapArea2D.drawImage(flower_pink, readMesseagePoint[i][0], readMesseagePoint[i][1], 32, 32);
        }
        if (readMesseagePoint[i][2] === flower.sharing) {
            mapArea2D.drawImage(flower_yellow, readMesseagePoint[i][0], readMesseagePoint[i][1], 32, 32);
        }

    }

    if (me.direction === "front") mapArea2D.drawImage(me.front, me.x, me.y, 32, 32);
    if (me.direction === "right") mapArea2D.drawImage(me.right, me.x, me.y, 32, 32);
    if (me.direction === "left") mapArea2D.drawImage(me.left, me.x, me.y, 32, 32);
    if (me.direction === "back") mapArea2D.drawImage(me.back, me.x, me.y, 32, 32);

    // console.log("X="+ me.x );
    // console.log("Y="+ me.y );
    requestAnimationFrame(loop);
}
addEventListener('load', loop(), false);
addEventListener("keydown", keydownfunc02, false);
addEventListener("keyup", keyupfunc02, false);


//メッセージがあるか判定
addEventListener('keydown', openMeeageBox);
function hasMeeages(e) {

    //現在時間を取得
    let day, month, year;
    let date = new Date();
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    let nowDate = String(year) + String(month) + String(day);

    //自分宛てにメッセージがあればそれを表示
    if (localStorage.getItem("messeages")) {
        const jsonData = localStorage.getItem("messeages");
        const jsonDataName = localStorage.getItem("selectedMumber");
        const data = JSON.parse(jsonData);

        receivedMesseagePoint.length = 0;
        sendMesseagePoint.length = 0;
        readMesseagePoint.length = 0;

        for (let i = 0; i < data.length; i++) {
            //自分宛てのメッセージがあれば（未読）
            if (jsonDataName === data[i].address && data[i].read === false) {
                if (Number(data[i].sendDate) <= Number(nowDate)) {
                    receivedMesseagePoint.push([data[i].X, data[i].Y]);
                }
            }

            // 自分が出したメッセージが未読状態なら
            if (jsonDataName === data[i].sender && data[i].read === false) {

                if (Number(data[i].sendDate) > Number(nowDate)) {
                    console.log("届ける日は" + Number(data[i].sendDate));
                    console.log("今日は" + Number(nowDate));

                    sendMesseagePoint.push([data[i].X, data[i].Y, pressRelease.yet]);
                } else {
                    sendMesseagePoint.push([data[i].X, data[i].Y, pressRelease.done]);
                }

            }
            // 自分が出したメッセージが既読になったら
            if (jsonDataName === data[i].sender && data[i].read === true) {
                if (data[i].type === "フリー") readMesseagePoint.push([data[i].X, data[i].Y, flower.free]);
                if (data[i].type === "依頼") readMesseagePoint.push([data[i].X, data[i].Y, flower.request]);
                if (data[i].type === "相談") readMesseagePoint.push([data[i].X, data[i].Y, flower.consultation]);
                if (data[i].type === "情報共有") readMesseagePoint.push([data[i].X, data[i].Y, flower.sharing]);
            }

        }
    }
}



//選択中のキャラを表示 →重複コード
function selectedMemberDisplay() {
    const Mumber = localStorage.getItem("selectMumber");
    const jsonData2 = localStorage.getItem("memo");
    const data = JSON.parse(jsonData2);
    $(".selectedMumer").append(data[Mumber]);

    return (data[Mumber]);
}


//パックマンがmoveが0より大きい場合は、4pxずつ移動を続ける
function move(Object) {
    if (Object.move === 0) {
        Object.move = 32;

    }
    if (Object.move > 0) {
        Object.move -= 4;
        if (key.push === 'left') {
            Object.x -= 4;
        }
        if (key.push === 'up') {
            Object.y -= 4;

        }
        if (key.push === 'right') {
            Object.x += 4;
        }
        if (key.push === 'down') {
            Object.y += 4;
        }
    }
    //mapArea2D.fillStyle = scenery04.onload;
    mapArea2D.fillStyle = "lightpink";
    mapArea2D.fillRect(0, 0, mapArea.width, mapArea.height);
}

//キーボードが押されたときに呼び出される関数
function keydownfunc02(event) {
    var key_code = event.keyCode;

    if (key_code === 37) {
        key.left = true;
        key.push = "left"
        me.direction = "left";

    }
    if (key_code === 38) {
        key.up = true;
        key.push = "up"
        me.direction = "back";
    }
    if (key_code === 39) {
        key.right = true;
        key.push = "right";
        me.direction = "right";
    }
    if (key_code === 40) {
        key.down = true;
        key.push = "down";
        me.direction = "front";
    }
    event.preventDefault();
}

//キーボードが放されたときに呼び出される関数
function keyupfunc02(event) {
    var key_code = event.keyCode;
    if (key_code === 37) {
        key.left = false;
        key.push = "";
    }
    if (key_code === 38) {
        key.up = false;
        key.push = "";
    }
    if (key_code === 39) {
        key.right = false;
        key.push = "";
    }
    if (key_code === 40) {
        key.down = false;
        key.push = "";
    }
}

//☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
//エンターキーを押したら
//☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
addEventListener('keydown', openMeeageBox);
function openMeeageBox(e) {
    if (e.keyCode === 13) {

        const jsonData = localStorage.getItem("messeages");

        const data = JSON.parse(jsonData);
        const i = hasMyMesseage();
        //メッセージがあったら
        if (hasMyMesseage() != -1) {
            //メッセージ表示用モーダルを表示
            messeageBox2.style.display = 'block';

            //メッセージ内容をHTMLに追加
            $(".receivedWhoContent").text(data[i].sender);
            $(".receivedTypeContent").text(data[i].type);
            $(".receivedContent").text(data[i].messeage);


            //メッセージの既読情報を未読から既読に更新
            data[i].read = true;
            const jsonData = JSON.stringify(data);
            localStorage.setItem("messeages", jsonData);


            //メッセージが無かったら
        } else {
            messeageBox.style.display = 'block';
            getFamilyList();

        }
    }

}


//家族一覧を取得して選択肢に追加
function getFamilyList(e) {
    var select = document.getElementById("messeageBoxWho");
    if ($('select#messeageBoxWho option')) {
        console.log("選択肢がすでにあるよ");
        $('select#messeageBoxWho option').remove();
    }

    if (localStorage.getItem("myfamily")) {
        const jsonData = localStorage.getItem("myfamily");
        const data = JSON.parse(jsonData);
        for (let i = 0; i < data.length; i++) {

            var option = document.createElement("option");
            option.text = data[i];
            option.value = data[i];
            // selectタグの子要素にoptionタグを追加する
            select.appendChild(option);
        }
    }
}


//自分宛てメッセージがあるかを調べる関数
//戻り値：自分宛てのメッセージ番号（ない場合は-1）
function hasMyMesseage(e) {

    //現在時間を取得
    let day, month, year;
    let date = new Date();
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    let nowDate = String(year) + String(month) + String(day);

    //メッセージが宛先関係無く1個もなければ
    if (!localStorage.getItem("messeages")) {
        return -1;
        //メッセージが1つでもあれば
    } else {
        const jsonData = localStorage.getItem("messeages");
        const data = JSON.parse(jsonData);
        const Mumber = localStorage.getItem("selectedMumber");

        //メッセージを検索
        for (let i = 0; i < data.length; i++) {
            //自分宛て　＆＆　未読　＆＆
            //メッセージボックスの座標とずれが少なければ
            if (Mumber === data[i].address &&
                Math.abs(data[i].X - me.x) <= 16 &&
                Math.abs(data[i].Y - me.y) <= 16 &&
                Number(data[i].sendDate) <= Number(nowDate) &&
                data[i].read === false) {
                return i;
            }
        }
        return -1;
    }
}




