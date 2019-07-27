// get elements
var uploadManual = document.getElementById("uploadManual");
var uploadText = document.getElementById("uploadText");
var errorText = document.getElementById("errorText");
var copyImg = document.getElementById("copyImg");
var imgA = document.getElementById("profPic");
var chosenTags = localStorage.getItem("chosenTags");
// variable for id
var idVar = null;
var idTag = null;
var chosenT;
var memeIdArr;
var memeNumRn;
//choosing phase div
var choosingDiv = document.getElementById("choosing")
//manual upload phase div
var manualDiv = document.getElementById("manuallyUploading")

// // Get the modal
// var modal = document.getElementById('myModal');

// // // Get the button that opens the modal
//  var btn = document.getElementById("upload");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];


// // When the user clicks on <span> (x), close the modal
// btn.onclick = function() {
//   modal.style.display = "none";
// }

//REQUIRED FOR ALL LARGE DOCS
function home(){
    firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
        var uid = firebase.auth().currentUser.uid
        db.collection("users").where("uid", "==", uid)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                //alert(doc.data().name)
        localStorage.setItem("searchKey", doc.data().name);
    })})
    }})
    location.replace("../pages/homepage.html");
}
//REQUIRED FOR ALL PAGE DOCS
function onstart(){
    //for setting the choosing thing
    // modal.style.display = "block";
    // modal.width = screen.width
    // document.getElementsByClassName("modal-content").width = screen.width
    //loading profile image
    imgA = document.getElementById("profPic");
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var uid = firebase.auth().currentUser.uid
        db.collection("users").where("uid", "==", uid)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.data())
                 //displaying the image
                if(doc.data().googleAuth){
                imgA.src = doc.data().img
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
        }})
}
function openFile(event) {
    //var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      copyImg = document.getElementById("copyImg");
      copyImg.src = dataURL;
    };
    console.log(event.files[0])
    reader.readAsDataURL(event.files[0]);
  };


 document.getElementById("uploadManual").addEventListener("change", function() {
 	openFile(uploadManual);
 })
function uploadMan(){
	var user = firebase.auth().currentUser;
	if (user) {
	uploadManual.files[0].name = generateName(20);
    alert(uploadManual.files[0].name)
	  // User is signed in.
	  errorText = document.getElementById("errorText");
	uploadManual = document.getElementById("uploadManual");
	uploadText = document.getElementById("uploadText");
	if(uploadManual.files[0] != null){
	    if(uploadText.value != ""){
	        if(document.getElementById("officialTags").innerText != ""){
    	//Storage ref
    	var ref = firebase.storage().ref('memes/' + uploadManual.files[0].name)
    	//Upload
    	ref.put(uploadManual.files[0]).then(function(snapshot) {
    	  console.log('Uploaded a blob or file!');
    	});
    	//Get the id for the meme
    	db.collection("universalId").doc("THEONLYONE").get().then(function(doc) {
            	idVar = doc.data().id
                //alert(idVar)
                console.log(doc.data())
        //Get the tag for the meme
            db.collection("universalId").doc("THETAGSONE").get().then(function(doc) {
                    idTag = doc.data().id
                    // setTimeout(function(){
                    //add MemeInfo
                    db.collection("memeInfo").add({
                        id: String(idVar),
                        name: uploadManual.files[0].name,
                        timestamp: uploadManual.files[0].lastModified,
                        type: uploadManual.files[0].type,
                        text: uploadText.value,
                        creator: user.uid,
                        likes: 0,
                        tags: chosenTags,
                        usersLiked: []
                    }).then(function() {
                    // setTimeout(function(){
                    checkTagExists()    
                    //alert("here2")
                    //get Idvar bigger for next meme upload
                     idVar++;
                    //send the upload of the idvar
                    db.collection("universalId").doc("THEONLYONE").update({
                    	id: idVar
                    }).then(function() {
                        copyImg.src = "";
                    	errorText.innerHTML = "Uploaded!"
                       // setTimeout(function(){
                            goToHomepage()
                        //},500)
                        })
                    })
                })
            });
	        }else{
	            errorText.innerHTML = "please enter meme tags before uploading"
	        }
	    }else{
	        errorText.innerHTML = "please copy the text from your meme to the page before you may upload a meme"
	    }
    }else{
    	errorText.innerHTML = "please upload a meme."
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
                //alert("here!")
                //finished getting all of the tags and filtering them
                //for (var a = 0; a < newNeededTags.length; a++) {
                var a = 0;
                filterA()
                function filterA(){
                        db.collection("tags").add({
                                id: String(idTag),
                                name: newNeededTags[a],
                                timestamp: Date.now(),
                                numOfMemes: 1,
                                memeId: [idVar],
                                pageVisits: 0,
                                usersLiked: []
                        }).then(function() {
                            //get idTag bigger for the next tag creations
                            idTag++;
                            db.collection("universalId").doc("THETAGSONE").update({
                                id: idTag
                            }).then(function() {
                                if(a < newNeededTags.length){
                                    a++
                                    filterA()
                                    alert(a + " for a and " + newNeededTags.length)
                                }
                            })                             
                        })
                //}
                }
                var b = 0;
                function filterB(){
                //for (var b = 0; b < oldNeededTags.length; b++) {
                    db.collection("tags").where("name", "==", oldNeededTags[b])
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                memeNumRn = doc.data().numOfMemes;
                                memeNumRn++
                                //Get the meme id for this tag
                                memeIdArr = doc.data().memeId;
                                memeIdArr.push(idVar)
                                db.collection("tags").doc(doc.id).update({
                                    numOfMemes: memeNumRn,
                                    memeId: memeIdArr
                                }).then(function(){
                                    if(b < oldNeededTags.length){
                                        b++
                                        filterB()
                                        alert(b + " for b and " + oldNeededTags.length)
                                    }
                                })
                            })
                        })
                //}
                }
        }
    }






//if there is no tag for this, make a new one
function makeNew(){
    //alert("here1")
    setTimeout(function(){
        //alert(chosenTags[chosenTagVal])
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
    //alert("made New with name of: " + chosenTags[chosenTagVal])
    // goToNext = true
}
//if there already is a tag, add one to it
function addOld(doc){
    //alert("here2")
    setTimeout(function(){
        memeNumRn = doc.data().numOfMemes
        memeNumRn++
        //Get the meme id for this tag
        memeIdArr = doc.data().memeId
        memeIdArr.push(idVar)
        //alert(newUid + " This is the ID of the newUID or the latest ID being added")
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


function switchContent(){
    choosingDiv.style.display = "none";
    manualDiv.style.display = "block"
}


function generateName(len) {
    var length = len,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}


