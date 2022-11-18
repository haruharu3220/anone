$(".btn-returnMap").on("click", function () {
    console.log("マップに戻る押したよ");
    location.href = "../html/map.html";
});

$(".btn-returnTop").on("click", function () {
    console.log("TOPに戻るボタン押したよ");
    location.href = "../index.html";
});

$("#btn-usage").on("click",function(){
    console.log("使い方へ押したよ");
location.href="../html/usage.html";
});