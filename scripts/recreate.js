var em = document.getElementById("email");
var pass = document.getElementById("pword");
var pass2 = document.getElementById("pword2");
var login = document.getElementById("btnLogin");
var signup = document.getElementById("btnSignup");
var nm = document.getElementById("name");
var error = document.getElementById("error");
var isGoogle = document.getElementById("google")
var killedAc = [];
function renewAccount(){
    db.collection('universalId')//.doc('Yh8zOySlTOaz4raFhZrG')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
            killedAc = doc.data().killedAccounts
        })
    }).then(function(){ 
        for(var i = 0; i < killedAc.length;i++){
            if(killedAc[i] == em.value){
                //alert('match!')
                if(pass.value != "" && pass2.value != "" && nm.value != ""){
                    if(isGoogle.checked){
                        var token;
                        var user;
                        var cred;      
                    	firebase.auth().signInWithPopup(provider).then(function(result) {
                    	  // This gives you a Google Access Token. You can use it to access the Google API.
                    	  token = result.credential.accessToken;
                    	  cred = result.credential
                    	  // The signed-in user info.
                    	  user = result.user;
                    	  console.log(user)
                    	  console.log(token)
                    	  // ...
                    	}).then(function(){
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
                    	        badge: [2],
                    	        streak: 0,
                    	        sharers: [],
                    	        rep: 0,
                    	        lastSDate: (new Date().getTime() - 86400),
                    	        yourLikes: [],
                    	        reputation: [0,0,createCode(6)],
                    	        googleAuth: true
                    	     })
                    	     .then(function() {
                                Swal.fire({
                                  title: 'Great',
                                  text: 'Recreated your account',
                                  type: 'success',
                                  footer:'Please email any bugs in the thrmpage beta or things you like/don\'t like that you find to thrmpage@gmail.com',
                                  confirmButtonText: 'Start!', 
                                  background: '#1e1e1e',
                                })
                                .then(clicked => {
                                		location.replace("../pages/index.html");
                                }); 
                    	     });                        
                        })                        
                    }else{
            	const email = em.value;
            	const password = pass.value;
            	const auth = firebase.auth();
                    auth.signInWithEmailAndPassword(email,password).then(function(){
                   		db.collection("users").add({
                    			img: "download (1).png",
                    			favMeme: "download (1).png",
                    	        name: nm.value,
                    	        email: em.value,
                    	        sharers: [],
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
                    	        badge: [2],
                    	        streak: 0,
                    	        lastSDate: (new Date().getTime() - 86400),
                    	        yourLikes: [],
                    	        reputation: [0,500,createCode(6)],
                    	        googleAuth: false
                    	     })
                    	     .then(function() {
                                Swal.fire({
                                  title: 'Great',
                                  text: 'Recreated your account',
                                  type: 'success',
                                  footer:'Please email any bugs in the thrmpage beta or things you like/don\'t like that you find to thrmpage@gmail.com',
                                  confirmButtonText: 'Start!', 
                                  background: '#1e1e1e',
                                })
                                .then(clicked => {
                                		location.replace("../pages/index.html");
                                }); 
                    	     });                        
                    })
                    }
                }else{
                    error.innerHTML = "You have not entered a value"
                }
            }else{
                error.innerHTML = "This email was entered incorrectly. Please check for typos or try another."
            }
        }
    }) 
}


function createCode(length){
   var result           = '#';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
	return result;
}