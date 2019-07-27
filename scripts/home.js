var user = auth.currentUser;
//var signIsReal = false;
//Elements
var notif = document.getElementById("notif");
var username = document.getElementById("name");
//var email = document.getElementById("email");
var tFollowers = document.getElementById("tFollowers");
var tFollowing = document.getElementById("tFollowing");
// var rankElement = document.getElementById("rank");
//var //nPost = document.getElementBy//Id("//nPost");
var nRebut = document.getElementById("nRebut");
var offerDiv = document.getElementById("firstTimeOffer");
var img = document.getElementById("img");
var favMeme = document.getElementById("favMeme");
var seachBtn = document.getElementById("searchButton");
var searchInput = document.getElementById("searchInput");
var profBtn = document.getElementById("profBtn");
var profPic = document.getElementById("profPic");
var infoDiv = document.getElementById("divInfo");
var memesDiv = document.getElementById("memesDiv");
var memesDivModal = document.getElementById("memesDivModal");
var joinedDate = document.getElementById("joinedDate");
var streakButton = document.getElementById("streakButton");
var rankQ = document.getElementById("rankQ");
var streakNum = document.getElementById("streakNum");
var btnUpload = document.getElementById("btnUpload");
var btnSignout = document.getElementById("btnSignout");
var btnSetting = document.getElementById("btnSetting");
var yourCode = document.getElementById("yourCode");
var friendCodeInput = document.getElementById("friendCode");
var totFollow = 0;
//see what username you are viewing
var usernameViewing = ""
//to see if you are the user that the homepage
var ifUser = false;
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const ranker = {
  0: "Noob",
  1: "Epic Gamer",
  2: "Christian Channel",
  3: "Waifu",
  4: "Elon Musk"
};
//for limited time offer BTW this totalLikes is not the same as in the database, the database one is the number YOU have liked, this is the number of likes OTHERS AND YOU have liked your post
var totalLikes = 0;
//for the search key that people look for
var searchWords = localStorage.getItem("searchKey");
var docy;
//Variables for auth
var uid;
var yourUid;
var protectionUid;
var yourName;
var yourMemes = [];
//Prep for follow click   
var followerArray = [];
var followingArray = [];
//following numbers
var totalFollowers = 0;
var totalFollowing = 0;
//For future memes
var memeBtn;
var memeImg;
//For displaying all memes
var allMemes = "<h3>Your Banner:</h3>";
var allMemesModal = "";
//for coding the text onto memes
var gImgObj;
var gMeme = [];
var gCtx;
var canvas;
//for streak timing
var currentDate = new Date().getTime();
var darrowDate;
var streakDate;
var currentStreak;
//likes per meme
var likes;
var likes1;
//to see if this profile is yours or not
var ifProf = true;
//for your rep
var repStat = document.getElementById("repAnon")
//benefit rep
var benRep = 0;
//badge for exclusive users
var badge = document.getElementById("badge")
//reputation stats
var reptation = [];
//get all notifications
var likeNotif = [];
var commentNotif = [];
var followNotif = []
//Change Stuff
//alert(profPic.width);
//For unfollowing function in arrays
function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
//onstart detects what kind of search this is
function onstartH(){
    //alert('alive?')
    searchWords = localStorage.getItem("searchKey");
    //var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(firebaseUser =>{
if(firebaseUser){
    //alert('here1')
    ifUser = true
     uid = firebase.auth().currentUser.uid;
     protectionUid = firebase.auth().currentUser.uid;
    db.collection("users").where("uid", "==", uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            reptation = [doc.data().reputation[0],doc.data().reputation[1],doc.data().reputation[2],doc.data().reputation[3]]
            usernameViewing = doc.data().name
            likeNotif = doc.data().notification.likes.nseen
            commentNotif = doc.data().notification.comments.nseen
            followNotif = doc.data().notification.follows.nseen
            //declaring yourUid for following & unfollowing purposes
            yourUid = doc.id
            benRep = doc.data().reputation[1]
            console.log(doc.data())
            yourName = doc.data().name
            //if searchWords has no value just go to profile
            //alert(searchWords)
            setTimeout(function(){
            if(searchWords == null || searchWords == "null"){
                searchWords = yourName
            }
            setTimeout(function(){
            //alert(searchWords)
            if(yourName == searchWords){
                //if it is a search for the profile (like clicking the homepage button, then it will go to profSearch)
                profSearch()
            }else{
                //if it is a regular search, it will go to otherSearch to find the correct search for what you are looking for
                //alert(searchWords)
                //etTimeout(function)
                console.log(searchWords)
                otherSearch(searchWords)
            }
            },100)
            },1000)
            //  //displaying the image
            // storageRef.child("profile/" + doc.data().img).getDownloadURL().then(function(url) {
            // // This can be downloaded directly:
            // var xhr = new XMLHttpRequest();
            // xhr.responseType = 'blob';
            // xhr.onload = function(event) {
            // var blob = xhr.response;
            // };
            // xhr.open('GET', url);
            // xhr.send();
            // profPic.src = url;
            // });
            //alert(doc.data().googleAuth + " ok?")
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
        })
      })
   db.collection("memeInfo").where("creator", "==", protectionUid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          totalLikes += doc.data().likes
        })
      })    
    }else{
    }})
}
var date;
function profSearch(){
  ifProf = true
firebase.auth().onAuthStateChanged(firebaseUser =>{
if(firebaseUser){
    ifUser = true
	console.log("working")
	uid = firebase.auth().currentUser.uid
	db.collection("users").where("uid", "==", uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            yourCode.value = doc.data().reputation[2]
            console.log(doc.data())
             //displaying the image
            if(doc.data().googleAuth){
              img.src = doc.data().img
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
              img.src = url;
             // alert(url)
              });
            }
            storageRef.child("memes/" + doc.data().favMeme).getDownloadURL().then(function(murl) {
            // This can be downloaded directly:
            var txhr = new XMLHttpRequest();
            txhr.responseType = 'blob';
            txhr.onload = function(event) {
            var tblob = txhr.response;
            };
            txhr.open('GET', murl);
            txhr.send();
            //favMeme.src = murl;
            });
            setTimeout(function(){
                
                profPic = document.getElementById("profPic");
                document.getElementById("profPic").style.height = String(document.getElementById("CorpImg").height + "px")
                document.getElementById("profPic").style.width = String(document.getElementById("CorpImg").height + "px")
                 //document.getElementById("search").style.marginLeft = 8%;
                 
                 
                 
                 
                 
                 
                //profPic.height = 70;
                // profPic.width = "auto";
                img = document.getElementById("img");
                //img.width = 220;
            },100)
            if(document.getElementById("flwBtn")){
                document.getElementById("flwBtn").style.display = "none";
                document.getElementById("flwBtn").id = "dead";
            }
            if(String(doc.data().badge[0]) == "1"){
                badge.style.display = "inline"
                badge.innerHTML = "<h4 id='badgeName'>Creator</h4>"
            }
            if(String(doc.data().badge[0]) == "2"){
                badge.style.display = "inline"
                badge.innerHTML = "<h4 id='badgeName'>OG</h4>"
            }
            document.getElementById("madeMemesManual").innerHTML = ""
        	username.innerHTML = "Hi, " + doc.data().name;
        	totalFollowers = parseInt(doc.data().totalFollowers);
        	totalFollowing = parseInt(doc.data().totalFollowing);
        	tFollowers.innerHTML = "Followers: " + totalFollowers;
        	tFollowing.innerHTML = "Following: " + totalFollowing;
          btnSetting.style.display = "inline"
          btnUpload.style.display = "inline"
          btnSignout.style.display = "inline"
          
          totFollow = doc.data().totalFollowers
          document.getElementsByClassName("tab")[0].style.display = "block"
          //document.getElementById("likedMemes").style.display = "block"
          document.getElementById("memeTab").style.display = "none"
          //document.getElementById("memeCatLiked").style.display = "block"
          document.getElementById("madeMemes").innerHTML = ""
          document.getElementById("madeMemesManual").innerHTML = ""
        //listLikedMemes()
        listYourMemes()
            date = doc.data().timestamp
            joinedDate.innerHTML = "Joined " + monthNames[new Date(date).getMonth()] + ", " + (new Date(date).getYear() + 1900)
            memeDivGet(uid)
        })});
}else{
    console.log("You are not logged in, please sign up or log in.")
    location.replace("../pages/signup.html");
}});
searchWords = localStorage.setItem("searchKey", null);
}
// function createMemeDiv(meme){
//     memesDisplay(doc)
//     // var memeTxt = document.createTextNode("Follow");
// }
//SHOW ALL MEMES
function memeDivGet(theId){
  //     setTimeout(function(){
  //  db.collection("memeInfo").where("creator", "==", theId)
  //   .get()
  //   .then(function(querySnapshot) {
  //       querySnapshot.forEach(function(doc) {
  //            db.collection("memeInfo").doc(doc.id).collection("MIMG")
  //           .get()
  //           .then(function(querySnapshot) {
  //               querySnapshot.forEach(function(doc) {
  //                 //alert(doc.data())
  //                 // alert("here")
  //                 console.log(doc.data().Coordinates[0].fontSize)
  //                 gMeme.push(doc.data().BaseIMG)
  //                 for (var i = 0; i < doc.data().Coordinates.length; i++) {
  //                   // alert("here" + i)
  //                   gMeme.push({
  //                     line: "line",
  //                     size: doc.data().Coordinates[i].fontSize,
  //                     align: doc.data().Coordinates[i].align,
  //                     color: doc.data().Coordinates[i].color, // in color picker, if choosing color from platte notice it stays "solid".
  //                     fontFamily: doc.data().Coordinates[i].fontStyle,
  //                     lineWidth: 2, // outline width
  //                     x: doc.data().Coordinates[i].xPos,
  //                     y: doc.data().Coordinates[i].yPos,
  //                     text: doc.data().Text[i]        
  //                   })
  //                 }
  //                 //console.log(doc.data().BaseIMG)
  //                 initCanvas(doc.data().BaseIMG);
  //               })
  //           })
  //       })
  //   })
  // },1500) 
}
function editor(){
    //searchWords = null;
    location.replace("../pages/editor.html");
}

