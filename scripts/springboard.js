//MEME GENERATOR FOR "YOUR MEMES"
var gMeme1 = [];
var gCtx1;
var gImgObj1;
var canvas1;
var manual = false;
//id of meme
var realId;
//name of creator of meme
var usern = ""
//id of meme viewer (if there is one)
var userid = ""
//onstart detects what kind of search this is
function onstartA(){
    //searchWords = localStorage.getItem("searchKey");
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        //alert('logged in')
        //ifUser = true
         uid = firebase.auth().currentUser.uid;
         protectionUid = firebase.auth().currentUser.uid;
        db.collection("users").where("uid", "==", uid)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                userid = doc.data().uid;
                //declaring yourUid for following & unfollowing purposes
                //if searchWords has no value just go to profile
              if(doc.data().googleAuth){
                profPic.src = doc.data().img
              }else{
                storageRef.child("profile/" + doc.data().img).getDownloadURL().then(function(url) {
                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function(event) {
                var blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();
                profPic.src = url;
                });
              }
            });
          });
            document.getElementById("profPic").style.height = String(document.getElementById("CorpImg").height + "px");
            document.getElementById("profPic").style.width = String(document.getElementById("CorpImg").height + "px");
            runHash();
        
      } else {
        // No user is signed in.
       // alert('not logged in')
        document.getElementsByClassName("notLogged")[0].style.display = "inline-block"
        document.getElementsByClassName("notLogged")[1].style.display = "inline-block"
        document.getElementById("profPic").style.display = "none"
            runHash();
      }
    });
}


function runHash(){
    if(window.location.hash) {
        realId = String(window.location.hash.slice(1));
    // Fragment exists
        // if(realId ==""){
            
        // }{
        setTimeout(function(){
            Swal.fire({
              title: 'Join the party!',
              text: 'See more fresh memes',
              type: 'success',
              background: '#1e1e1e',
            })
            .then(clicked => {
                if(clicked.value){
                    location.replace("https://www.thrmpage.com/pages/basepage.html");
                }
            }); 
        },10000)
        db.collection("memeInfo").where("id", "==", realId)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                //get meme
                if(doc.data().name == ""){
                    document.getElementById("canvasImage").style.display = "block"
                    document.getElementById("theImg").style.display = "none"
                    document.getElementById("download2").style.display = "inline-block"
                    document.getElementById("download1").style.display = "none"
                    
                    db.collection("memeInfo").doc(doc.id).collection("MIMG")
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                              //alert(doc.data())
                              // alert("here")
                              //console.log(doc.data().Coordinates[0].fontSize)
                              gMeme1.push(doc.data().BaseIMG)
                              for (var i = 0; i < doc.data().Coordinates.length; i++) {
                                // alert("here" + i)
                                gMeme1.push({
                                  line: "line",
                                  size: doc.data().Coordinates[i].fontSize,
                                  align: doc.data().Coordinates[i].align,
                                  color: doc.data().Coordinates[i].color, // in color picker, if choosing color from platte notice it stays "solid".
                                  fontFamily: doc.data().Coordinates[i].fontStyle,
                                  lineWidth: 2, // outline width
                                  x: doc.data().Coordinates[i].xPos,
                                  y: doc.data().Coordinates[i].yPos,
                                  text: doc.data().Text[i]        
                                })
                              }
                              //console.log("HERE B")
                              //console.log(doc.data().BaseIMG)
                              initCanvas1(doc.data().BaseIMG, "canvasImage");
                            })
                          })
                }else{
                    storageRef.child("memes/" + doc.data().name).getDownloadURL().then(function(url) {
                    // This can be downloaded directly:
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function(event) {
                    var blob = xhr.response;
                    };
                    xhr.open('GET', url);
                    xhr.send();
                    document.getElementsByTagName("META")[1].content = url;
                    document.getElementById("download1").style.display = "inline-block"
                    document.getElementById("download2").style.display = "none"
                    document.getElementById("canvasImage").style.display = "none"
                    document.getElementById("theImg").style.display = "block"
                    document.getElementById("theImg").src = url;
                    document.getElementById("theImg").addEventListener("load", function(){
                        if(document.getElementById("theImg").height >= document.getElementById("theImg").width){
                            document.getElementById("theImg").style.height = "68vh"
                        }else{
                             document.getElementById("theImg").style.width = "55vw"
                        }                        
                    });
                    });
                }
                
            //get likes
            document.getElementById("likeNum").innerHTML = '<a style="color:white;text-decoration:none;" href="Javascript: addLike(' + String(realId) + ',' + doc.data().creatorLiked + ',' + doc.data().likes + ')">' + doc.data().likes + '🔥 </a>'
            
            //get user                
            db.collection("users").where("uid", "==", doc.data().creator)   
            .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        usern = doc.data().name
                        if(doc.data().googleAuth){
                            document.getElementById("userPic").src = doc.data().img
                        }else{
                            storageRef.child("profile/" + doc.data().img).getDownloadURL().then(function(url) {
                                // This can be downloaded directly:
                                var xhr = new XMLHttpRequest();
                                xhr.responseType = 'blob';
                                xhr.onload = function(event) {
                                var blob = xhr.response;
                                };
                                xhr.open('GET', url);
                                xhr.send();
                                document.getElementById("userPic").src = url
                            })
                        }
                    })
                })
                
                
                
            });
          });
} else {
  // Fragment doesn't exist
  document.getElementById("theImg").src = "../models/sadCat.jpg"
  document.getElementById("canvasImage").style.display = "none"
  document.getElementById("theImg").style.height = "68vh"
  document.getElementById("likeNum").innerHTML = "No Memes here. <a style='text-decoration: none; color: #3d90c4; display:inline;' href='https://www.thrmpage.com/pages/index.html'>Click</a> here to get back to reality"
}
}

















