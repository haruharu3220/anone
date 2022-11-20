// ■classListの使い方まとめ→モーダルの実装で便利
// https://qiita.com/tomokichi_ruby/items/2460c5902d19b81cace5


//マップ領域の座標を管理
let mapAreaX = 0; //クリックしたX座標
let mapAreaY = 0; //クリックしたY座標
let positions = [];
let i = 0;


//受け取ったメッセージ数を表示する関数
receivedMessegaNumDisplay();
function receivedMessegaNumDisplay(){
    $(".remainingmMessage").text("あなたに届いた宝物は \" "+ receivedMessegaNum() +" \"個です");
}

//メッセージが来ているか調査する関数
function receivedMessegaNum() {
    let receivedMessegaNum = 0;
    console.log("メッセージが来ているか調査する関数");
    if (localStorage.getItem("messeages")) {
        const jsonData = localStorage.getItem("messeages");
        const data = JSON.parse(jsonData);
        for (let i = 0; i < data.length; i++) {
            if (data.address === selectedMember()) {
                receivedMessegaNum++;
            }
        }
    }
    return receivedMessegaNum;
}

//選択中のキャラを表示する関数
selectedMemberDisplay();
function selectedMemberDisplay() {
    $(".selectedMumer").text("あなたは　\"" + selectedMember() + "\"　です");
}

//選択中のキャラ名を取得する関数
function selectedMember() {
    const Mumber = localStorage.getItem("selectedMumber");
    return Mumber;
}



$(".btn-comment").on("click", function () {
    console.log("コメントボタン押したよ");

});


$(".btn-logout").on("click", function () {
    console.log("ログアウトボタン押したよ");
    location.href = "../html/login.html";
});

$(".btn-returnTop").on("click", function () {
    console.log("TOPに戻るボタン押したよ");
    location.href = "../index.html";
});

$(".btn-history").on("click", function () {
    console.log("履歴ボタン押したよ");
    location.href = "../html/history.html";
});


$("#btn-usage").on("click", function () {
    console.log("設定ボタン押したよ");
    location.href = "../html/usage.html";
});

//置くボタンクリック
$(".btn-outline-success").on("click", function () {
    console.log("置くをボタン押したよ");
    const messeage = {
        address: $("[name=who] option:selected").text(),          //誰宛
        sender: localStorage.getItem("selectedMumber"),//誰から
        sendDate: $("[name=when] option:selected").text(),       //いつ開封するか
        type: $("[name=type] option:selected").text(),           //タイプ
        X: goast.x,                              //X座標
        Y: goast.y,                              //Y座標
        messeage:$("#messeageContent").val(),                     //メッセージデバッグ用
        // messeage: "aaa",                      //メッセージデバッグ用
        read: false                             //メッセージが読まれたか
    }
    // console.log(messeage);

    data = [];
    if (localStorage.getItem("messeages")) {
        const jsonData = localStorage.getItem("messeages");
        const data = JSON.parse(jsonData);
        data[data.length] = messeage;

        const jsonData2 = JSON.stringify(data);
        localStorage.setItem("messeages", jsonData2);
    } else {
        data[0] = messeage;
        const jsonData2 = JSON.stringify(data);
        localStorage.setItem("messeages", jsonData2);
    }

    messeageBox.style.display = 'none';
});



//×アイコンボタンクリック
$(".fa-circle-xmark").on("click", function () {
    messeageBox.style.display = 'none';
    messeageBox2.style.display = 'none';
});





// 今は亡きボツコード集
// 使えるかもだから取っておく

// ①Areaをクリックしたとき座標を取得
// $("#mapArea").on("click", function (e) {
//     console.log("クリックしたよ");
//     // クリック位置の座標計算（canvasの左上を基準。-2ずつしているのはborderの分）

//     var rect = e.target.getBoundingClientRect();
//     makeMapAreaX = e.clientX - Math.floor(rect.left);
//     makeMapAreaY = e.clientY - Math.floor(rect.top);

//     console.log("X=" + makeMapAreaX);
//     console.log("Y=" + makeMapAreaY);

//     const position = {
//         X: makeMapAreaX,
//         Y: makeMapAreaY
//     }
//     positions[i] = position;
//     i++;
//     const jsonPositions = JSON.stringify(positions);
//     localStorage.setItem("positions", jsonPositions);

//     //デバッグ用
//     const jsonData = localStorage.getItem("positions");
//     const data = JSON.parse(jsonData);

//     //const XY = String(data[0].X)+String(data[0].Y);
//     //console.log(XY + "←XY連結した文字列だよ～");

//     // console.log(data[2].X + "←data[2].X読み取ったよ～");
// });