function profDisplay(doc){
        //displaying the image
        storageRef.child('profile/' + doc.img).getDownloadURL().then(function(url) {
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
        var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
         alert(url)
        //img.src = url;
        // alert("HERE!")
        //   img.height = img.width
        //img.style.width = "100%"
        // listLikedMemes()
        // listYourMemes()
        });
}
// window.onload = function() {
//   img.height = img.width
// }
// window.onload = function(){
//   //img.height = img.width
//   alert("alive")
// }
function otherSearch(arg){
  ifProf = false;
  ifUser = false;
  console.log(arg)
  db.collection("users").where("name", "==", arg)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          usernameViewing = doc.data().name
          uid = doc.data().uid
          console.log(doc.data())
          var followName = doc.data().name
           //displaying the image
          if(doc.data().googleAuth){
            img.src = doc.data().img
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
            img.src = url;
            });
          }
          if(document.getElementById("flwBtn")){
              document.getElementById("flwBtn").style.display = "none";
              document.getElementById("flwBtn").id = "dead";
          }
          var followTxt = document.createTextNode("Follow");
          var followBtn = document.createElement("button");
          for (var i = 0; i < doc.data().followers.length; i++) {
              if(doc.data().followers[i] != yourUid){
              followTxt = document.createTextNode("Follow");
              }else{
              followTxt = document.createTextNode("Unfollow");
              }
          }
          followBtn.setAttribute("id","flwBtn");
          //alert(doc.id);
          followBtn.appendChild(followTxt);
          document.getElementById("buttons").appendChild(followBtn)
          var flwBtn = document.getElementById("flwBtn");
          totalFollowers = doc.data().totalFollowers;
          totalFollowing = doc.data().totalFollowing;
            if(String(doc.data().badge) == "1"){
                badge.style.display = "inline"
                badge.innerHTML = "<h4 id='badgeName'>memelord</h4>"
            }
          username.innerHTML = "This is:  " + doc.data().name;
          tFollowers.innerHTML = "Followers: " + totalFollowers;
          tFollowing.innerHTML = "Following: " + totalFollowing; 
          offerDiv.style.display = "none"
          //hiding the meme tab and the liked tab
          // document.getElementById("memeTab").style.display = "none"
          // // document.getElementById("likedTab").style.display = "none"
          // document.getElementById("yourMemes").style.display = "none"
          // document.getElementById("madeMemesManual").style.display = "none"
          //REMOVING OLD DATA
          document.getElementsByClassName("tab")[0].style.display = "none"
          //document.getElementById("likedMemes").style.display = "none"
          document.getElementById("memeTab").style.display = "block"
          //document.getElementById("memeCatLiked").style.display = "none"
          // document.getElementsByClassName("tabcontent")[0].innerHTML = ""
          document.getElementById("memeTab").innerHTML = '<div id="madeMemes"></div><div id="madeMemesManual"></div>'
          listYourMemes()
          btnSetting.style.display = "none"
          btnUpload.style.display = "none"
          btnSignout.style.display = "none"
          // alert("finished")
              document.getElementById("profPic").style.height = String(document.getElementById("CorpImg").height + "px")
              document.getElementById("profPic").style.width = String(document.getElementById("CorpImg").height + "px")
              //document.getElementById("search").style.margin-left = 8%;
              
              
              
          //streakNum.innerHTML = "Streak: " + doc.data().streak;
          // rankElement.innerHTML = "Rank: " + ranker[parseInt(doc.data().badge)];
          //streakButton.style.display = "none"
          //set date
            date = doc.data().timestamp
            joinedDate.innerHTML = "Joined " + monthNames[new Date(date).getMonth()] + ", " + (new Date(date).getYear() + 1900)
          for (var a = 0; a < doc.data().followers.length; a++) {
              followerArray.push(String(doc.data().followers[a]))
          }
          memeDivGet(doc.data().uid);
       document.getElementById("flwBtn").addEventListener("click", function() {     
          firebase.auth().onAuthStateChanged(firebaseUser =>{
          if(firebaseUser){
           //Reset everything so that if the user constantly follows and unfollows, the uid doesn't pileup
           followingArray = [];
           followerArray = [];   
           uid = firebase.auth().currentUser.uid
           //setTimeout(function(){   
           db.collection("users").where("uid", "==", uid)
           .get()
           .then(function(querySnapshot) {r
                   querySnapshot.forEach(function(doc) {
              for (var i = 0; i < doc.data().following.length; i++) {
                  followingArray.push(String(doc.data().following[i]))
                  console.log(doc.data().following)
                  //alert(doc.data().following)
              }
           })})
          //FIND CURRENT FOLLOWING
          setTimeout(function(){
           console.log(followingArray);
           if(flwBtn.innerHTML == "Follow"){
            //   alert('made follower')
              //make it look like they got a follower :)
            //   var tempF = tFollowers.innerHTML;
            //   tempF = tempF.split(" ");
            //   tempF[1]++
              //console.log("here1")
              followingArray.push(String(doc.id));
              followerArray.push(String(yourUid));
            //   var tempFollowing = tFollowing.innerHTML;
            //   tempFollowing = tempFollowing.split(" ")
              //console.log(followingArray);
              //console.log("here2")
              //alert(doc.id + " and " + yourUid)
          		// db.collection("users").doc(yourUid).update({
            //         notification.follows.nseen: firebase.firestore.FieldValue.arrayUnion(yourName + " has started following you")   
            //     })
              totalFollowing++
              totalFollowers++
                db.collection("users").doc(String(yourUid)).update({
                  following: followingArray,
                  totalFollowing: totalFollowing,
               })
             // console.log("here3")
                db.collection("users").doc(String(doc.id)).update({
                  followers: followerArray,
                  totalFollowers:  totalFollowers,
               }) 
               tFollowers.innerHTML = "Followers: " + totalFollowers;
              //console.log("here4")
              flwBtn.innerHTML = "Unfollow"
          }else if(flwBtn.innerHTML == "Unfollow"){ 
              removeA(followingArray, doc.id);
              removeA(followerArray, yourUid);
             setTimeout(function(){   
              console.log(followingArray);
              totalFollowing--;
              totalFollowers--;
                db.collection("users").doc(String(yourUid)).update({
                  following: followingArray,
                  totalFollowing: totalFollowing,
               }) 
                db.collection("users").doc(String(doc.id)).update({
                  followers: followerArray,
                  totalFollowers: totalFollowers,
               })    
               },100)
                flwBtn.innerHTML = "Follow"  
               //make it look like they lost a follower :(
               tFollowers.innerHTML = "Followers: " + totalFollowers;
            //   var tempF = tFollowers.innerHTML;
            //   tempF = tempF.split(" ");
            //   tempF[1]--
            //   tFollowers.innerHTML = tempF[0] + " " + tempF[1]             
          }
          // //Reset everything so that if the user constantly follows and unfollows, the uid doesn't pileup
          // followingArray = [];
          // followerArray = [];
            },500)
          }
          //}
          })
          })
