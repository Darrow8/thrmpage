//DEFINE ELEMENTS
var imagesRef = storageRef.child('images');
//var firstMemeRef = storageRef.child('/MEMEEX.jpg');
//var gsReference = storage.refFromURL('gs://holyromanmemepage.appspot.com/MEMEEX.jpg')
var goHomepage = document.getElementById("homeBtn");
var playGenericMusic = document.getElementById("my_audio");
var img2 = document.getElementById("secondMyImg");
//var audio = document.createElement("audio");
var displayText = document.getElementById("messageText");
var imgA = document.getElementById("profPic");
var memeInfo = document.getElementById("memeInfo");
var imgMeme = document.getElementById("imgMeme");
var img3 = document.getElementById("canvasImage");
var img4 = document.getElementById("canvasImage2")
var fullscreenButton = document.getElementById("size");
var likeMeter = document.getElementById("likeMeter")
var paused = false;
//YOUR NAME!
var yourName = "";
var startElement = document.getElementById("start")
var responseImg = document.getElementsByClassName("responseImg");
var listOfMemes = [];
var whichOneWeAreOn = 0;
var newText = null;
var totalForChar = 0;
var text = null;
var allIsGo = true;
var memeLikedId = [];
var usersLikedId = [];
//alternation for displaying canvases
var alternation = false;
//For the height of the memes displayed
var universalHeight = "55vh";
var img = document.getElementById('myimg');
var imgTypes = [img,img2,img3,img4];
var dingAudio = document.getElementById("waiting_audio");
//ceiling is for the highest val in random
var ceiling = 0;
var text;
//for the url of the meme
var urlA;
// for generating random memes
var random1 = 0;
// the uid of the user doc.id
var uid;
//the id of the user doc.data().id
var yourFireId;
//the id of the meme's doc.id
var memeFireId = "";
//list of past memes for rewind button
var pastMemes = [];
//the preferences of the user
var userPref = new Map();
//the preferences of the user sorted into an array(this is the properties section)
var userPrefArrayProp = Object.getOwnPropertyNames(userPref);
//the current meme id
var currentMemeId;
//the current tags for the meme
var currentMemeTags;
//detect if video is currently runnning
var isRunning = false;
//for the number of memes YOU have liked
var yourNumLiked = 0; 
//for the number of times THIS MEME has been liked
var memeNumLiked = 0;   
//number of runs in the preference detection
var numOfRuns = 0;
// the name of this meme
var memeName = "";
//for meme canvas
var gCtx;
//for data of the canvas
var gMeme = [];
//gImgObj for canvas stuff
var gImgObj;
//switch between play and pause
var play = false;
//pause interval to stop meme feed
var pauseInterval;
//for deleted random1's that I have
var deletedList = [];
//current creator of meme
var currentCreator = "";
// MODAL STUFF
// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
//saved doc
var sDoc = {};
//checking if it has started or not
var justStarted = true;
//interval for audio
var memeInterval;
//view count
var viewCount = 0;
// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }
// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }










// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



//REQUIRED FOR ALL PAGE DOCS
function home(){
    firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
    uid = firebase.auth().currentUser.uid
        db.collection("users").where("uid", "==", uid)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                //alert(doc.data().name)
        localStorage.setItem("searchKey", doc.data().name);
    })})}})
    location.replace("../pages/homepage.html");
}
//REQUIRED FOR ALL PAGE DOCS
function onstartF(){
//alert("got here")
firebase.auth().onAuthStateChanged(function(user) {
   // alert('here')
   if(screen.width < 500){
    document.getElementById("myimg").width = screen.width - 40;
    document.getElementById("myimg").height = screen.width - 40;
   }
   //if(location)
   document.getElementById("headDiv").width = screen.width
  if (user) {
      if(location.href == 'https://www.thrmpage.com/pages/basepage.html'){
          location.replace('https://www.thrmpage.com/pages/index.html')
      }
      imgA = document.getElementById("profPic");
	uid = firebase.auth().currentUser.uid
	//alert('here too')
	db.collection("users").where("uid", "==", uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            yourName = doc.data().name
            yourFireId = doc.id
            if(doc.data().notification.likes.nseen.length >= 1 || doc.data().notification.follows.nseen.length >= 1 || doc.data().notification.comments.nseen.length >= 1){
             //   imgA.style.borderColor = "orange"
            }
             //displaying the image
            if(doc.data().googleAuth){
                imgA.src = doc.data().img;
                document.getElementById("profPic").style.height = String(document.getElementById("CorpImg").height - 4 + "px")
                document.getElementById("profPic").style.width = String(document.getElementById("CorpImg").height - 4 + "px")
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
                imgA.src = url;
                document.getElementById("profPic").style.height = String(document.getElementById("CorpImg").height - 4 + "px")
                document.getElementById("profPic").style.width = String(document.getElementById("CorpImg").height - 4 + "px")
                });
            }
		})})
	}else{
	   // alert('hello')
 	  //setTimeout(function(){
	   if(location.href == 'https://www.thrmpage.com/pages/index.html' || location.href == 'https://www.thrmpage.com/'){
	       //alert('here')
            location.replace("../pages/basepage.html");    
    	}
 	  //},200)
  }
})
}




