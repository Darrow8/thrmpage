//alert('YUP')
// get elements
var uploadManual = document.getElementById("uploadManual");
var uploadText = "";
var uploadTextArr = [];
var errorText = document.getElementById("errorText");
//var copyImg = document.getElementById("copyImg");
var imgA = document.getElementById("profPic");
//var chosenTags = localStorage.getItem("chosenTags");
// variable for id
var idVar = null;
var idTag = null;
var chosenT;
var memeIdArr;
var memeNumRn;
var TextVals = [];
var CoorVals = [];
var BIMG = localStorage.getItem("GimgFromMeme");

// //REQUIRED FOR ALL PAGE DOCS
// function openFile(event) {
//     //var input = event.target;
//     var reader = new FileReader();
//     reader.onload = function(){
//       var dataURL = reader.result;
//       copyImg = document.getElementById("copyImg");
//       copyImg.src = dataURL;
//     };
//     reader.readAsDataURL(event.files[0]);
//   };


 // document.getElementById("uploadManual").addEventListener("change", function() {
 //     openFile(uploadManual);
 // })
//REQUIRED FOR ALL PAGE DOCS
function onstart(){
    //loading profile image
    imgA = document.getElementById("profPic");
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var uid = firebase.auth().currentUser.uid
        db.collection("users").where("uid", "==", uid)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                 //displaying the image
                if(doc.data().googleAuth){
                    imgA.src = doc.data().img
                    document.getElementById("profPic").style.height = String(document.getElementById("CorpImg").style.height - 4 + "px")
                    document.getElementById("profPic").style.width = String(document.getElementById("CorpImg").style.height - 4 + "px")
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
        }})
}

function uploadManY(){
 var user = firebase.auth().currentUser;
 if (user) {
    if(chosenTags.length > 0){
       // User is signed in.
       errorText = document.getElementById("errorText");
     uploadManual = document.getElementById("uploadManual");
        //get the upload text
        for (var i = 0; i < document.getElementsByClassName("theRealText").length; i++) {
            uploadText += document.getElementsByClassName("theRealText")[i].value + " "
            uploadTextArr.push(document.getElementsByClassName("theRealText")[i].value)
        }
        ////alert(uploadText)
     //Get the id for the meme
     db.collection("universalId").doc("THEONLYONE").get().then(function(doc) {
             idVar = doc.data().id
                //alert(idVar)
                //alert(doc.data().id)
                console.log(doc.data())
            });
        //Get the tag for the meme
        db.collection("universalId").doc("THETAGSONE").get().then(function(doc) {
                idTag = doc.data().id
                // //alert(doc.data().id + " : ln 94 - THETAGSONE Doc id")
            });
     // //Storage ref
     // var ref = firebase.storage().ref('MIMG/' + uploadManual.files[0].name)
     // //Upload
     // ref.put(uploadManual.files[0]).then(function(snapshot) {
     //   console.log('Uploaded a blob or file!');
     // });
        setTimeout(function(){
        //add MemeInfo
        db.collection('memeInfo').add({
            id: String(idVar),
            name: "",
            timestamp: Date.now(),
            type: "MIMG",
            text: uploadText,
            creator: user.uid,
            likes: 0,
            tags: chosenTags,
            usersLiked: [],

        }) 
        findAllValues()
        //alert("here...")
        setTimeout(function(){
            //alert("here?" + idVar)
            db.collection("memeInfo").where("id", "==", String(idVar))
            .get().then(function(querySnapshot) {
            querySnapshot.forEach(function(file) {
                     // setTimeout(function(){
                    db.collection('memeInfo').doc(file.id).collection('MIMG').doc("A").set({
                        // BCS: {
                        //     Brightness: 0,
                        //     Contrast: 0,
                        //     Noise: 0,
                        //     Saturation: 0,
                        //     Sharpen: 0
                        // },
                        BaseIMG: localStorage.getItem("GimgFromMeme"),
                        // CompImg: {
                        //     faceA: null
                        // },
                        Coordinates: CoorVals,
                        Text: TextVals,
                    })  
                    // },500)           
                })
            })       
        setTimeout(function(){
            checkTagExists()    
            //get Idvar bigger for next meme upload
            console.log("idVar Before: " + idVar)
             idVar++;
            //send the upload of the idvar
            db.collection("universalId").doc("THEONLYONE").update({
             id: idVar
            })
                // copyImg.src = "";
             errorText.innerHTML = "Uploaded!"
             console.log()
             ////alert("UPLOADED!")
             setTimeout(function(){
                
                location.replace("../pages/homepage.html");
                //goToHomepage()
             },500)
        }, 500)  
        },1500)
        }, 200)
    }else{
        console.log("Error, no tags")
        errorText.innerHTML = "Please add tags (Related keywords) to your meme first."
    }
 } else {
   // No user is signed in.
   errorText.innerHTML = "You cannot upload or create a meme until you have signed in."
 }
};
//to check that the tags gotten from search.js are real tags
var running = true
//var isTag = true
var chosenTagVal = 0;
var newNeededTags = [];
var oldNeededTags = [];
var afor = 0;
function checkTagExists(){
    if(afor != chosenTags.length){
        console.log(chosenTags[afor])
        db.collection("tags").where("name", "==", chosenTags[afor])
        .get()
        .then(function(querySnapshot) {
            setTimeout(function(){
                if(querySnapshot.docs.length == 0){
                    setTimeout(function(){
                        console.log("Couldn't Find Tag " + chosenTags[afor] + " " + afor)
                        newNeededTags.push(chosenTags[afor]) 
                        afor++
                        checkTagExists()
                    },100) 
                }else{
                    setTimeout(function(){
                        console.log("Found Tag " + chosenTags[afor] + " " + afor)
                        oldNeededTags.push(chosenTags[afor])
                        afor++
                        checkTagExists()
                    },100) 
                }
            },100)
            })
        }else{
                ////alert("here!")
                //finished getting all of the tags and filtering them
                for (var a = 0; a < newNeededTags.length; a++) {
                        db.collection("tags").add({
                                id: String(idTag),
                                name: newNeededTags[a],
                                timestamp: Date.now(),
                                numOfMemes: 1,
                                memeId: [idVar],
                                pageVisits: 0,
                                usersLiked: [],
                        })
                        //get idTag bigger for the next tag creations
                        idTag++;
                        db.collection("universalId").doc("THETAGSONE").update({
                            id: idTag
                        })  
                }
                for (var b = 0; b < oldNeededTags.length; b++) {
                    db.collection("tags").where("name", "==", oldNeededTags[b])
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                memeNumRn = doc.data().numOfMemes;
                                memeNumRn++
                                //Get the meme id for this tag
                                ////alert(doc.data().memeId)
                                ////alert(idVar)
                                memeIdArr = doc.data().memeId;
                                memeIdArr.push(idVar)
                                ////alert(newUid + " This is the ID of the newUID or the latest ID being added")
                                db.collection("tags").doc(doc.id).update({
                                    numOfMemes: memeNumRn,
                                    memeId: memeIdArr
                                })
                            })
                        })
                }
        }
    }