searchWords = localStorage.setItem("searchKey", null);
})})
}
function homeP(){
firebase.auth().onAuthStateChanged(firebaseUser =>{
if(firebaseUser){
    var uid = firebase.auth().currentUser.uid
    db.collection("users").where("uid", "==", uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            //alert(doc.data().name)
    localStorage.setItem("searchKey", doc.data().name);
    onstartH()
})})}})
}
//Detecting for searches that come in
// function detectSearch(){    
//     if(searchWords != null){
//         alert("detectSearch")
//        // alert(searchWords)
//         search(searchWords)
//        // alert(searchWords)
//     //     setTimeout(function(){
//     //     searchWords = null
//     // },200)
//     }
// }
//clears data :)

// CODE FOR MODAL TO CHOOSE BEST MEME

document.getElementById("searchButton").addEventListener("click", function() {
    //alert(searchInput.value)
     otherSearch(searchInput.value)

})
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("favMemeDiv");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// var mobileModalSearch = document.getElementById("")


//var myMeme = document.getElementById("myMeme")
function setNewFavMeme(){
    console.log("wow")
}
//FOR UPDATING THE STREAK
function streakGo(){
    setTimeout(function(){
    db.collection("users").where("uid", "==", uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          docy = doc.id
          //alert(doc.id)
            //darrowDate = Math.ceil((currentDate - streakDate) / (1000 * 60 * 60 * 24))
            if(darrowDate <= 0){
                //they have already done this don't do anything
            }else{
                //console.log("here!")
                streakDate = currentDate;
                //keep color at silver
                streakButton.style.backgroundColor = "#cecaca"
                streakButton.innerHTML = "Streak"                
                currentStreak++;
                //alert(currentStreak + " AND THE DATE " + streakDate)
                db.collection("users").doc(docy).update({
                    streak: currentStreak,
                    lastSDate: streakDate
                })
                streakNum.innerHTML = "Streak: " + currentStreak
            }
            console.log(darrowDate)
        })
    })
    },1500)
}
function streakStart(){
    //get most recent date they streaked
    //alert(uid)
    setTimeout(function(){
    db.collection("users").where("uid", "==", uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            currentStreak = doc.data().streak
            currentDate = (new Date().getTime()/1000);
            streakDate = doc.data().lastSDate;
            darrowDate = Math.abs(Math.ceil((currentDate - streakDate) / (1000 * 3600 * 24)))
            if(darrowDate == 1){
                //change color to red
                streakButton.style.backgroundColor = "#d81a29"
                streakButton.innerHTML = "Streak!"
            }else if(darrowDate > 1){
              //alert("big woop")
              streakButton.style.backgroundColor = "#630d0d"
                db.collection("users").doc(doc.id).update({
                    streak: 0,
                    lastSDate: streakDate
                })
                streakButton.style.backgroundColor = "#d81a29"
                streakButton.innerHTML = "Streak"             
            }else if(darrowDate == 0){
                //keep color at silver
                streakButton.style.backgroundColor = "#cecaca"
                streakButton.innerHTML = "Streak"
                // setInterval(function(){
                //   streakButton.onclick = function(){}
                //   console.log(streakButton.onclick)
                // },20)
                streakButton.onclick = function(){}
                //alert("here and " + streakButton.onclick)
            }else{
              //PROBLEM
              alert("problem, please come back later")
            }
            console.log(darrowDate)
        })
    })
    },1500)
}



