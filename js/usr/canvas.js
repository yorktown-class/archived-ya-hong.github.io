// import { doUntil } from "async";

let canvas = document.getElementById("drawing-board");
let ctx = canvas.getContext("2d");

let pageWidth = document.documentElement.clientWidth;
let pageHeight = document.documentElement.clientHeight;

canvas.width = pageWidth * 0.9;
canvas.height = pageHeight * 0.7;

let click= false;
let clear = false;

let color = document.getElementById("color");
let penrange = document.getElementById("penrange");
let eraser = document.getElementById("eraser");
let eraserrange = document.getElementById("eraserrange");
let reSetCanvas = document.getElementById("clear");
let imgObj = new Image();

imgObj.src = "http://images.cnblogs.com/cnblogs_com/html5test/359114/r_test.jpg";

// imgObj.onload = function() {
//     // ctx.drawImage(this, 0, 0);//this即是imgObj,保持图片的原始大小：470*480
//     let w = this.width;
//     let h = this.height;
//     ctx.drawImage(this, (canvas.width - w) / 2, (canvas.height - h) / 2);
// };


eraser.onclick = function () {
    if (clear == false) clear = true;
    else clear = false;
};



//鼠标按下事件
canvas.onmousedown = function (e) {
    if (!e.button == 0) return;
    click = true;
    if (!clear) {
        ctx.beginPath();
        let x = e.clientX;
        let y = e.clientY;
        ctx.lineWidth=penrange.value;
        ctx.moveTo(x, y);
    }
};

//鼠标移动事件
canvas.onmousemove = function (e) {
    let x = e.clientX;
    let y = e.clientY;
    if (!clear && click) {
        ctx.lineTo(x, y);
        ctx.strokeStyle= color.value;
        ctx.stroke();
    }
    if (clear && click) {
        // ctx.stroke();
        let len = eraserrange.value;
        ctx.clearRect(x-len, y-len, 2 * len, 2 * len);
    }
};

//鼠标松开事件
canvas.onmouseup = function () {
    // ctx.stroke();
    click = false;
}


reSetCanvas.onclick = function () {
    // ctx = canvas.getContext('2d');
    ctx.stroke();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};