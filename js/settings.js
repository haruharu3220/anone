// ■データがあるかどうかの判別式
// https://blog.capilano-fw.com/?p=5341#i-10
//
// ■2次元配列にPushはできない
//https://www.sejuku.net/blog/27965
//https://www.sejuku.net/blog/84475

// ■jQueryで後から追加した要素にイベントを設定させる方法
// https://qiita.com/yokke0059/items/13bd0d4f950557032169
// 
// ■指定した要素に、CSSクラスを追加する。
// http://semooh.jp/jquery/api/attributes/addClass/class/
// 
// ■ jQuery Sample Site　★★★
// http://semooh.jp/jquery/sample/
// 
// 




let member = [];
let i=0;
//家族を追加する
$(".btn-save").on("click", function () {
  console.log("保存に戻るボタン押したよ");
  //名前を下に表示
  // $('ul').append("<div class=\"member\" id = \"menber0\"><li>" + $(".inputMenberInput").val() +"</li></div>");
  $('ul').append("<div class=\"member\">テスト</div>");
  $(".member").css("color","red");
  $(".member").css("width","30vw");
  $(".member").css("height","5vh");
  $(".member").css("background-color","white");
  $(".member").css("margin","5px");
  
  const memberName = $(".inputMenberInput").val();
  member.push(memberName);
  console.log(member); //ここまでできている
  const jsonData = JSON.stringify(member);
  
   localStorage.setItem("memo", jsonData);
});


$("body").on("click",".member", function () {
  const test = $(this).attr('class');
  console.log("押したよtest|||"+ test );
 const selectMember = $("." + test).val();
 console.log("押したよtest2"+ selectMember );

  console.log("押したよ"+ $(this).attr('class') );
  console.log("押したよ"+ selectMember );
});





$(".btn-reset").on("click", function () {
  console.log("resetボタン押したよ");
  localStorage.clear()
  member.splice(0);
});

$(".btn-getter").on("click", function () {
  console.log("getterボタン押したよ");

});

$(".btn-returnTop").on("click", function () {
  console.log("TOPに戻るボタン押したよ");
  location.href = "../index.html";
});

$(".btn-login").on("click", function () {
  console.log("loginボタン押したよ");
  location.href = "../html/map.html";
});


const FORM = $("form"); // set form or other element here
const TYPES = ["input[type=text], input[type=submit]"]; // set which elements get targeted by the focus
const FOCUS = $(".focus"); // focus element

// function for positioning the div
function position(e) {
  // get position
  var props = {
    top: e.offset().top,
    left: e.offset().left,
    width: e.outerWidth(),
    height: e.outerHeight(),
    radius: parseInt(e.css("border-radius"))
  };

  // set position
  FOCUS.css({
    top: props.top,
    left: props.left,
    width: props.width,
    height: props.height,
    "border-radius": props.radius
  });

  FOCUS.fadeIn(200);
}

FORM.find(TYPES.join()).each(function (i) {
  // when clicking an input defined in TYPES
  $(this).focus(function () {
    el = $(this);

    // adapt size/position when resizing browser
    $(window).resize(function () {
      position(el);
    });

    position(el);
  });
});

FORM.on("focusout", function (e) {
  setTimeout(function () {
    if (!e.delegateTarget.contains(document.activeElement)) {
      FOCUS.fadeOut(200);
    }
  }, 0);
});



//Tips
//if (!localStorage.hasOwnProperty("mumberData")) {