//CODE FOR CREATING THE MEMES THAT ARE DISPLAYED UNDER THE BANNER

// function initCanvas(link) {
//   var canvas = document.querySelector('#canvasImage');
//   gCtx = canvas.getContext('2d');
//   gImgObj = new Image();
//    // console.log(link)
//     //alert(gMeme[0])
//       gImgObj.src = link;
//       gImgObj.onload = function () {
//           canvas.width = gImgObj.width;
//           canvas.height = gImgObj.height;
//           drawCanvas();
//       };
//   //console.log("HERE4")
// }

// function drawCanvas() {
//   //alert(gMeme)
//     gCtx.drawImage(gImgObj, 0, 0);
//     for (var i = 0; i < gMeme.length; i++) {
//       if(i > 1){
//          drawTxt(gMeme[i]);
//       }
//     }
//     for (var i = 0; i < gMeme.length - 1; i++) {
//       drawTxt(gMeme[i + 1]);
//     }
//     // gMeme.txts.forEach(function (txt) {
//     //     drawTxt(txt);
//     // });

// }

// function drawTxt(txt) {
//     gCtx.font = txt.size + 'px' + ' ' + txt.fontFamily;
//     gCtx.textAlign = txt.align;
//     gCtx.fillStyle = txt.color;
//     gCtx.fillText(txt.text, txt.x, txt.y);
// }