//if there is no tag for this, make a new one
function makeNew(){
    ////alert("here1")
    setTimeout(function(){
        ////alert(chosenTags[chosenTagVal])
        db.collection("tags").add({
                id: String(idTag),
                name: chosenTags[chosenTagVal],
                timestamp: Date.now(),
                numOfMemes: 1,
                memeId: [idVar],
                pageVisits: 0,
                usersLiked: [],
        })
        //get idTag bigger for the next tag creations
        idTag++;
        db.collection("universalId").doc("THETAGSONE").update({
            id: idTag
        })  
        chosenTagVal++
    },300) 
    ////alert("made New with name of: " + chosenTags[chosenTagVal])
    // goToNext = true
}
//if there already is a tag, add one to it
function addOld(doc){
    ////alert("here2")
    setTimeout(function(){
        memeNumRn = doc.data().numOfMemes
        memeNumRn++
        //Get the meme id for this tag
        memeIdArr = doc.data().memeId
        memeIdArr.push(idVar)
        ////alert(newUid + " This is the ID of the newUID or the latest ID being added")
        db.collection("tags").doc(doc.id).update({
            numOfMemes: memeNumRn,
            memeId: memeIdArr
        })
        chosenTagVal++
    },300) 
    // goToNext = true
}
function goToHomepage(){
    location.replace("../pages/homepage.html");
}
function goToLogin(){
  location.replace("../pages/login.html");
}
function goToSignup(){
 //setTimeout(function() {
    location.replace("../pages/signup.html");
   //}, 1000);
}
function goToFeed(){
    location.replace("../pages/index.html");
}
function goToUpload(){
    location.replace("../pages/upload.html");
}
// align: "center",
// color: "#000000"
// font-size: 40,
// x-pos: 0,
// y-pos: 0,
// font-style: "Tahoma"
//document.getElementsByClassName("theRealText")[0].value
function findAllValues(){
    for (var i = 0; i < document.getElementsByClassName("theRealText").length; i++) {
        if(document.getElementsByClassName("theRealText")[i].value == ""){
            TextVals.push(document.getElementsByClassName("theRealText")[i].placeholder)
        }else{
            TextVals.push(document.getElementsByClassName("theRealText")[i].value)
        }
        var a = {
            'align': document.getElementsByClassName("textAlign")[i].value,
            'color': document.getElementsByClassName("fontColor")[i].value,
            'fontSize': document.getElementsByClassName("fontSize")[i].value,
            'xPos': document.getElementsByClassName("x-pos")[i].value,
            'yPos': document.getElementsByClassName("y-pos")[i].value,
            'fontStyle': document.getElementsByClassName("fontFamily")[i].value
        }
        CoorVals.push(a)
    }
    uploadText = TextVals.join(' ')
}