function homepage(){
	location.replace("../pages/index.html"); 
}

function selectiveRan(arg){
    responsiveVoice.cancel();
  clearInterval(pauseInterval)
  var whichMemeWeShouldDisplay = 0;
    isRunning = true;

     if(arg != null){
      random1 = arg;
     }
    genMeme();
setTimeout(function(){
    console.log("Made it to start " + random1)
    imgMeme.style.display = "inline-block"
  db.collection("memeInfo").where("id", "==", String(random1))
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          gMeme = [];
          memeFireId = doc.id;
          currentMemeId = doc.data().id;
          currentMemeTags = doc.data().tags;
          memeName = doc.data().name;
            currentCreator = doc.data().creator;
          //resets all response images over meme
          alignResponseElements("!");
          if(viewCount >= 5 && location.href == "https://www.thrmpage.com/pages/basepage.html"){
              console.log('please login to continue');
                    Swal.fire({
                      title: 'Login or Signup to Continue',
                      text: 'please login or signup to continue',
                      type: 'success',
                      background: '#1e1e1e',
                    })
                    .then(clicked => {
                        location.replace("https://www.thrmpage.com/pages/signup.html");
                    });                 
              //break
          }else{
          if(memeName == ""){
            if(alternation){
              whichMemeWeShouldDisplay = 2
              createGMeme("canvasImage");
              alternation = false;
            }else{
              whichMemeWeShouldDisplay = 3
              createGMeme("canvasImage2");
              alternation = true;
            }
          }else{
            whichMemeWeShouldDisplay = 1
            memeDisplay(doc.data());
          }
        //sets image to hrm face and waits 2 sec until starting
        displayMeme(0)
        setTimeout(function(){
          displayMeme(whichMemeWeShouldDisplay)
          responsiveVoice.speak(doc.data().text, "UK English Male", {onstart: function(){
              viewCount++
            if(screen.width <= img2.width){img2.width = screen.width - 10; img2.style.height = "auto" }
            if(screen.width <= canvasImage2.width){canvasImage2.width = screen.width - 10; canvasImage2.style.height = "auto" }
            if(screen.width <= canvasImage.width){canvasImage.width = screen.width; canvasImage.style.height = "auto"}

            if(screen.height <= img2.height){img2.height = screen.height - 10; img2.style.width = "auto"}
            if(screen.height <= canvasImage2.height){canvasImage2.height = screen.height - 10; canvasImage2.style.width = "auto"}
            if(screen.height <= canvasImage.height){canvasImage.height = screen.height - 10; canvasImage.style.width = "auto"}           
            
            likeMeter.innerHTML = doc.data().likes + "🔥"
          checkForStuff(doc.data())
          sDoc = doc.data();
          //playGenericMusic.volume = 0.05;
          //  playGenericMusic.play();
          //PLAY BACK AUDIO
          memeInterval = setInterval(function(){
          if($.mbAudio.players.back == undefined){
            $.mbAudio.play('back', 'full',console.log('WOW'))
            setTimeout(function(){
            // $.mbAudio.play('back', 'full',console.log('WOW2'))
            setTimeout(function(){
            $.mbAudio.setVolume('back','0.3')
            },300)
            },400)
           console.log('bad')
          }else{
              console.log('good')
          }
          },1000)
          //$.mbAudio.setVolume('back','0.3')
        //   if(justStarted){
        //   $.mbAudio.play('back', 'full')
        //   $.mbAudio.setVolume('back','0.5')
        //   // setInterval(function(){$.mbAudio.setVolume('back','0.5')},500)
        //   justStarted = false;
        //   }
          },onend: function(){
            //alert('here1')
            likeMeter.innerHTML = "🔥🔥🔥" 
            selectiveRan(null)
          }})
        },1500)
        }
        })
      })
},1000)
}