function displayRankChart(elementName){
  var popup = document.getElementById(elementName);
  popup.classList.toggle("show");
}




  var liks = [];
  var tempLiks = []
function listLikedMemes(){
  liks = []
  tempLiks = []
   db.collection("users").where("uid", "==", uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          tempLiks = doc.data().yourLikes;
          // setTimeout(function(){
          function detectLikes(){
           db.collection("memeInfo").where("usersLiked", "array-contains", doc.data().uid)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  for (var i = 0; i < tempLiks.length; i++) {
                    liks.push([tempLiks[i],doc.data().likes])
                    console.log(liks)

                  }
                })
              })
          }
          var promise = detectLikes().then(theRest(),alert("not working"))
          // },2000)
          //doc.data().id,doc.data().likes
          function theRest(){
            var i = 0
            //alert('here2')
            if(liks.length == 0){
              console.log(liks)
              document.getElementById("likedMemes").innerHTML += '<p align="center"><img height = "auto" width = "40%"src="../models/ba5.jpg"></p><h2 align="center">Guess I\'ll Like</h2> <p align="center">Like Memes by Using the Up Arrow Button In Your Feed</p><div style="justify-content: center; display: flex;"><button onclick="myFeed()">What Feed?</button></div>'
            }else{
              var likedMInt = setInterval(function(){
                if(i < liks.length){

                  //if()
                  //canvas = null
                  gMeme = []
                  gImgObj = null
                  gCtx = null
                  document.getElementById("likedMemes").innerHTML += '<p align="center"><canvas style= "display:block;" id="' + 'likMeme' + liks[i][0] + '"></canvas></p><p>' + liks[i][1] + ' 🔥</p>';
                  //setTimeout(function(){
                    createGMeme(window['likMeme' + liks[i][0]].id,String(liks[i][0]),'');
                  //},200)
                  i++
                }else{
                  clearInterval(likedMInt)
                }
              },1000)
            }
          }
          //}
        })
      })
}


// function listFriendMemes(){

// }


