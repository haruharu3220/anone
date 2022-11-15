//map画面の描画部分はこのjsが担当する。

let mapArea = document.getElementById('mapArea');
mapArea.width = 1000;	//canvasの横幅
mapArea.height = 300;	//canvasの縦幅

//コンテキストを取得
var mapArea2D = mapArea.getContext('2d');


//パックマン（パー）のImageオブジェクトを作る
var goast = new Image();
goast.src = '../res/goast.png';


function loop() {

    //console.log("無限ループ開始");
    mapArea2D.drawImage(goast, 10, 30, 32, 32);

    requestAnimationFrame(loop);
}
addEventListener('load', loop(), false);