//imgTypes = [img,img1,img2,img3,img4];
function displayMeme(type){ 
  if(type == 0){
     //PLAY BEEP AUDIO
   // dingAudio.volume = 0.3
   // dingAudio.play()
   $.mbAudio.play('beep', 'full')
   setTimeout(function(){$.mbAudio.setVolume('beep','0.3')},100)
  }else{    
      //PAUSE BEEP AUDIO
   // dingAudio.pause()
   $.mbAudio.pause('beep')
  }
  for (var i = 0; i < imgTypes.length; i++) {
    if(type != -1){
      if(imgTypes[i] == imgTypes[type]){
        imgTypes[i].style.height = universalHeight;
        imgTypes[i].style.display = "inline-block";
      }else{
        imgTypes[i].style.height = "0px";
        imgTypes[i].style.display = "none";
      }
    }else{
      imgTypes[i].style.height = "0px";
      imgTypes[i].style.display = "none";      
    }
  }
}
// function checkStopKey(){
//   if()
// }
function playStopSwitcher(){
  if(play){
    stopRan()
    startElement.innerHTML = "play"
    play = false
  }else{
    startElement.innerHTML = "pause"
    selectiveRan(null)
    play = true
  }
}
function checkForStuff(doc){
  document.body.onkeyup = function(e){
    //hit space bar
    if(e.keyCode == 32){
      if(isRunning){
        stopRan()
      }else{
        runRan()
      }
      //console.log("hitting stop")
    }
  	//hit up arrow
    if(e.keyCode == 38 || e.keyCode == 87){
    	if(doc == null){
    		console.log("that's not right! LIKE")
    	}else{
      		console.log("liked " + doc.name + "!")
                    
          if(doc.name == ""){
            console.log("HERE IN LIKED")
            alignResponseElements("0")
          }else{
            alignResponseElements(0)
          }
        //MEME LIKING NUMBERS
          //for yourNumLiked, get current val first
        	db.collection("users").where("uid", "==", uid)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                	yourNumLiked = doc.data().totalLikes
                  console.log("USER PREF SAVED")
                  userPref = doc.data().pref
                  parseInt(yourNumLiked)
                  console.log(doc.data())
                  // memeLikedId = [doc.data().yourLikes]
                  for (var i = 0; i < doc.data().yourLikes.length; i++) {
                    memeLikedId.push(doc.data().yourLikes[i])
                    //alert(memeLikedId)
                  }
                  //usersLikedId
                  usersLikedId.push(doc.data().uid)
                  //alert(doc.data().totalLikes)
                })
            })
          // Upload to server will be in with memeNumLiked because we need to call a timeout function cuz firebase is soo fucking slow
          //for memeNumLiked, get current val first
          db.collection("memeInfo").where("id", "==", String(random1))
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  // alert("made it here")
                  memeNumLiked = doc.data().likes
                  //alert(memeNumLiked)
                  parseInt(memeNumLiked)
                  //need this so that we can figure out what meme this is by doc.id
                  memeFireId = doc.id
                  String(memeFireId)
                  //then add one to it  
                  //alert(memeNumLiked + " that is memeNum and this is yourNum: " + yourNumLiked)
                  yourNumLiked++;
                  memeNumLiked++; 
                  var uploadMab = true
                  for (var i = 0; i < doc.data().usersLiked.length; i++) {
                    if(doc.data().usersLiked[i] == uid){
                      // alert("WOWZERS")
                      uploadMab = false
                    }
                  }
                  if(uploadMab){
                    likeMeter.innerHTML = memeNumLiked + "🔥"
                  }
                //   memeLikedId.push(doc.data().id)
                //   //add all of usersLikedId

                //   for (var i = 0; i < doc.data().usersLiked.length; i++) {
                //     usersLikedId.push(doc.data().usersLiked[i])
                //   //alert(usersLikedId)
                //   }
                  //usersLikedId = []
                  //alert(memeNumLiked + " that is memeNum and this is yourNum: " + yourNumLiked)
                  // Upload ALL to server
                  if(uploadMab){
                      setTimeout(function(){
                         // tagsArrangment();
                         // alert("Made it here. " + "memeLiked: " + memeNumLiked + ". yourNum:" + yourNumLiked)
                         // alert(memeFireId)
                         //console.log("GOT HERE")
                         
                         
                  		// db.collection("users").doc(currentCreator).update({
                    //         notification.likes.nseen: firebase.firestore.FieldValue.arrayUnion(yourName + " has liked a recent post")   
                    //     })
                            
                        // 	db.collection("users").where("uid", "==", memeFireId)
                        //         .get()
                        //         .then(function(querySnapshot) {
                        //             querySnapshot.forEach(function(doc) {
                                        
                        //             })
                        //     })
                        
        
        
                          db.collection("memeInfo").doc(memeFireId).update({
                            likes: doc.data().id
                          }) 
                          db.collection("memeInfo").doc(memeFireId).update({
                            usersLiked: usersLikedId
                          }) 
                          db.collection("users").doc(yourFireId).update({
                            totalLikes: yourNumLiked
                          }) 
                          db.collection("users").doc(yourFireId).update({
                            yourLikes: doc.data().id
                          })   
                          console.log("User's Return: " + usersLikedId)
                          console.log("Meme's Return: " + memeLikedId)
                      },500) 
                }
                })
            })
      //UPDATING PREFERENCES
        //looking at all of the tags that were in the meme
        setTimeout(function(){
          for (var i = 0; i < currentMemeTags.length; i++) {
            //all of the tags from the user
            if(Object.keys(userPref).length == 0){
              // alert("here" + currentMemeTags[i])
                userPref[String(currentMemeTags[i])] = 1;
                console.log(userPref)
                console.log(currentMemeTags[i] + " and i: " + i)
            }else{
              //console.log("greater than 0")
              numOfRuns = -1;
              for (var prefVal in userPref) {
                //console.log("made it here " + currentMemeTags[i] + " and prefVal " + prefVal)
                numOfRuns++;
                //if they are the same thing
                //console.log("this is x:" + x + " and this is the tag combo: " + currentMemeTags);
                if(String(currentMemeTags[i]) == String(prefVal)){
                  console.log("this is prefVal:" + prefVal + " and this is the tag combo: " + currentMemeTags);
                  userPref[String(currentMemeTags[i])] = userPref[String(currentMemeTags[i])] + 1;
                  break
                }else if(numOfRuns == Object.keys(userPref).length - 1){
                  console.log("no results for " + currentMemeTags[i])
                  userPref[String(currentMemeTags[i])] = 1;
                }
              }
            }
          }
          console.log(userPref)
            db.collection("users").doc(yourFireId).update({
              pref: userPref
            })            
        },500)
    	}
    }
    //hit right arrow
	if(e.keyCode == 39 || e.keyCode == 68){
    	if(doc == null){
    		console.log("that's not right! SKIPPED")
    	}else{
      		console.log("Skipped " + doc.name + "!")
          if(doc.name == ""){
            console.log("HERE IN SKIPPED")
            alignResponseElements("1")
          }else{
            alignResponseElements(1)
          }
      	    // db.collection("users").doc(uid).update({
      	    selectiveRan(null);
      	    // })
    	}
	}
    //hit left arrow
	if(e.keyCode == 37 || e.keyCode == 65){
    	if(name == null){
    		console.log("that's not right! BACK")
    	}else{
      		console.log("Back " + doc.name + "!")
      	    // db.collection("users").doc(uid).update({
      	    // pastMemes.pop();
      	    selectiveRan(pastMemes[pastMemes.length - 2]);
      	    // })
    	}
	}
}
}
function genMeme(){
	//get id to use for highest possible val
	if(ceiling == 0){
        db.collection("universalId").doc("THEONLYONE")
        .onSnapshot(function(doc) {
            ceiling = doc.data().id;
            console.log("ceiling in dbCollection: " + doc.data().id)
            //use random for the random document getting
            getRand1()
            console.log(random1)
        });
    }else{
            getRand1()
            console.log(random1)
        }
    }
