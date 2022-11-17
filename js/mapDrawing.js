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

//背景画像のオブジェクトを作成
var scenery04 = new Image();
scenery04.src = '../res/scenery04.png';

//受け取ったメッセージの座標を格納するボックス
let receivedMesseagePoint = [];
hasMeeages();
scenery04.onload = function () {
    mapArea2D.drawImage(scenery04, 0, 0, mapArea.width, mapArea.height * mapArea.width / scenery04.width);
}

function loop() {

    //console.log("無限ループ開始");
    move(goast);
    // mapArea2D.drawImage(scenery04,0, 0, 2048, 1364);
    hasMeeages();
    mapArea2D.drawImage(goast.img, goast.x, goast.y, 32, 32);
    for (let i = 0; i < receivedMesseagePoint.length; i++) {
        mapArea2D.drawImage(treasure, receivedMesseagePoint[i][0], receivedMesseagePoint[i][1], 32, 32);
    }
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
        for (let i = 0; i < data.length; i++) {
            if (jsonDataName === data[i].address) {
                receivedMesseagePoint.push([data[i].X, data[i].Y]);
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

//エンターキー
addEventListener('keydown', openMeeageBox);
function openMeeageBox(e) {
    if (e.keyCode === 13) {
        //メッセージがある
        if (localStorage.getItem("messeages")) {
            console.log("★");

            const jsonData = localStorage.getItem("messeages");
            const jsonDataName = localStorage.getItem("selectedMumber");
            const data = JSON.parse(jsonData);
            const Mumber = localStorage.getItem("selectMumber");

            //メッセージを検索
            for (let i = 0; i < data.length; i++) {
                console.log("★" + data.length);
                //メッセージボックスの座標とずれが少なければ
                if (Math.abs(data[i].X - goast.x) <= 16 && Math.abs(data[i].Y - goast.y) <= 16) {
                    console.log("★Step2");
                    console.log(Mumber);

                    //自分宛てなら
                    if (jsonDataName === data[i].address) {
                        console.log("★Step3");
                        alert("誰からのメッセージ？→" + data[i].sender);
                        alert("タイプは？→" + data[i].type);
                        alert("内容は？→" + data[i].messeage);
                        return;
                    }
                }

            }
            //メッセージはあるけど自分宛てではないまたは座標が違う
            console.log("goast.x =" + goast.x + "goast.y" + goast.y);
            $(".messeageBox").css("display", "block");

        } else {
            //そもそもメッセージがない
            console.log("goast.x =" + goast.x + "goast.y" + goast.y);
            $(".messeageBox").css("display", "block");
        }
    }
}