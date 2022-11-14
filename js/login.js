$(".btn-login").on("click",function(){
    console.log("TOPに戻るボタン押したよ");
location.href="../html/map.html";
});


$(".btn-logout").on("click", function () {
    console.log("logoutボタン押したよ");
    location.href = "../html/settings.html";
  });
  