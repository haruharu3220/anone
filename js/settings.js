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
let i = 0;
//家族を追加する
$(".btn-save").on("click", function () {
  console.log("保存に戻るボタン押したよ");
  //名前を下に表示
  // $('ul').append("<div class=\"member\" id = \"menber0\"><li>" + $(".inputMenberInput").val() +"</li></div>");
  $('ul').append("<div class=\"member\">テスト</div>");
  $(".member").css("color", "red");
  $(".member").css("width", "30vw");
  $(".member").css("height", "5vh");
  $(".member").css("background-color", "white");
  $(".member").css("margin", "5px");

  const memberName = $(".inputMenberInput").val();
  member.push(memberName);
  console.log(member); //ここまでできている
  const jsonData = JSON.stringify(member);

  localStorage.setItem("memo", jsonData);
});


$("body").on("click", ".member", function () {
  const test = $(this).attr('class');
  console.log("押したよtest|||" + test);
  const selectMember = $("." + test).val();
  console.log("押したよtest2" + selectMember);

  console.log("押したよ" + $(this).attr('class'));
  console.log("押したよ" + selectMember);
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


$(".btn-login").on("click", function () {
  console.log("loginボタン押したよ");
  const text = $("[name=ueserName] option:selected").text();
  localStorage.setItem("selectedMumber", text);
  location.href = "../html/map.html";
});




//プラスボタンクリック
$(".fa-square-plus").on("click", function () {
  console.log("家族追加ボタン押したよ");

  const ul2 = document.getElementById("characterList");

  //const div = document.createElement("div");
  const li = document.createElement("li");
  const text = document.createTextNode($(".inputMenberInput").val());
  	
  li.appendChild(text);


  console.log(li);


  ul2.appendChild(li);

  // div.appendChild(li2);
  // div.appendChild(li3);

  // li.appendChild(text);

  $("#characterList").append(ul2);


  //ナビバーのliタグも数えているから5からスタートになる
  //そのためiを-4にしておく
  var i = -4;
  $('li').each(function () {
    $(this).addClass('style-li');
    $(this).addClass('style-li' + i);
    i++;
  })

  $('#style-li5').append("<i class=\"fa-regular fa-pen-to-square fa-xl\"></i>");
  $('#style-li5').append("<i class=\"fa-regular fa-circle-xmark fa-xl\"></i>");

  //追加後、入力フォーム初期化
  $(".inputMenberInput").val("");



  // //下に名前を表示
  // $('ul').append("<li>" + $("[name=ueserName] option:selected").text() + "</li>");

  // https://www.webopixel.net/javascript/216.html

  // $('li').each(function () {
  //   $(this).addClass('style-li');
  // })



  // ボツになったアイコンたち
  // $('ul').append("<li><div><i class=\"fa-regular fa-pen-to-square fa-xl\"></i></div></li>");
  // $('ul').append("<li><div><i class=\"fa-regular fa-circle-xmark fa-xl\"></i></div></li>");

  // https://iwb.jp/jquery-append-dom-nest/
  // $('ul').append("<div/>")
  //       .append($(".inputMenberInput").val() + "<li>")
  //       .append("<li><i class=\"fa-regular fa-pen-to-square fa-xl\"></i>")
  //       .append("<li><i class=\"fa-regular fa-circle-xmark fa-xl\"></i>");

  //ローカルストレージに名前を追加

  let mumber = [];

  if (localStorage.getItem("memo")) {
    const jsonData = localStorage.getItem("memo");
    const data = JSON.parse(jsonData);
    data.push($(".inputMenberInput").val());
    const jsonData2 = JSON.stringify(data);
    localStorage.setItem("memo", jsonData2);
  } else {
    const memberName = $(".inputMenberInput").val();
    mumber.push(memberName);
    const jsonData2 = JSON.stringify(mumber);
    localStorage.setItem("memo", jsonData2);
  }
});


//キャラ選択ボタン→各キャラ分作成必要あり
$("body").on("click", ".style-li", function () {

  // console.log("押したよtest|||" + $(".style-li1").text());
  // const jsonData = localStorage.getItem("memo");
  // const data = JSON.parse(jsonData);
  // console.log(data);
  // console.log(data.length);
  // for (let i = 0; i < data.length; i++) {
  //   // console.log("ここ");
  //   if (data[i] === $(".style-li1").text()) {
  //     localStorage.setItem("selectMumber", i);

  //   }
  // }
  //ログインモーダル表示
  $(".selectedMumer").append($(this).text());
  
  
  loginModal.style.display = 'block';
//  $(".selectedMumer").append($("[name=ueserName] option:selected").text());



});
