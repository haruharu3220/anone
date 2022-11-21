// ■classListの使い方まとめ→モーダルの実装で便利
// https://qiita.com/tomokichi_ruby/items/2460c5902d19b81cace5


//マップ領域の座標を管理
let mapAreaX = 0; //クリックしたX座標
let mapAreaY = 0; //クリックしたY座標
let positions = [];
let i = 0;


//受け取ったメッセージ数を表示する関数
receivedMessegaNumDisplay();
function receivedMessegaNumDisplay() {
    $(".remainingmMessage").text("");
    $(".remainingmMessage").text("あなたに届いた宝物は \" " + receivedMessegaNum() + " \"個です");
}
//エンターキーを押したときにメッセージ数を更新する
addEventListener('keydown', receivedMessegaNumChange);
function receivedMessegaNumChange(e) {
    if (e.keyCode === 13) {
        receivedMessegaNumDisplay();
    }
}


//メッセージが来ているか調査する関数
function receivedMessegaNum() {
    let receivedMessegaNum = 0;
    if (localStorage.getItem("messeages")) {
        const jsonData = localStorage.getItem("messeages");
        const data = JSON.parse(jsonData);
        for (let i = 0; i < data.length; i++) {
            if (data[i].address === selectedMember() && data[i].read === false) {
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
    let reservationDate = String(year) + String(month) +String(day);
    console.log(year + "年");
    console.log(month + "月");
    console.log(day + "日");
    console.log(reservationDate + "日");


    console.log("置くをボタン押したよ");
    //データを作成
    const messeage = {
        address: $("[name=who] option:selected").text(),//誰宛
        sender: localStorage.getItem("selectedMumber"), //誰から
        sendDate: reservationDate,                      //いつ開封するか
        type: $("[name=type] option:selected").text(),  //タイプ
        X: goast.x,                                     //X座標
        Y: goast.y,                                     //Y座標
        messeage: $("#messeageContent").val(),          //メッセージ
        read: false                                     //メッセージが読まれたか
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

