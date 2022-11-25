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

//画面表示時に実行
//ローカルストレージに登録している名前を表示
checkFamily();
function checkFamily() {
  if (localStorage.getItem("myfamily")) {
    const jsonData = localStorage.getItem("myfamily");
    const data = JSON.parse(jsonData);
    for (let i = 0; i < data.length; i++) {


      //入力した名前とアイコンを表示する
      $('#characterList').append(
        "<div class=\"family\">"
        + "<li>"
        + data[i]
        + "</li>"
        + "<div><i class=\"fa-regular fa-pen-to-square \"></i></div>"
        + "<i class=\"fa-regular fa-circle-xmark \"></i>"
        + "</div>"
      );

      var familyIndex = 0;
      $('.family li').each(function () {
        $(this).addClass('style-li');
        $(this).addClass('style-li' + familyIndex);
        familyIndex++;
      })
      var familyIndexPenToSquare = 0;
      $('.family .fa-pen-to-square').each(function () {
        $(this).addClass('style-li-PenToSquare' + familyIndexPenToSquare);
        familyIndexPenToSquare++;
      })
      var familyIndexXmark = 0;
      $('.family .fa-circle-xmark').each(function () {
        $(this).addClass('style-li-Xmark' + familyIndexXmark);
        familyIndexXmark++;
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
    + "<li>"
    + $(".inputMenberInput").val()
    + "</li>"
    + "<div><i class=\"fa-regular fa-pen-to-square \"></i></div>"
    + "<i class=\"fa-regular fa-circle-xmark \"></i>"
    + "</div>"
  );

  // $("#characterList").append(ul);
  $("#characterList").css("text-align", "center");

  var familyIndex = 0;
  $('.family li').each(function () {
    $(this).addClass('style-li');
    $(this).addClass('style-li' + familyIndex);
    familyIndex++;
  })
  var familyIndexPenToSquare = 0;
  $('.family .fa-pen-to-square').each(function () {
    $(this).addClass('style-li-PenToSquare' + familyIndexPenToSquare);
    familyIndexPenToSquare++;
  })
  var familyIndexXmark = 0;
  $('.family .fa-circle-xmark').each(function () {
    $(this).addClass('style-li-Xmark' + familyIndexXmark);
    familyIndexXmark++;
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
$(".fa-square-xmark").on("click", function () {
  loginModal.style.display = 'none';
});


//名前横の×アイコンをクリック
$("body").on("click", ".fa-circle-xmark", function () {

  //クラス名を取得→何番目の名前なのか番号を取得
  var className = $(this).attr("class");
  let classNameSplit = className.split(" ");
  classNameSplit[classNameSplit.length - 1];
  let number = classNameSplit[classNameSplit.length - 1].replace("style-li-Xmark", "");


  
//ローカルストレージを削除
  if (localStorage.getItem("myfamily")) {
    const jsonData = localStorage.getItem("myfamily");
    const data = JSON.parse(jsonData);
    data.splice(Number(number),1);
    // var cats_before = cats.splice(1,2);
    const jsonData2 = JSON.stringify(data);
    localStorage.setItem("myfamily", jsonData2);
  }


  //×アイコンを押したら文字を削除
  let targetli = ".style-li" + number;
  let targetPenToSquare = ".style-li-PenToSquare" + number;
  $(this).remove();
  $(targetPenToSquare).remove();
  $(targetli).remove();



  console.log($(targetli).text());

  // if (localStorage.getItem("myfamily")) {
  //   const jsonData = localStorage.getItem("myfamily");
  //   const data = JSON.parse(jsonData);
  //   for (let i = 0; i < data.length; i++) {
  //   }

});