//alert('changed')


//CODE FOR DISPLAYING THE EDITED IMAGE TO THE USER

function initCanvas1(link,which) {
  //console.log("HERE C")
  canvas1 = document.querySelector('#' + String(which));
  gCtx1 = canvas1.getContext('2d');
  gCtx1.clearRect(0, 0, canvas1.width, canvas1.height);
  gImgObj1 = new Image();
  gImgObj1.crossOrigin = "Anonymous";
  // console.log(link)
    //alert(gMeme[0])
      gImgObj1.src = link;
      gImgObj1.onload = function () {
          canvas1.width = gImgObj1.width;
          canvas1.height = gImgObj1.height;
          canvas1.style.height = "auto"
          canvas1.style.width = "60%"
        console.log(canvas1.width)
          drawCanvas1();
      };
  // gImgObj.height = "100"
  // gImgObj.width = "100"
  console.log(canvas1.width)
  //console.log("HERE4")
}

function drawCanvas1() {
  //alert(gMeme)
  console.log(canvas1.width)
    gCtx1.drawImage(gImgObj1, 0, 0,);
    console.log(canvas1.width)
    for (var i = 0; i < gMeme1.length; i++) {
      if(i > 1){
         drawTxt1(gMeme1[i]);
      }
    }
    for (var i = 0; i < gMeme1.length - 1; i++) {
      drawTxt1(gMeme1[i + 1]);
    }
    // gMeme.txts.forEach(function (txt) {
    //     drawTxt(txt);
    // });
  console.log(gMeme1)
  // canvas = null
  gMeme1 = []
  // gImgObj = null
  // gCtx = null
}

function drawTxt1(txt) {
    gCtx1.font = txt.size + 'px' + ' ' + txt.fontFamily;
    gCtx1.textAlign = txt.align;
    gCtx1.fillStyle = txt.color;
    gCtx1.fillText(txt.text, txt.x, txt.y);
}


//yourM.push([doc.data().id,doc.data().likes,false,doc.data().name]);
function addLike(id,creatorL,likes,){
    if(userid == ""){
     Swal.fire({
      title: 'Whoops',
      text:"Login or Signup to do that",
      type: 'warning',
      confirmButtonText: 'Ok', 
      background: '#1e1e1e',
    }).then(function(){
        location.replace("../pages/signup.html")
    })        
    }else{
        id = String(id)
        db.collection("memeInfo").where("id", "==", id)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var allUsersWhoLiked = []
                var prevLiked = false;
                allUsersWhoLiked = doc.data().usersLiked
              for (var i = 0; i < allUsersWhoLiked.length; i++) {
                  if(String(allUsersWhoLiked) == String(userid)){
                      prevLiked = true
                  }
               // if(creatorL == false){
                 // if(yourM[i][0] == id){
                 // }
               // }
              }   
              if(prevLiked == false){
                    likes++ 
                    // creatorL = false;
                    db.collection("memeInfo").doc(doc.id).update({
                      likes: likes,
                      usersLiked: userid
                    })   
                    document.getElementById("likeNum").innerHTML = likes + " 🔥"              
              }
            })
          }) 
    }
}

function goToUserPage(){
    localStorage.setItem("searchKey",usern)
    setTimeout(function(){
        location.replace("../pages/homepage.html");
    },100)
}


function download_img(el) {
    //console.log(el.href)
    if(document.getElementById("canvasImage").style.display != "none"){
        alert('canvas')
        var canvImg = document.getElementById("canvasImage").toDataURL("image/jpg");
        el.href = canvImg;        
    }else{
        alert('image')
        var xhr = new XMLHttpRequest();
        xhr.open("GET", document.getElementById("theImg").src, true);
        xhr.responseType = "blob";
        xhr.onload = function(){
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(this.response);
            var tag = document.createElement('a');
            tag.href = imageUrl;
            tag.download = "meme";
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
        }
        xhr.send();       
    }
}

function canvasDownload(el){
    var canvImg = document.getElementById("canvasImage").toDataURL("image/jpg");
    el.href = canvImg;   
}
// function open(){
//     //if(String(type) == "reddit"){
//         alert('reddit')
//         window.open("https://www.reddit.com/submit?title=&url=https%3A%2F%2Fthrmpage.com%2Fpages%2Fspringboard%2Ehtml%23" + String(realId),"reddit",width=400,height=300)
//   // }
// }

function reddit(){
   // alert('reddit')
    //window.open("", "", "width=200,height=100")
    var link = 'https://www.reddit.com/submit?title=&url=https%3A%2F%2Fthrmpage.com%2Fpages%2Fspringboard%2Ehtml%23' + String(realId)
    window.open(link,"reddit",width=400,height=300)

}