function getRand1(){
    var dead = false;
    if(deletedList.length == 0){
    db.collection("universalId").doc("Deleted")
        .onSnapshot(function(doc) {
            //DELETED SECTION THING
            deletedList = doc.data().deleted;
            run()
            //alert(deletedList + " and " + doc.data().deleted)
            console.log("ceiling in dbCollection: " + doc.data().id)
        });
    }else{
        run()
    }
        function run(){
            dead = false
            random1 = Math.floor(Math.random() * (ceiling)); 
            for(var i = 0; i < deletedList.length; i++){
                if(String(deletedList[i]) == String(random1)){
                    dead = true
                }
            }
            if(dead){
                //alert('detected deleted value. Ceiling: ' + ceiling)
                run()
            }else{
            	pastMemes.push(random1)
            	if(pastMemes.length > 50){
            		pastMemes.shift()
            	}
                deletedList.push(random1)
            }
        }
}
function memeDisplay(doc){
	    //displaying the image
       	storageRef.child('memes/' + doc.name).getDownloadURL().then(function(url) {
		// This can be downloaded directly:
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'blob';
		xhr.onload = function(event) {
		var blob = xhr.response;
		};
		xhr.open('GET', url);
		xhr.send();
		urlA = url
		img2.src = url;
		});
}
function stopRan(){
  //setting isRunning to false
  isRunning = false;
  paused = true
  // clear all canvases
  var canvasClearing = document.querySelector('#canvasImage');
  var canvasGone = canvasClearing.getContext('2d');
  canvasGone.clearRect(0, 0, canvasClearing.width, canvasClearing.height);
  var canvasClearing2 = document.querySelector('#canvasImage2');
  var canvasGone2 = canvasClearing2.getContext('2d');
  canvasGone2.clearRect(0, 0, canvasClearing2.width, canvasClearing2.height);	
  //clearing images
  displayMeme(0)
	//clearing sound
	//waiting_audio.pause();
	clearInterval(memeInterval)
  pauseInterval = setInterval(function(){
      justStarted = true;
      //PAUSE BACK AUDIO
       $.mbAudio.pause('back')
      //PAUSE BEEP AUDIO
       $.mbAudio.pause('beep')
  //playGenericMusic.pause();
 // waiting_audio.pause()
//   responsiveVoice.speak("", "UK English Male")
    responsiveVoice.cancel();
  },200)
	//displaying cleared
	//displayText.innerHTML = "stopped";
  return undefined
}
function memeFormatting(){
	if(img.src == "" && img2.src == ""){
		//alert("wow!");
	}
}
//for getting the values from the keys of objects
function getKeyData(data){
  var value = [];
  for(key in data) {
      if(data.hasOwnProperty(key)) {
          value.push(data[key]);
          //do something with value;
      }
  }
  return value
}
//setting to full screen
function resize(){
  if (projector.requestFullscreen) {
    projector.requestFullscreen();
  } else if (projector.mozRequestFullScreen) { /* Firefox */
    projector.mozRequestFullScreen();
  } else if (projector.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    projector.webkitRequestFullscreen();
  } else if (projector.msRequestFullscreen) { /* IE/Edge */
    projector.msRequestFullscreen();
  }
  setTimeout(function(){
    img.style.height = screen.height + "px";
    img2.style.height = screen.height + "px";
    universalHeight = screen.height + "px";
  },1000)
  // img.width = auto;
  // img2.width = auto
document.addEventListener("fullscreenchange", (event) => {
  if (document.fullscreenElement == null) {
    // The browser is in full-screen mode, with document.fullscreenElement
    // being the element presented full-screen.
    img.style.height = "55.555555555%";
    img2.style.height = "55.555555555%"; 
    universalHeight = "55vh";
  }
});
}
//for placing skip and like icons when liked
function alignResponseElements(num){
  //! is to clear all values
  if(num == "!"){
      for (var i = 5 - 1; i >= 0; i--) {
        if(responseImg[i] != undefined){
        responseImg[i].style.display = "none"
        }
      }
  }else{
    if(num == "0" || num == "1"){
      //WOW
      //console.log(responseImg[parseInt(num)])
      responseImg[String(num)].style.display = "inline"
      // alert(img3.onload)
      // img4.onload = function(){

      // }
      // alert("img4.onload")
      // gCtx.drawImage(responseImg[String(num)], gImgObj.width/2 - responseImg[String(num)].width, gImgObj.height/2 - responseImg[String(num)].height);
    }else{
      //this is for centering the image onto it
      responseImg[num].style.display = "inline"
      responseImg[num].style.left = (secondMyImg.getBoundingClientRect().width/2 + secondMyImg.getBoundingClientRect().x - responseImg[num].width/2
      ) + "px"
      responseImg[num].style.top = (secondMyImg.getBoundingClientRect().height/2 + secondMyImg.getBoundingClientRect().y - responseImg[num].height/2
      ) + "px"
      setTimeout(function(){
          responseImg[num].style.display = "none"
      },1000)
    }
  } 
}

