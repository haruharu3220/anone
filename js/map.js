// ■classListの使い方まとめ→モーダルの実装で便利
// https://qiita.com/tomokichi_ruby/items/2460c5902d19b81cace5


//マップ領域の座標を管理
let mapAreaX = 0; //クリックしたX座標
let mapAreaY = 0; //クリックしたY座標
let positions = [];
let i = 0;

function countRemainingmMessage() {


}
selectedMemberDisplay();
//選択中のキャラを表示
function selectedMemberDisplay() {
    const Mumber = localStorage.getItem("selectMumber");
    const jsonData2 = localStorage.getItem("memo");
    const data = JSON.parse(jsonData2);
    $(".selectedMumer").append(data[Mumber]);

    return (data[Mumber]);
}


$("#mapArea").on("click", function (e) {
    console.log("クリックしたよ");
    // クリック位置の座標計算（canvasの左上を基準。-2ずつしているのはborderの分）

    var rect = e.target.getBoundingClientRect();
    makeMapAreaX = e.clientX - Math.floor(rect.left);
    makeMapAreaY = e.clientY - Math.floor(rect.top);

    console.log("X=" + makeMapAreaX);
    console.log("Y=" + makeMapAreaY);

    const position = {
        X: makeMapAreaX,
        Y: makeMapAreaY
    }
    positions[i] = position;
    i++;
    const jsonPositions = JSON.stringify(positions);
    localStorage.setItem("positions", jsonPositions);

    //デバッグ用
    const jsonData = localStorage.getItem("positions");
    const data = JSON.parse(jsonData);

    //const XY = String(data[0].X)+String(data[0].Y);
    //console.log(XY + "←XY連結した文字列だよ～");

    // console.log(data[2].X + "←data[2].X読み取ったよ～");
});



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


function popupImage() {
    var popup = document.getElementById('js-popup');
    console.log(popup);
    if (!popup) return;
    var blackBg = document.getElementById('js-black-bg');
    var closeBtn = document.getElementById('js-close-btn');
    var showBtn = document.getElementById('js-show-popup');

    console.log(blackBg);
    console.log(closeBtn);
    console.log(showBtn);



    closePopUp(blackBg);
    closePopUp(closeBtn);
    closePopUp(showBtn);
    function closePopUp(elem) {
        if (!elem) return;
        elem.addEventListener('click', function () {

            //https://qiita.com/tomokichi_ruby/items/2460c5902d19b81cace5
            popup.classList.toggle('is-show');
        });
    }
}
popupImage();



//置くボタンクリック
$(".commentDone").on("click", function () {
    console.log("置くをボタン押したよ");
    // console.log($("[name=who]").val());
    // console.log(("#messeageBoxWho").val());
    // console.log($("[name=when]").val());
    // console.log($("[type]").val());
    const messeage = {
        address: $("[name=who]").val(),          //誰宛
        sender: localStorage.getItem("selectMumber"),
        //sender:data[Mumber],                    //誰から
        sendDate: $("[name=when]").val(),       //いつ開封するか
        type: $("[name=type]").val(),                 //タイプ
        X: goast.x,                              //X座標
        Y: goast.y,                              //Y座標
        // messeage:("#messeageBoxWho").val(),                     //メッセージデバッグ用
        messeage: "aaa"                          //メッセージデバッグ用
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

//メッセージが来ているか調査する関数
putMessega();
function putMessega() {
    console.log("メッセージが来ているか調査する関数");
    const jsonData = localStorage.getItem("messeages");
    const data = JSON.parse(jsonData);
    // https://www.flatflag.nir87.com/select-2-1240#value-3
    console.log(data[2]);
    console.log(data[2].sender + "さんから届きました。");

    console.log(data[2].type + "です");
    console.log(data[2].messeage);
    for (let i = 0; i < data.length; i++) {
        // if(localStorage.getItem("selectMumber")=== data[i].address){

        // alert("メッセージが届いているよ");
        // alert(data[i].sender +"さんから届きました。");
        // alert(data[i].type +"です");
        // alert(data[i].messeage);
        // }
    }

}