//MEME GENERATOR FOR "LIKED MEMES"
var gMeme = [];
var gCtx;
var gImgObj;
var canvas;

function createGMeme(which,val,section){
  console.log(which + " and " + val)
  setTimeout(function(){
   db.collection("memeInfo").where("id", "==", val)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          //Differentiate between BIMG memes and manually uploaded memes
          if(doc.data().name == ""){
            //alert("HERE1")
            setTimeout(function(){
             db.collection("memeInfo").doc(doc.id).collection("MIMG")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  //alert(doc.data())
                  // alert("here")
                  //console.log(doc.data().Coordinates[0].fontSize)
                  gMeme.push(doc.data().BaseIMG)
                  for (var i = 0; i < doc.data().Coordinates.length; i++) {
                    // alert("here" + i)
                    gMeme.push({
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
                  initCanvas(doc.data().BaseIMG, which);
                })
              })
            },250)
          }else{
           document.getElementById("likMeme" + val).remove()
            //alert("HERE")
            //var newLink;
            setTimeout(function(){
            storageRef.child("memes/" + doc.data().name).getDownloadURL().then(function(murl) {
            // This can be downloaded directly:
            var txhr = new XMLHttpRequest();
            txhr.responseType = 'blob';
            txhr.onload = function(event) {
            var tblob = txhr.response;
            };
            txhr.open('GET', murl);
            txhr.send();
            // newLink = murl
            //alert(murl + "   MURL!!!")
            document.getElementById("likedMemesManual" + section).innerHTML += '<p align="center"><img style= "display:block;" height = "auto" width = "60%" id="' + 'likMeme' + val + '" src = "' + murl +'"></p>'
            });
           },500)
          }
        })
    })
  },1500) 
  //console.log("HERE3")
} 


//CODE FOR DISPLAYING THE EDITED IMAGE TO THE USER

function initCanvas(link,which) {
  //console.log("HERE C")
  canvas = document.querySelector('#' + String(which));
  gCtx = canvas.getContext('2d');
  gCtx.clearRect(0, 0, canvas.width, canvas.height);
  gImgObj = new Image();
   // console.log(link)
    //alert(gMeme[0])
      gImgObj.src = link;
      gImgObj.onload = function () {
          canvas.width = gImgObj.width;
          canvas.height = gImgObj.height;
          canvas.style.height = "auto"
          canvas.style.width = "60%"
        console.log(canvas.width)
          drawCanvas();
      };
  // gImgObj.height = "100"
  // gImgObj.width = "100"
  console.log(canvas.width)
  //console.log("HERE4")
}

function drawCanvas() {
  //alert(gMeme)
  console.log(canvas.width)
    gCtx.drawImage(gImgObj, 0, 0,);
    console.log(canvas.width)
    for (var i = 0; i < gMeme.length; i++) {
      if(i > 1){
         drawTxt(gMeme[i]);
      }
    }
    for (var i = 0; i < gMeme.length - 1; i++) {
      drawTxt(gMeme[i + 1]);
    }
    // gMeme.txts.forEach(function (txt) {
    //     drawTxt(txt);
    // });
  console.log(gMeme)
  // canvas = null
   gMeme = []
  // gImgObj = null
  // gCtx = null
}

function drawTxt(txt) {
    gCtx.font = txt.size + 'px' + ' ' + txt.fontFamily;
    gCtx.textAlign = txt.align;
    gCtx.fillStyle = txt.color;
    gCtx.fillText(txt.text, txt.x, txt.y);
}





//Tab code
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  if(document.getElementById(tabName).style.display == "none"){
    document.getElementById(tabName).style.display = "block"
  }else{
    document.getElementById(tabName).style.display = "none"
  }
}




