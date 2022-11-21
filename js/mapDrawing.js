//map画面の描画部分はこのjsが担当する。

let mapArea = document.getElementById('mapArea');
mapArea.width = 1000;	//canvasの横幅
mapArea.height = 500;	//canvasの縦幅

//コンテキストを取得
var mapArea2D = mapArea.getContext('2d');


//キャラクターのImageオブジェクトを作る
var goast = new Object();
goast.img = new Image();
goast.img.src = '../res/goast.png';
goast.x = 35;
goast.y = 100;
goast.move = 0;

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

//花(読まれたメッセージ)のオブジェクト生成
var flower = new Image();
flower.src = '../res/red_flower.png';

//背景画像のオブジェクトを作成
var scenery04 = new Image();
scenery04.src = '../res/scenery04.png';

//受け取ったメッセージの座標を格納するボックス
let receivedMesseagePoint = [];
//送ったメッセージの座標を格納するボックス
let sendMesseagePoint = [];
//読まれたメッセージの座標を格納するボックス
let readMesseagePoint = [];


hasMeeages();
scenery04.onload = function () {
    mapArea2D.drawImage(scenery04, 0, 0, mapArea.width, mapArea.height * mapArea.width / scenery04.width);
}

//描画用ループ関数

function loop() {


    move(goast);
    hasMeeages();
    mapArea2D.fillRect(0, 0, mapArea.width, mapArea.height);

    //  自分あてにもらったメッセージを描画
    for (let i = 0; i < receivedMesseagePoint.length; i++) {
        mapArea2D.drawImage(treasure, receivedMesseagePoint[i][0], receivedMesseagePoint[i][1], 32, 32);
    }
    //送ったメッセージを描画
    for (let i = 0; i < sendMesseagePoint.length; i++) {
        mapArea2D.drawImage(mogu, sendMesseagePoint[i][0], sendMesseagePoint[i][1], 32, 32);
    }
    //読まれたメッセージを描画
    for (let i = 0; i < readMesseagePoint.length; i++) {
        mapArea2D.drawImage(flower, readMesseagePoint[i][0], readMesseagePoint[i][1], 32, 32);
    }

    mapArea2D.drawImage(goast.img, goast.x, goast.y, 32, 32);

    // console.log("X="+ goast.x );
    // console.log("Y="+ goast.y );
    requestAnimationFrame(loop);
}
addEventListener('load', loop(), false);
addEventListener("keydown", keydownfunc02, false);
addEventListener("keyup", keyupfunc02, false);


//メッセージがあるか判定
addEventListener('keydown', openMeeageBox);
function hasMeeages(e) {
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
            if (jsonDataName === data[i].address && data[i].read===false) {
                receivedMesseagePoint.push([data[i].X, data[i].Y]);
            }
            if (jsonDataName === data[i].sender && data[i].read === false) {
                sendMesseagePoint.push([data[i].X, data[i].Y]);
            }

            if (jsonDataName === data[i].sender && data[i].read === true) {
                readMesseagePoint.push([data[i].X, data[i].Y]);
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
        if (key.push === 'left') Object.x -= 4;
        if (key.push === 'up') {
            Object.y -= 4;

        }
        if (key.push === 'right') Object.x += 4;
        if (key.push === 'down') Object.y += 4;

    }
    mapArea2D.fillStyle = "lightpink";
    mapArea2D.fillRect(0, 0, mapArea.width, mapArea.height);
}

//キーボードが押されたときに呼び出される関数
function keydownfunc02(event) {
    var key_code = event.keyCode;

    if (key_code === 37) {
        key.left = true;
        key.push = "left"
    }
    if (key_code === 38) {
        key.up = true;
        key.push = "up"
    }
    if (key_code === 39) {
        key.right = true;
        key.push = "right";
    }
    if (key_code === 40) {
        key.down = true;
        key.push = "down";
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
        const jsonDataName = localStorage.getItem("selectedMumber");
        const data = JSON.parse(jsonData);
        const Mumber = localStorage.getItem("selectMumber");
        const i = hasMyMesseage();
        //メッセージがあったら
        if (hasMyMesseage() != -1) {
            messeageBox2.style.display = 'block';
            //ここからやる
            $(".receivedWhoContent").text(data[i].sender);
            $(".receivedTypeContent").text(data[i].type);
            $(".receivedContent").text(data[i].messeage);
            
            
            //呼んだメッセージに更新
            data[i].read = true;
            const jsonData = JSON.stringify(data);
            localStorage.setItem("messeages", jsonData);



        } else {
            messeageBox.style.display = 'block';
            getFamilyList();

        }
    }

}


//家族一覧を取得して選択肢に追加
function getFamilyList(e) {
    var select = document.getElementById("messeageBoxWho");
    if($('select#messeageBoxWho option')){
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
function hasMyMesseage(e) {
    if (!localStorage.getItem("messeages")) {
        return -1;
    } else {
        const jsonData = localStorage.getItem("messeages");
        const data = JSON.parse(jsonData);
        const Mumber = localStorage.getItem("selectedMumber");

        //メッセージを検索
        for (let i = 0; i < data.length; i++) {
            console.log("★" + data.length);
            //自分宛てなら
            //メッセージボックスの座標とずれが少なければ
            if (Mumber === data[i].address &&
                Math.abs(data[i].X - goast.x) <= 16 &&
                Math.abs(data[i].Y - goast.y) <= 16 &&
                data[i].read === false) {
                console.log("★Step3");
                return i;
            }
        }

        return -1;
    }

}




