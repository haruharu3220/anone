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


//デバッグ用ボタン→ローカルストレージの中身を消去
$(".btn-reset").on("click", function () {
  console.log("resetボタン押したよ");

  if (localStorage.getItem("myfamily")) {
    const jsonData = localStorage.getItem("myfamily");
    const data = JSON.parse(jsonData);
    for (let i = 0; i < data.length; i++) {
      $("#style-li" + i).remove();
    }
  }

  localStorage.clear()
  member.splice(0);
});


//TOPに戻るボタン
$("#btn-top").on("click", function () {
  console.log("TOPに戻るボタン押したよ");
  location.href = "../index.html";
});


//ログイン画面
$(".btn-outline-success").on("click", function () {
  console.log("loginボタン押したよ");
  location.href = "../html/map.html";
});

checkFamily();
function checkFamily() {
  if (localStorage.getItem("myfamily")) {
    const jsonData = localStorage.getItem("myfamily");
    const data = JSON.parse(jsonData);
    for (let i = 0; i < data.length; i++) {
      const ul = document.getElementById("characterList");
      const li = document.createElement("li");
      const text = document.createTextNode(data[i]);
      li.appendChild(text);
      ul.appendChild(li);
      $("#characterList").append(ul);
      $("#characterList").css("text-align", "center");

      var familyIndex = -2;
      $('li').each(function () {
        if (familyIndex >= 0) {
          $(this).addClass('style-li');
          $(this).addClass('style-li' + familyIndex);
        }
        familyIndex++;
      })

    }
  }
}


//プラスボタン（家族登録）クリック
$(".fa-square-plus").on("click", function () {
  console.log("家族登録ボタン押したよ");

  const ul = document.getElementById("characterList");
  const li = document.createElement("li");
  const text = document.createTextNode($(".inputMenberInput").val());

  li.appendChild(text);
  // console.log(li);
  // ul.appendChild(li);

  //入力した名前とアイコンを表示する
  $('#characterList').append(
    "<div class=\"family\">"
  +"<li>"  
  + $(".inputMenberInput").val() 
  +"</li>"
  +"<div><i class=\"fa-regular fa-pen-to-square \"></i></div>"
  +"<i class=\"fa-regular fa-circle-xmark \"></i>"

  +"</div>"

  );
 
  // $("#characterList").append(ul);
  $("#characterList").css("text-align", "center");


  //ナビバーのliタグも数えているから5からスタートになる
  //そのためiを3にしておく
  var familyIndex = 0;
  $('.family li').each(function () {
      $(this).addClass('style-li');
      $(this).addClass('style-li' + familyIndex);
    familyIndex++;
  })



  let mumber = [];

  if (localStorage.getItem("myfamily")) {
    const jsonData = localStorage.getItem("myfamily");
    const data = JSON.parse(jsonData);
    data.push($(".inputMenberInput").val());
    const jsonData2 = JSON.stringify(data);
    localStorage.setItem("myfamily", jsonData2);
  } else {
    const memberName = $(".inputMenberInput").val();
    mumber.push(memberName);
    const jsonData2 = JSON.stringify(mumber);
    localStorage.setItem("myfamily", jsonData2);
  }

  //追加後、入力フォーム初期化
  $(".inputMenberInput").val("");
});


//キャラ選択ボタン→各キャラ分作成必要あり
$("body").on("click", ".style-li", function () {
  //ログインモーダル表示
  $(".selectedMumer").text("");
  $(".selectedMumer").append($(this).text());
  localStorage.setItem("selectedMumber", $(this).text());
  loginModal.style.display = 'block';
  //  $(".selectedMumer").append($("[name=ueserName] option:selected").text());
});


//×ボタンクリック（モーダル非表示用）
$(".fa-circle-xmark").on("click", function () {
  loginModal.style.display = 'none';
});


//キャラ選択ボタン→各キャラ分作成必要あり
$("body").on("click", ".style-li", function () {
  //ログインモーダル表示
  $(".selectedMumer").text("");
  $(".selectedMumer").append($(this).text());
  localStorage.setItem("selectedMumber", $(this).text());
  loginModal.style.display = 'block';
  //  $(".selectedMumer").append($("[name=ueserName] option:selected").text());
});