var repVal = 0
var yourM = [];
//var summation = 0;
function listYourMemes(){
  yourM = []
   db.collection("memeInfo").where("creator", "==", uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          //alert(doc.data().id)
          //for rep
        //   summation += parseInt(doc.data().likes)
        //   alert(summation)
          repVal += parseInt(doc.data().likes);
          //for detection
          var creatorLiked = false;
          for (var i = 0; i < doc.data().usersLiked.length; i++) {
            if(protectionUid == doc.data().usersLiked[i]){
              creatorLiked = true
            }
          }
      //  for(var i = 0; i < yourM.length; i++){
              if (creatorLiked) {
                yourM.push([doc.data().id,doc.data().likes,false,doc.data().name]);
              }else{
                yourM.push([doc.data().id,doc.data().likes,true,doc.data().name]);
              }             
      //  }
        //   if (creatorLiked) {
        //     yourM.push([doc.data().id,doc.data().likes,false,doc.data().name]);
        //   }else{
        //     yourM.push([doc.data().id,doc.data().likes,true,doc.data().name]);
        //   } 
          //},200)
          console.log(yourM)            
     //   }
          //alert(creatorLiked)
          //}
        })
      })
  var a = 0
  setTimeout(function(){
  if(yourM.length == 0){
     //if()
    if(ifProf){
            document.getElementById("madeMemes").innerHTML += '<p align="center"><img height = "auto" width = "40%"src="../models/sadCat.jpg"></p><h2 align="center">No Memes</h2> <p align="center">Create Memes In Our Editor!</p><div style="justify-content: center; display: flex;"><button onclick="theEditor()">What Editor?</button></div>'
    }else{
            document.getElementById("madeMemes").innerHTML += '<p align="center"><img height = "auto" width = "40%"src="../models/sadCat.jpg"></p><h2 align="center">No Memes</h2> <p align="center">This User Hasn\'t Uploaded Any Memes :(</p><div style="justify-content: center; display: flex;"></div>'      
    }
  }else{
    var yourMInt = setInterval(function(){
      if(a < yourM.length){
        //if()
        //canvas = null
        gMeme1 = []
        gImgObj1 = null
        gCtx1 = ""        
        if(yourM[a][3] != ""){
            //WOWWWW
            if(ifUser){
                document.getElementById("madeMemesManual").innerHTML += '<a href="Javascript:deleteMeme(' + yourM[a][0] + ')"><p style="text-decoration:none;color:white;">&#x2716;</p></a>'
            }
            document.getElementById("madeMemesManual").innerHTML += '<p align="center"><img style= "display:block;" height = "auto" width = "60%" id="' + 'madM' + String(yourM[a][0]) + '"></p>'
            document.getElementById("madeMemesManual").innerHTML += '<div style="text-align: center;"><a style="text-decoration:none;" href="javascript: addLike(' + String(yourM[a][0]) +')"><p id="yourP' + yourM[a][0] +'"style="display:inline;color: white; text-decoration: none;text-align: center;">'+ yourM[a][1] +' 🔥</p></a> <button onclick="openModal( ' + yourM[a][0] + ')">Share</button></div>'  //<button onclick="openModal()">Share</button>  
        }else{
            if(ifUser){
                document.getElementById("madeMemes").innerHTML += '<a href="Javascript:deleteMeme(' + yourM[a][0] + ')"><p style="text-decoration:none;color:white;">&#x2716;</p></a>'
            }
            document.getElementById("madeMemes").innerHTML += '<p align="center"><canvas style= "display:block;" id="' + 'madM' + yourM[a][0] + '"></canvas></p>';
            document.getElementById("madeMemes").innerHTML += '<div style="text-align: center;"><a style="text-decoration:none;" href="javascript: addLike(' + String(yourM[a][0]) +')"><p id="yourP' + yourM[a][0] +'"style="display:inline;color: white; text-decoration: none;text-align: center;">'+ yourM[a][1] +' 🔥</p></a> <button onclick="openModal( ' + yourM[a][0] + ')">Share</button></div>'    //<button onclick="openModal()">Share</button>
        }
          createGMeme1(window['madM' + yourM[a][0]].id,String(yourM[a][0]));
        a++;
      }else{
        clearInterval(yourMInt)
      }
    },500)
  }
    repStat.innerHTML = repVal + (3*totFollow) + benRep + " Rep"
    // db.collection("users").doc(yourUid).add({
    //     reputation: repVal + (3*totFollow) + benRep + 100
    // })
  },1500)
  openTab(event,'memeTab')
}


function goToUpload(){
	location.replace("../pages/upload.html");
}

var queries = [];
//var fuck = "shit, what the fuck am I doing with my life"
function deleteMeme(memeId){
    //alert('here')
db.collection('memeInfo')
  .where('id', '==', String(memeId))
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        var deleteId = doc.data().id;
            db.collection("memeInfo").doc(doc.id).delete().then(function() {
                //alert('here2')
                db.collection("universalId").doc("Deleted").update({
                    deleted: db.FieldValue.arrayUnion(deleteId)
                }).then(function(){
                    Swal.fire({
                      title: 'Successfully Deleted',
                      type: 'success',
                      background: '#1e1e1e',
                    })
                    .then(clicked => {
                        location.reload();
                    });                    
                })
                
            }).catch(function(error) {
                Swal.fire({
                  title: 'Something Went Wrong',
                  type: 'warning',
                  background: '#1e1e1e',
                })                
                console.error("Error removing document: ", error);
            });

     });
  })

}

//MEME GENERATOR FOR "YOUR MEMES"
var gMeme1 = [];
var gCtx1;
var gImgObj1;
var canvas1;
var manual = false;

