'use strict';

var imageEditorLoop;
var generateEditorImageLoop;
var gMeme;
//finished is for generating the image editor 
var finished = false;
var gCtx;
var gImgObj;
var idSrc = "";

function createGmeme(imgId) {
    return {
        selectedImgId: imgId,
        txts: [createTxt('Your Text', 200, 70), createTxt('Your Text', 200, 300)]
    };
}

function createTxt(line, x, y) {
    return {
        //object txt = {property:value}
        line: line,
        size: "40",
        align: 'center',
        color: '#000', // in color picker, if choosing color from platte notice it stays "solid".
        fontFamily: 'Tahoma',
        strokeStyle: '#ffffff',
        x: x,
        y: y
    };
}

function initMemeEditor(imgId,imgLink) {
    gImgObj = new Image();
    idSrc = imgLink;
    finished = false;
    gMeme = "";

    //closes the img option choosing thing
    toggleView();
    //sets gMeme to an object with a selectedImgId of the imgId parameter
    gMeme = createGmeme(imgId);
    //creates a new canvas and img element for the editor
    var initCanvasInterval = setInterval(function(){
        console.log("checking initCanvas...")
        if(document.readyState == "complete"){
            console.log("done!")
            initCanvas();
            clearInterval(initCanvasInterval);
        }
    },500)
}

function initCanvas() {
    console.log("on initCanvas!")
    var canvas = document.querySelector('.memeCanvas');
    gCtx = canvas.getContext('2d');

    gImgObj = new Image();
        gImgObj.src = idSrc;
        //gImgObj.crossOrigin="anonymous"
        gImgObj.onload = function () {
            canvas.width = gImgObj.width;
            canvas.height = gImgObj.height;
            // gMeme.txts[1].y = gImgObj.height - 70;
            gMeme.txts[1].x = gImgObj.width/2
            gMeme.txts[0].x = gImgObj.width/2
            gMeme.txts[1].y = 3*(gImgObj.height/4)
            gMeme.txts[0].y = (gImgObj.height/4)
            drawCanvas();
            renderTxtsEditor();
            localStorage.setItem("GimgFromMeme",gImgObj.src)
            //clearInterval(generateEditor);
        };
        // }else if(finished == false){
            // console.log("not yet")

    // }
    // },500)


}

// function getImgSrc() {
//     console.log("got here")
//      setTimeout(function(){
//     db.collection("BIMG").where("id", "==", String(gMeme.selectedImgId))
//     .get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             // alert("HERE")
//             // console.log("and here")
//             console.log(doc.data().id)
//             storageRef.child('BIMG/' + doc.data().link).getDownloadURL().then(function(url) {
//                     // This can be downloaded directly:
//                     var xhr = new XMLHttpRequest();
//                     xhr.responseType = 'blob';
//                     xhr.onload = function(event) {
//                         var blob = xhr.response;
//                     };
//                     xhr.open('GET', url);
//                     xhr.send();
//                     gImgObj.src = url;

//                      //alert("made it here!" + gImgObj.src)                
//             })
//         });
//     })
//      },1500)
// }

function drawCanvas() {
    gCtx.drawImage(gImgObj, 0, 0);

    gMeme.txts.forEach(function (txt) {
        drawTxt(txt);
    });

}

function drawTxt(txt) {
    gCtx.font = txt.size + 'px' + ' ' + txt.fontFamily;
    gCtx.textAlign = txt.align;
    gCtx.fillStyle = txt.color;
    if (txt.isShadow) addTxtShadow(txt);
    if (txt.isOutline) addTxtOutline(txt);

    gCtx.fillText(txt.line, txt.x, txt.y);
}

// function addTxtShadow(txt) {
//     gCtx.shadowColor = txt.shadowColor;
//     gCtx.shadowOffsetX = txt.shadowOffsetX;
//     gCtx.shadowOffsetY = txt.shadowOffsetY;
//     gCtx.shadowBlur = txt.shadowBlur;
// }

// function addTxtOutline(txt) {
//     gCtx.strokeStyle = txt.strokeStyle;
//     gCtx.lineWidth = txt.lineWidth;
//     gCtx.strokeText(txt.line, txt.x, txt.y);
// }

