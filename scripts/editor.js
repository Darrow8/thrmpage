var imgA = document.getElementById("img");
var imgEnter = document.getElementById("imgEnter");
var username = document.getElementById("username");
var usernameInput = document.getElementById("usernameInput");
var imgB = document.getElementById("profPic");
var doneText = document.getElementById("doneText");
//REQUIRED FOR ALL LARGE DOCS
function home(){
    firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
        var uid = firebase.auth().currentUser.uid
        db.collection("users").where("uid", "==", uid)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                alert(doc.data().name)
        localStorage.setItem("searchKey", doc.data().name);
    })})}})
    location.replace("../pages/homepage.html");
}
function goBack(){
	location.replace("../pages/homepage.html");
}
//REQUIRED FOR ALL PAGE DOCS
function onstart(){
//imgA = document.getElementById("profPic");
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
                imgA.src = doc.data().img;
                imgB.src = doc.data().img;
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
                imgB.src = url;
                document.getElementById("profPic").style.height = String(document.getElementById("CorpImg").height - 4 + "px")
                document.getElementById("profPic").style.width = String(document.getElementById("CorpImg").height - 4 + "px")
                });
            }
		})})
	}})
}
function memeDisplay(doc){
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
		img.src = url;
		});
}


function getCurrent(){
	onstart()
firebase.auth().onAuthStateChanged(firebaseUser =>{
if(firebaseUser){
	console.log("working")
	uid = firebase.auth().currentUser.uid
	db.collection("users").where("uid", "==", uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data().img)
            username.placeholder = doc.data().name
            memeDisplay(doc.data())

        })});
}else{
	console.log("you are not logged in")
}})
}

 document.getElementById("imgEnter").addEventListener("change", function() {
 	openFile(imgEnter);
 })
function setName(){
	var user = firebase.auth().currentUser;
	if (user) {
		db.collection("users").where("uid", "==", user.uid)
	    .get()
	    .then(function(querySnapshot) {
	        querySnapshot.forEach(function(doc) {
	        	var newName = doc.data().name

	        })});		
	}else{
		console.log("You are not logged in")
	}
}
function openFile(event) {
    //var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      img.src = dataURL;
    };
    reader.readAsDataURL(event.files[0]);
  };
function uploadMan(){
	var user = firebase.auth().currentUser;
	if (user) {
		console.log("here1")
	  // User is signed in.
	imgEnter = document.getElementById("imgEnter");
	username = document.getElementById("username");
	//Storage ref
	if(imgEnter.files[0] != null){
	var ref = firebase.storage().ref('profile/' + imgEnter.files[0].name)
	console.log("here2")
	//Upload
	ref.put(imgEnter.files[0]).then(function(snapshot) {
	  console.log('Uploaded a blob or file!');
	  console.log("here3")
	});
	}
	// //Set profile pic on firestory
	// db.collection("users").where("uid", "==", firebase.auth().currentUser.uid){
	// 	alert(doc.data())

 //    }
   db.collection("users").where("uid", "==", String(firebase.auth().currentUser.uid))
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        	if(doc.data().img != ""){
        		console.log("here4")
        	}
            // doc.data() is never undefined for query doc snapshots
            if(imgEnter.files[0] != null){
            db.collection("users").doc(doc.id).update({
            	img: imgEnter.files[0].name,
                googleAuth: false
            	
			})
			console.log("here5")
        	}
            db.collection("users").where("name", "==", usernameInput.value)
                .get()
                .then(function(querySnapshot) {
                    if(querySnapshot.empty){
                        if(usernameInput.value != ""){
                             db.collection("users").doc(doc.id).update({
                            	"name": usernameInput.value
                			})
                			.then(() =>  location.replace("../pages/homepage.html"))
                			doneText.innerHTML = "Succesfully Changed!"
                        }else{
                          doneText.innerHTML = "you have not entered a username, but your photo has been uploaded";
                          setTimeout(function(){location.replace('https://www.thrmpage.com/pages/homepage.html')},1000)
                        }
                    }else{
                        doneText.innerHTML = "This username is already being used";
                    }
            })       	
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

}};

var sendMail = function(){
    alert('good!')
}

