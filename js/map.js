// ■classListの使い方まとめ→モーダルの実装で便利
// https://qiita.com/tomokichi_ruby/items/2460c5902d19b81cace5


//マップ領域の座標を管理
let mapAreaX = 0; //クリックしたX座標
let mapAreaY = 0; //クリックしたY座標
let positions = [];
let i = 0;

function countRemainingmMessage(){
    

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