/**
 * editTxt() gets changes for txt and update gMeme model.
 * Update gMeme.txts[].txt = {property:value}
 * Redraws canvas.
 * Input types: text, number, checkbox, dropdown.
 * 
 *  txtIdx - the specific txt to change in []. it's line num -1 because idx starts with 0.
 *  property - (using data-* attributes) ex. line, size, align, color, isShadow.. 
 *  value - ex. 'text', 30, left, red, true..
 */
function editTxt(elinput, txtIdx) {
    var property = elinput.dataset.property;  // using data-* attributes
    var value;

    switch (elinput.type) {
        case 'select-one':
            value = elinput.options[elinput.selectedIndex].value;
            break;
        case 'checkbox':
            value = elinput.checked;
            break;
        default: // text, number
            value = elinput.value;
            break;
    }
    gMeme.txts[txtIdx][property] = value;

    drawCanvas();
}
function renderTxtsEditor() {
    var strHtml = gMeme.txts.map(function (txt, idx) {
        return `
        <div class="txt-editor">
                    <p>
                    <button onclick="deleteTxt(${idx})">Delete Line</button>
                    <input class="theRealText" type="text" data-property="line" placeholder="${txt.line}" oninput="editTxt(this,${idx})">
                    <i class="fas fa-text-height"></i> <input class = "fontSize" type="range" value="${txt.size}"  min="10" step="2" data-property="size" oninput="editTxt(this ,${idx})">
                    <input class = "fontColor" type="color" value="${txt.color}" data-property="color" oninput="editTxt(this,${idx})">
                    Family: 
                    <select class = "fontFamily" data-property="fontFamily" oninput="editTxt(this,${idx})">
                    <option value="${txt.fontFamily}">${txt.fontFamily}</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Geneva">Geneva</option>
                    <option value="Verdana">Verdana</option>
                    </select>
                    </p>

                    <p>
                    <i class="fas fa-arrows-alt-h"></i> <input class="x-pos" type="number" value="${txt.x}"  min="0" step="5" data-property="x" oninput="editTxt(this ,${idx})">
                    <i class="fas fa-arrows-alt-v"></i> <input class="y-pos"type="number" value="${txt.y}"  min="0" step="5" data-property="y" oninput="editTxt(this ,${idx})">

                    <select class = "textAlign" data-property="align" oninput="editTxt(this,${idx})">
                    <option value="center">center</option>
                    <option value="left">left</option>
                    <option value="right">right</option>
                     </select>
                    </p>
                    <p>
                    </p>
                 
                </div>
        `
    })
        .join(' ');

    document.querySelector('.txts-list').innerHTML = strHtml;

}


function newTxtBtnClicked() {
    gMeme.txts.push(createTxt('New Line', gImgObj.width/2, gImgObj.height/2));
    drawCanvas();
    renderTxtsEditor();
}

function deleteTxt(txtIdx) {
    gMeme.txts.splice(txtIdx, 2); //arr.splice(start, deleteCount)
    drawCanvas();
    renderTxtsEditor();
}

/* REGISTER DOWNLOAD HANDLER */
function dlCanvas(eldllink) {
    var canvas = document.querySelector('.memeCanvas');

    var dt = canvas.toDataURL('image/png');
    /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
    dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

    /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
    dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=canvas.png');

    eldllink.href = dt;
}

function toggleView() {
    document.querySelector('.meme-container').classList.toggle('hidden');
    document.querySelector('.gallery').classList.toggle('hidden');

}



// For moving stuff
let currentDroppable = null;

    ball.onmousedown = function(event) {

      let shiftX = event.clientX - ball.getBoundingClientRect().left;
      let shiftY = event.clientY - ball.getBoundingClientRect().top;

      ball.style.position = 'absolute';
      ball.style.zIndex = 1000;
      document.body.append(ball);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        ball.style.left = pageX - shiftX + 'px';
        ball.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        ball.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        ball.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.droppable');
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) { // null when we were not over a droppable before this event
            leaveDroppable(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) { // null if we're not coming over a droppable now
            // (maybe just left the droppable)
            enterDroppable(currentDroppable);
          }
        }
      }

      document.addEventListener('mousemove', onMouseMove);

      ball.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        ball.onmouseup = null;
      };

    };

    function enterDroppable(elem) {
      elem.style.background = 'pink';
    }

    function leaveDroppable(elem) {
      elem.style.background = '';
    }

    ball.ondragstart = function() {
      return false;
    };















