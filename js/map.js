// ■classListの使い方まとめ→モーダルの実装で便利
// https://qiita.com/tomokichi_ruby/items/2460c5902d19b81cace5


//マップ領域の座標を管理
let mapAreaX = 0; //クリックしたX座標
let mapAreaY = 0; //クリックしたY座標
let positions = [];
let i = 0;


//受け取ったメッセージ数を表示する関数　1秒ごとに更新
$(function () {
    setInterval(function () {
        console.log("繰り返しています。");
        $(".remainingmMessage").text("");
        $(".remainingmMessage").text("あなたに届いた宝物は \" " + receivedMessegaNum() + " \"個です");
    }, 1000);
});



//メッセージが来ているか調査する関数
function receivedMessegaNum() {
    let receivedMessegaNum = 0;
    let day, month, year;
    let date = new Date();
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    let nowDate = String(year) + String(month) + String(day);

    if (localStorage.getItem("messeages")) {
        const jsonData = localStorage.getItem("messeages");
        const data = JSON.parse(jsonData);
        for (let i = 0; i < data.length; i++) {
            if (data[i].address === selectedMember() &&
                data[i].read === false &&
                Number(data[i].sendDate) <= Number(nowDate)) {
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


//ログアウトボタンをクリック
$(".btn-returnTop").on("click", function () {
    console.log("TOPに戻るボタン押したよ");
    location.href = "../index.html";
});

//履歴ボタンをクリック
$(".btn-history").on("click", function () {
    console.log("履歴ボタン押したよ");
    location.href = "../html/history.html";
});

//使い方ページをクリック
$("#btn-usage").on("click", function () {
    console.log("設定ボタン押したよ");
    location.href = "../html/usage.html";
});

//置くボタンクリック
$(".btn-outline-success").on("click", function () {
    let day, month, year;
    let date = new Date($('#messeageBoxWhen').val());
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    let reservationDate = String(year) + String(month) + String(day);

    console.log("置くをボタン押したよ");
    //データを作成
    const messeage = {
        address: $("[name=who] option:selected").text(),//誰宛
        sender: localStorage.getItem("selectedMumber"), //誰から
        sendDate: reservationDate,                      //いつ開封するか
        type: $("[name=type] option:selected").text(),  //タイプ
        X: me.x,                                     //X座標
        Y: me.y,                                     //Y座標
        messeage: $("#messeageContent").val(),          //メッセージ
        read: false                                     //メッセージが既読か未読か
    }

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

//閉じるボタンクリック
$(".btn-outline-secondary").on("click", function () {
    messeageBox2.style.display = 'none';
});

