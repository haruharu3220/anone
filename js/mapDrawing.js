//map画面の描画部分はこのjsが担当する。

let mapArea = document.getElementById('mapArea');
mapArea.width = 1000;	//canvasの横幅
mapArea.height = 300;	//canvasの縦幅

//コンテキストを取得
var mapArea2D = mapArea.getContext('2d');


//キャラクターのImageオブジェクトを作る
var goast = new Object();
goast.img = new Image();
goast.img.src = '../res/goast.png';
goast.x = 35;
goast.y = 100;
goast.move = 0;

//キーボードのオブジェクトを作成
var key = new Object();
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = '';


function loop() {

    //console.log("無限ループ開始");
    move(goast);
    mapArea2D.drawImage(goast.img, goast.x, goast.y, 32, 32);
    // console.log("X="+ goast.x );
    // console.log("Y="+ goast.y );
    requestAnimationFrame(loop);
}
addEventListener('load', loop(), false);
addEventListener("keydown", keydownfunc02, false);
addEventListener("keyup", keyupfunc02, false);


//パックマンがmoveが0より大きい場合は、4pxずつ移動を続ける
function move(Object) {
    if(Object.move === 0) {
        Object.move = 32; 
        // console.log("動け！");
    }
        if (Object.move > 0) {
    console.log("おーい");
    Object.move -= 4;
    if (key.push === 'left') Object.x -= 4;
    if (key.push === 'up') {
        Object.y -= 4;
        // console.log("↑↑↑↑↑↑");
    }
    if (key.push === 'right') Object.x += 4;
    if (key.push === 'down') Object.y += 4;
    // console.log("X="+ Object.x );
    // console.log("Y="+ Object.y );
     } 
}

//キーボードが押されたときに呼び出される関数
function keydownfunc02(event) {
    var key_code = event.keyCode;
    // console.log("キーボード押したよ");
    if (key_code === 37) key.left = true;
    if (key_code === 38) {
        console.log("↑押したよ");
        key.up = true;
        key.push = "up"
    }
        if (key_code === 39) key.right = true;
    if (key_code === 40) key.down = true;
    event.preventDefault();
}

//キーボードが放されたときに呼び出される関数
function keyupfunc02(event) {
    var key_code = event.keyCode;
    console.log("キーボード話したよ");
    if (key_code === 37) key.left = false;
    if (key_code === 38) {
        key.up = false;
        key.push = ""
    }
        if (key_code === 39) key.right = false;
    if (key_code === 40) key.down = false;
}