// function initiateCanvas(type){
//   //create the meme data (or retrieve it to be more specific)
//   createGMeme()
//   console.log("HERE2")
// }

function createGMeme(which){
  console.log("HERE A")
  //setTimeout(function(){
   db.collection("memeInfo").where("id", "==", String(random1))
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
             db.collection("memeInfo").doc(doc.id).collection("MIMG")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  //alert(doc.data())
                  // alert("here")
                  //console.log(doc.data().Coordinates[0].fontSize)
                  //alert('createGMeme alert')
                  //likeMeter.innerHTML = doc.data().likes + "🔥" 
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
                  console.log("HERE B")
                  //console.log(doc.data().BaseIMG)
                  initCanvas(doc.data().BaseIMG, which);
                })
            })
        })
    })
  //},1500) 
  //console.log("HERE3")
} 

//CODE FOR DISPLAYING THE EDITED IMAGE TO THE USER

function initCanvas(link,which) {
  console.log("HERE C")
  var canvas = document.querySelector('#' + String(which));
  gCtx = canvas.getContext('2d');
  gCtx.clearRect(0, 0, canvas.width, canvas.height);
  gImgObj = new Image();
   // console.log(link)
    //alert(gMeme[0])
      gImgObj.src = link;
      gImgObj.onload = function () {
          canvas.width = gImgObj.width;
          canvas.height = gImgObj.height;
          drawCanvas();
      };
  //console.log("HERE4")
}