function createGMeme1(which,val){
  console.log(which + " and " + val)
  setTimeout(function(){
   db.collection("memeInfo").where("id", "==", val)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          //Differentiate between BIMG memes and manually uploaded memes
          if(doc.data().name == ""){
            //alert("HERE1")
            setTimeout(function(){
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
                  initCanvas1(doc.data().BaseIMG, which);
                })
              })
            },250)
          }else{
           //document.getElementById("madM" + val).remove()
            //alert("HERE")
            //var newLink;
            setTimeout(function(){
            storageRef.child("memes/" + doc.data().name).getDownloadURL().then(function(murl) {
            // This can be downloaded directly:
            var txhr = new XMLHttpRequest();
            txhr.responseType = 'blob';
            txhr.onload = function(event) {
            var tblob = txhr.response;
            };
            txhr.open('GET', murl);
            txhr.send();
            // newLink = murl
            //alert(murl + "   MURL!!!")
            manual = true
            document.getElementById("madM" + val).src = murl;
            });
           },500)
          }
        })
    })
  },1500) 
  //console.log("HERE3")
} 


//alert('changed')


//CODE FOR DISPLAYING THE EDITED IMAGE TO THE USER

function initCanvas1(link,which) {
  //console.log("HERE C")
  canvas1 = document.querySelector('#' + String(which));
  gCtx1 = canvas1.getContext('2d');
  gCtx1.clearRect(0, 0, canvas1.width, canvas1.height);
  gImgObj1 = new Image();
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
//go to myFeed
function myFeed(){
    location.replace("../pages/index.html");
}
//go to the editor
function theEditor(){
    location.replace("../pages/manualUpload.html");
}


//Tab code
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  if(document.getElementById(tabName).style.display == "none"){
    document.getElementById(tabName).style.display = "block"
  }else{
    document.getElementById(tabName).style.display = "none"
  }
}

//for adding likes to memes (currently only works for yourMemes)
function addLike(id){
  //alert("made it " + id)
  id = String(id)
    db.collection("memeInfo").where("id", "==", id)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          //alert("found!")
          for (var i = 0; i < yourM.length; i++) {
            if(yourM[i][2] == false){}else{
              if(yourM[i][0] == id){
                //alert("found val")
                yourM[i][1]++ 
                yourM[i][2] = false;
                var usersLLL = doc.data().usersLiked
                usersLLL.push(protectionUid)
                db.collection("memeInfo").doc(doc.id).update({
                  likes: yourM[i][1],
                  usersLiked: usersLLL
                })   
                document.getElementById("yourP" + id).innerHTML = yourM[i][1] + " 🔥"
              }
            }
          }       
        })
      }) 
}

//copy code for offer
function copyCode(){
 // alert('here')
  yourCode.select();
  document.execCommand("copy");
}


function runCode(){
  //alert('here1')
  if(friendCodeInput != yourCode){
    db.collection("users").where("reputation", "array-contains", friendCodeInput.value)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          //alert('here2')
          var did = false
          if(doc.data().reputation[3] != undefined){
            for (var i = 2; i < doc.data().reputation.length; i++) {
              if(doc.data().reputation[i] == protectionUid){
                did = true
              }
            }
          }
          if(doc.data().reputation[3] == undefined || did == false){
          var friendNew = doc.data().reputation
          friendNew[1] += 100 
          friendNew.push(protectionUid)
          db.collection("users").doc(doc.id).update({
            reputation: friendNew,
          }) 
            db.collection("users").where("uid", "==", protectionUid)
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                //alert('here3')
                var yourNew = doc.data().reputation
                yourNew[1] += 100
                yourNew.push(protectionUid)
                db.collection("users").doc(doc.id).update({
                  reputation: yourNew,
                }) 
                 repStat.innerHTML = repVal + 100 + (3*totFollow) + benRep + " Rep"
               // alert()
              })
            })
          friendCodeInput.innerHTML = ":)"  
          }
        })
      })
  }
}

function signoutFunc(){
	// signout.addEventListener('click', e=>{
	  firebase.auth().signOut();
	//});
 setTimeout(function() {
    // console.log('leaving!')
 location.replace("../pages/basepage.html");
  }, 1000);
}


function goToFeed(){
	location.replace("../pages/index.html");
}




function openModal(id){
    Swal.fire({
      title: 'Share This Meme',
      input: 'text', 
      inputValue: 'https://www.thrmpage.com/pages/springboard.html#' + id,
      confirmButtonText: 'Copy', 
      background: '#1e1e1e',
    })
    .then(clicked => {
        document.getElementById("copytxt").value = "https://www.thrmpage.com/pages/springboard.html#" + id;
        document.getElementById("copytxt").select();
    	document.execCommand("copy");
    	location.replace("https://www.thrmpage.com/pages/springboard.html#" + id);
    });    
}

// function showCurrentNotif(){
    
//     for(var i = 0; i < commentNotif.length i++){
//         notif.innerHTML += commentNotif[i]
//     }
//     for(var i = 0; i < followNotif.length i++){
//         notif.innerHTML += followNotif[i]
//     }
//     for(var i = 0; i < likeNotif.length i++){
//         notif.innerHTML += likeNotif[i]
//     }
// }










