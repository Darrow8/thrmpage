//Initialize Firebase
var userNum;
var uidReal;
//var signing = false;
var googleAuth = false;
// Get all elements
var em = document.getElementById("email");
var pass = document.getElementById("pword");
var pass2 = document.getElementById("pword2");
var login = document.getElementById("btnLogin");
var signup = document.getElementById("btnSignup");
var nm = document.getElementById("name");
//if(document.getElementById("btnSignout") != null){
var signout = document.getElementById("btnSignout");
var error = document.getElementById("error");
var imgA = document.getElementById("profPic");
var searchWords = localStorage.getItem("searchKey");
var accountsWithTheSameUid = 0;
var similarNames = false;
// var siteWidth = 1280;
// var scale = escreen.width /siteWidth
// document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'');
//REQUIRED FOR ALL LARGE DOCS
//alert(searchWords)
function home(){
	//searchWords = null
	localStorage.setItem("searchKey", null);
	setTimeout(function(){
    location.replace("../pages/homepage.html");
	},100)
}
//REQUIRED FOR ALL PAGE DOCS
function onstart(){
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
var token;
var user;
var cred;
function googlePop(){
	//alert("reached")
	firebase.auth().signInWithPopup(provider).then(function(result) {
	    googleAuth = true;
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  token = result.credential.accessToken;
	  cred = result.credential
	  // The signed-in user info.
	  user = result.user;
	  console.log(user)
	  console.log(token)
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ..
	});
}
//events
//login place
//LOGIN 1, if you were to log in with username and pass like a regular person
if(login != null){
login.addEventListener('click', e=>{
	const email = em.value;
	const password = pass.value;
	const auth = firebase.auth();
	//sign in
	const promise = auth.signInWithEmailAndPassword(email,password);
	promise.catch(e => document.getElementById("error").innerHTML = e.message)
});
}
function runSignUp(){
   // alert('here')
//Add signup event
//if(signup != null && nm.value != null){
	//check to see if the name is linked to any current users

//signup.addEventListener('click', e=>{
	const email = em.value;
	const password = pass.value;
	const repeat = pass2.value;
	const auth = firebase.auth();
	//alert(email)
//	alert()
	//signup
	if(repeat == password){

		checkForSimilarNames()
	setTimeout(function(){
		if(similarNames != true){
		    if(document.getElementById('name').value != null && document.getElementById('email').value != null && document.getElementById('pword').value != null && document.getElementById('pword2').value != null){
		        //alert('inside')
		    //SIGNUP 0.5 of 1,CREATING FIRST PART OF USER
		 	const promise = auth.createUserWithEmailAndPassword(email,password);
		    promise.catch(e => document.getElementById("error").innerHTML = e.message)
		    }else{
		        document.getElementById("error").innerHTML = "there was a problem, make sure you fill out all sections."
		    }
		}else{
		    document.getElementById("error").innerHTML = "that username has been taken. Please change it."
		}
	},2000)
//	}else{
		//document.getElementById("error").innerHTML = "Your passwords do not match."
//		}
//});
}else{
    //document.getElementById("error").innerHTM = "No name entered"
}
}
//signout button
function signoutFunc(){
	// signout.addEventListener('click', e=>{
	  firebase.auth().signOut();
	//});
 setTimeout(function() {
    // console.log('leaving!')
 location.replace("../pages/signup.html");
  }, 1000);
}
//for changing user place
firebase.auth().onAuthStateChanged(function(user) {
  if (user){
        document.getElementById("error").innerHTML = "logging you in :) Please wait..."
  		console.log(user)
		 console.log("logged in");
		uidReal = firebase.auth().currentUser.uid;
		//alert(firebase.auth().currentUser.email)
		setTimeout(function(){
	    db.collection("users").where("email","==", firebase.auth().currentUser.email)
            .get()
            .then(function(querySnapshot) {
                if(querySnapshot.empty){
                //this user needs to be made
               // alert(googleAuth)
    		    if(googleAuth){
    		       // alert('here')
    		    //SIGNUP 2 of 2, google user is signing up 
                // firebase.auth().signInAndRetrieveDataWithCredential(cred)
                //     .then(function(cred) {
                        //alert('here 1.5')
                       // alert(cred.additionalUserInfo.isNewUser)
                      if(location.href == 'https://www.thrmpage.com/pages/signup.html'){
                          //alert('here2')
                		db.collection("users").add({
                			img: firebase.auth().currentUser.photoURL,
                			favMeme: "download (1).png",
                	        name: firebase.auth().currentUser.displayName,
                	        email: firebase.auth().currentUser.email,
                	        totalFollowers: 0,
                	        totalFollowing: 0,
                	        numPosts: 0,
                	        totalLikes: 0,
                	        uid : firebase.auth().currentUser.uid,
                	        timestamp: Date.now(),
                	        userNum: 0,
                	        pref: {},
                	        following: [],
                	        followers: [],
                	        badge: [0],
                	        streak: 0,
                	        sharers: [],
                	        rep: 0,
                	        lastSDate: (new Date().getTime() - 86400),
                	        yourLikes: [],
                	        reputation: [0,0,createCode(6)],
                	        googleAuth: true,
 			                notification: {
                				likes: {seen:[], nseen: []},
                				follows: {seen:[], nseen: []},
                				comments: {seen:[], nseen: ['Hi, welcome to thrmpage! We are so excited to show you around! Right now you are in your homepage. This is the notification section, above is your user information. Your rep score is the point system in thrmpage, you get points by gaining followers, being active, and posting memes. Below are the memes you have made.']}
 			                }
                	     })
                	     .then(function() {
                            Swal.fire({
                              title: 'Great',
                              text: 'Created an Account',
                              type: 'success',
                              footer:'Please email any bugs in the thrmpage beta or things you like/don\'t like that you find to thrmpage@gmail.com',
                              confirmButtonText: 'Start!', 
                              background: '#1e1e1e',
                            })
                            .then(clicked => {
                            		location.replace("../pages/index.html");
                            });
                        })
    		    }else{
    		        location.replace('https://www.thrmpage.com/pages/signup.html')
    		    }
                 //   }) 	     
    		        }else{
                        //SIGNUP 1 of 1, this is a new user who needs to be added
                   		db.collection("users").add({
                    			img: "download (1).png",
                    			favMeme: "download (1).png",
                    	        name: nm.value,
                    	        email: em.value,
                    	        totalFollowers: 0,
                    	        totalFollowing: 0,
                    	        numPosts: 0,
                    	        totalLikes: 0,
                    	        uid : firebase.auth().currentUser.uid,
                    	        timestamp: Date.now(),
                    	        userNum: 0,
                    	        pref: {},
                    	        following: [],
                    	        followers: [],
                    	        badge: [0],
                    	        streak: 0,
                    	        sharers: [],
                    	        rep: 0,
                    	        lastSDate: (new Date().getTime() - 86400),
                    	        yourLikes: [],
                    	        reputation: [0,0,createCode(6)],
                    	        googleAuth: false,
                    			notification: {
                    				likes: {seen:[], nseen: []},
                    				follows: {seen:[], nseen: []},
                    				comments: {seen:[], nseen: ['Hi, welcome to thrmpage! We are so excited to show you around! Right now you are in your homepage. This is the notification section, above is your user information. Your rep score is the point system in thrmpage, you get points by gaining followers, being active, and posting memes. Below are the memes you have made.']
                    			}}
                    	     })
                    	     .then(function() {
                                Swal.fire({
                                  title: 'Great',
                                  text: 'created an account',
                                  type: 'success',
                                  footer:'Please email any bugs in the thrmpage beta or things you like/don\'t like that you find to thrmpage@gmail.com',
                                  confirmButtonText: 'Start!', 
                                  background: '#1e1e1e',
                                })
                                .then(clicked => {
                                		location.replace("../pages/index.html");
                                });
                            })
    		        }
            }else{
            Swal.fire({
              title: 'Cool',
              text: 'Logged In.',
              type: 'success',
              footer:'Please email any bugs in the thrmpage beta or things you like/don\'t like that you find to thrmpage@gmail.com',
              confirmButtonText: 'Continue', 
              background: '#1e1e1e',
            })
            .then(clicked => {
            		location.replace("../pages/index.html");
            });                   
            }
            // }
        })
		},200)
        
		}else{
		    console.log("not logged in");
		}
});

//  Swal.fire({
//   title: 'Something is Wrong',
//   text: 'Try Later',
//   type: 'error',
//   confirmButtonText: 'Ok', 
//   background: '#1e1e1e',
// }) 


function createCode(length){
   var result           = '#';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
	return result;
}
function checkForSimilarNames(){
	//similarNames = false
//	setTimeout(function(){
	db.collection("users")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        	if(doc.data().name == nm.value){
        		document.getElementById("error").innerHTML = "This username already exists"
        		console.log("HERE!")
        		similarNames = true;
        		console.log(similarNames)
        	}
        })
        //return similarNames
    })
   // },1000)
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


window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  //alert('did' + check)
  return check;
};