function drawCanvas() {
  //alert(gMeme)
    gCtx.drawImage(gImgObj, 0, 0);
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
  console.log("HERE D")
}

function drawTxt(txt) {
    gCtx.font = txt.size + 'px' + ' ' + txt.fontFamily;
    gCtx.textAlign = txt.align;
    gCtx.fillStyle = txt.color;
    gCtx.fillText(txt.text, txt.x, txt.y);
}


document.getElementById("likeMeter").addEventListener("click", function(){


    	if(sDoc == null){
    		console.log("that's not right! LIKE")
    	}else{
      		console.log("liked " + sDoc.name + "!")
          if(sDoc.name == ""){
            console.log("HERE IN LIKED")
            alignResponseElements("0")
          }else{
            alignResponseElements(0)
          }
        //MEME LIKING NUMBERS
          //for yourNumLiked, get current val first
        	db.collection("users").where("uid", "==", uid)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {

                	yourNumLiked = doc.data().totalLikes
                  console.log("USER PREF SAVED")
                  userPref = doc.data().pref
                  parseInt(yourNumLiked)
                  console.log(doc.data())
                  // memeLikedId = [doc.data().yourLikes]
                //   for (var i = 0; i < doc.data().yourLikes.length; i++) {
                //     memeLikedId.push(doc.data().yourLikes[i])
                //     //alert(memeLikedId)
                //   }
                  //usersLikedId
                  usersLikedId.push(doc.data().uid)
                  //alert(doc.data().totalLikes)
                })
            })
          // Upload to server will be in with memeNumLiked because we need to call a timeout function cuz firebase is soo fucking slow
          //for memeNumLiked, get current val first
          db.collection("memeInfo").where("id", "==", String(random1))
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  // alert("made it here")
                  memeNumLiked = doc.data().likes
                  //alert(memeNumLiked)
                  parseInt(memeNumLiked)
                  //need this so that we can figure out what meme this is by doc.id
                  memeFireId = doc.id
                  //String(memeFireId)
                  //then add one to it  
                  //alert(memeNumLiked + " that is memeNum and this is yourNum: " + yourNumLiked)
                  yourNumLiked++;
                  memeNumLiked++; 
                  var uploadMab = true
                  for (var i = 0; i < doc.data().usersLiked.length; i++) {
                    if(doc.data().usersLiked[i] == uid){
                      // alert("WOWZERS")
                      uploadMab = false
                    }
                  }
                  if(uploadMab){
                    likeMeter.innerHTML = memeNumLiked + "🔥"
                  }
                  memeLikedId.push(doc.data().id)
                  //add all of usersLikedId

                  for (var i = 0; i < doc.data().usersLiked.length; i++) {
                    usersLikedId.push(doc.data().usersLiked[i])
                  //alert(usersLikedId)
                  }
                  //usersLikedId = []
                  //alert(memeNumLiked + " that is memeNum and this is yourNum: " + yourNumLiked)
                  // Upload ALL to server
                  if(uploadMab){
                      setTimeout(function(){
                         // tagsArrangment();
                         // alert("Made it here. " + "memeLiked: " + memeNumLiked + ". yourNum:" + yourNumLiked)
                         // alert(memeFireId)
                         //console.log("GOT HERE")
                      		db.collection("users").doc(currentCreator).update({
                                'notification.likes.nseen': firebase.firestore.FieldValue.arrayUnion(yourName + " has liked a recent post")   
                            })
                          db.collection("memeInfo").doc(memeFireId).update({
                            likes: doc.data().id
                          }) 
                          db.collection("memeInfo").doc(memeFireId).update({
                            usersLiked: usersLikedId
                          }) 
                          db.collection("users").doc(yourFireId).update({
                            totalLikes: yourNumLiked
                          }) 
                          db.collection("users").doc(yourFireId).update({
                            yourLikes: doc.data().id
                          })   
                          console.log("User's Return: " + usersLikedId)
                          console.log("Meme's Return: " + doc.data().id)
                      },500) 
                }
                })
            })
      //UPDATING PREFERENCES
        //looking at all of the tags that were in the meme
        setTimeout(function(){
          for (var i = 0; i < currentMemeTags.length; i++) {
            //all of the tags from the user
            if(Object.keys(userPref).length == 0){
              // alert("here" + currentMemeTags[i])
                userPref[String(currentMemeTags[i])] = 1;
                console.log(userPref)
                console.log(currentMemeTags[i] + " and i: " + i)
            }else{
              //console.log("greater than 0")
              numOfRuns = -1;
              for (var prefVal in userPref) {
                //console.log("made it here " + currentMemeTags[i] + " and prefVal " + prefVal)
                numOfRuns++;
                //if they are the same thing
                //console.log("this is x:" + x + " and this is the tag combo: " + currentMemeTags);
                if(String(currentMemeTags[i]) == String(prefVal)){
                  console.log("this is prefVal:" + prefVal + " and this is the tag combo: " + currentMemeTags);
                  userPref[String(currentMemeTags[i])] = userPref[String(currentMemeTags[i])] + 1;
                  break
                }else if(numOfRuns == Object.keys(userPref).length - 1){
                  console.log("no results for " + currentMemeTags[i])
                  userPref[String(currentMemeTags[i])] = 1;
                }
              }
            }
          }
          console.log(userPref)
            db.collection("users").doc(yourFireId).update({
              pref: userPref
            })            
        },500)
    	}

    
})

document.getElementById("secondMyImg").addEventListener("click", function(){
    	if(sDoc == null){
    		console.log("that's not right! SKIPPED")
    	}else{
      		console.log("Skipped " + sDoc.name + "!")
          if(sDoc.name == ""){
            console.log("HERE IN SKIPPED")
            alignResponseElements("1")
          }else{
            alignResponseElements(1)
          }
      	    // db.collection("users").doc(uid).update({
      	    selectiveRan(null);
      	    // })
    	}    
})
document.getElementById("canvasImage").addEventListener("click", function(){
    	if(sDoc == null){
    		console.log("that's not right! SKIPPED")
    	}else{
      		console.log("Skipped " + sDoc.name + "!")
          if(sDoc.name == ""){
            console.log("HERE IN SKIPPED")
            alignResponseElements("1")
          }else{
            alignResponseElements(1)
          }
      	    // db.collection("users").doc(uid).update({
      	    selectiveRan(null);
      	    // })
    	}    
})
document.getElementById("canvasImage2").addEventListener("click", function(){
     	if(sDoc == null){
    		console.log("that's not right! SKIPPED")
    	}else{
      		console.log("Skipped " + sDoc.name + "!")
          if(sDoc.name == ""){
            console.log("HERE IN SKIPPED")
            alignResponseElements("1")
          }else{
            alignResponseElements(1)
          }
      	    // db.collection("users").doc(uid).update({
      	    selectiveRan(null);
      	    // })
    	}   
})

