var goneThrough = false;
var readyish = false;
var gImgs = [];
var tempImages = []
var adder = 0;
var imgs = [];
var yourMemes = [];
var urls = []
var savedVal = 0;
var fileInput = document.getElementById("file-input")
var idVal;
//for an interval later
var okInt;
var holderArray = [];

function inity(){
    createImgs();
    // setInterval(function(){
    //     if(goneThrough){
    //         //nothing
    //     }else{
    //         createImgs()
    //     }
    // },1000)
     // setTimeout(function(){
     //    renderImgs();
     // },2000)
}

function moveMemeArrayValues(shootingArray){
    var regArray = [];
    for (var i = 0; i < shootingArray.length; i++) {
        for (var a = 0; a < shootingArray.length; a++) {
            if(Number(shootingArray[a][1]) == i){
                regArray.push(shootingArray[a])
            }
        }
    }
    //alert(regArray)
    return regArray
}


function createImgs() {
    //Getting all recent memes
    //thank you https://stackoverflow.com/users/3371862/renaud-tarnec
    var queries = []
    db.collection("BIMG").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            //alert('added ' + doc.data().id)
            // doc.data() is never undefined for query doc snapshots
            yourMemes.push([doc.data().link,doc.data().id])
            queries.push(
            db
                .collection('BIMG')
                .get()
                )
        });
        return Promise.all(queries);
    })
      .then(function(results) {
                yourMemes = moveMemeArrayValues(yourMemes);
                //alert(yourMemes)
                console.log(yourMemes)
                var i = -1;
                function downloadImgs(){
                     i++;
                if(i != yourMemes.length){
                     storageRef.child('BIMG/' + yourMemes[i][0]).getDownloadURL().then(function(url) {
                         // This can be downloaded directly:
                         var xhr = new XMLHttpRequest();
                         xhr.responseType = 'blob';
                         xhr.onload = function(event) {
                             var blob = xhr.response;
                         };
                         xhr.open('GET', url);
                         xhr.send();
                        imgs.push(createImage(url, yourMemes[i][1]))
                        downloadImgs()
                     });
                     }else{
                              renderImgs()
                      }
                }
                downloadImgs()
      });

}

function createImage(url,which) {
    // console.log(which)
    // console.log(yourMemes[which[1]])
    return {
        id: Number(which),
        url: url,
    };
}

function renderImgs() {
    goneThrough = true
    console.log(imgs)
    console.log("here");
    var newPromise = new Promise (function(resolve, reject) {
       // alert('in the promise')
        console.log(imgs)
        console.log(yourMemes)
    //    if(imgs.length == yourMemes.length-- && readyish == false){
            readyish = true
            for (var i = 0; i < imgs.length; i++) {
                 if(i < 30){
                 console.log(imgs)
                 console.log("imgsID: " + imgs[i].id + " imgsURL: " + imgs[i].url)
                gImgs.push("<img id='" + imgs[i].id + "'height='200px' width='auto' src="+ imgs[i].url + " onclick= initMemeEditor(" + imgs[i].id + ",'"+ imgs[i].url +"') alt='meme picture'/>")
                console.log(i)
                console.log(gImgs)
                }
            }
            gImgs = gImgs.join(' ')
            //alert(gImgs)
            //if()
           resolve(gImgs)
        // }else{
        //  console.log("not ready! Imgs length: " + imgs.length + " yourMemes length: " + yourMemes.length + " readyish: " + readyish);
        // }        
    });
    newPromise
        .then(function(fulfilled){
            //alert('fullfilled')
            //updating stuff to .galler.innerHTML
            document.querySelector('.gallery').innerHTML = `${fulfilled}<div class="image-upload">
                <label id="uploadLabel"for="file-input">
                    <img id="uploadImage"height = "200px" width = "200px" src="../models/plusImg.jpg"/>
                </label>
                <input id="file-input" type="file"/>
            </div>`;     
           //making the fileInput detector when user wants to upload files instead of choose regular templates
            fileInput = document.getElementById("file-input")
            fileInput.addEventListener('change', function () {
                //alert('changed')
                console.log('change')
                console.log(fileInput.files[0])
                openFile(fileInput);        
            })
        })
     .catch(function (error) {
            console.log(error.message);
        });
}
//accepting files part
// var is;
// var coolInt = setInterval(function(){
//     //alert('here1')
//     fileInput = document.getElementById("file-input")
//      fileInput.addEventListener("change", function() {
//         var is = true
//         //clearInterval(coolInt)
//         //setTimeout(function(){
//       // console.log('reached almost')
//             if(is){
//                 is = false
//               // alert('here')
//                 openFile(fileInput);
//                 //alert('still here')
//                 clearInterval(coolInt)
//             }
//         //},500)
        
//      })
//  },2000)

function openFile(event) {
    clearInterval(okInt)
    //alert('here')
    //var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      //img.src = dataURL;
    };
    reader.readAsDataURL(event.files[0]);
     //console.log('here2')
     //clearInterval(coolInt)
    setTimeout(function(){
       // console.log('here2')
        //if(is){
        uploadManX()
        //}
    },300)
  };
function uploadManX(){
    var user = firebase.auth().currentUser;
    if (user) {
        console.log("here1")
      // User is signed in.
    //Storage ref
    if(fileInput.files[0] != null){
    var ref = firebase.storage().ref('BIMG/' + fileInput.files[0].name)
    console.log("here2")
    //Upload
    ref.put(fileInput.files[0]).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
      console.log("here3")
    });
    }
    // //Set profile pic on firestory
    // db.collection("users").where("uid", "==", firebase.auth().currentUser.uid){
    //  alert(doc.data())

 //    }
 setTimeout(function(){
   db.collection("users").where("uid", "==", firebase.auth().currentUser.uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // if(doc.data().img != ""){
            //     console.log("here4")
            // }
            // doc.data() is never undefined for query doc snapshots
            if(fileInput.files[0] != null && fileInput.files[0] != undefined){
                fileInput.files[0].name = generateName(10)
            setTimeout(function(){
             db.collection("universalId").where("name", "==","BIMG")
                .get()
                .then(function(querySnapshot) {
                     querySnapshot.forEach(function(doc) {
                        idVal = doc.data().id
                        db.collection("BIMG").add({
                            link: fileInput.files[0].name,
                            name: "",
                            uses: "0",
                            id: String(idVal)

                        })       
                        idVal++
                         db.collection("universalId").doc("BIMGONLYONE").update({
                            "id": idVal

                        })                
                    })
                })
             },1500)
            console.log("here5")
            }
           // console.log(fileInput.files[0].name);
        });
        
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
 },2000)
}
//console.log("here6")
setTimeout(function() {
     // db.collection("BIMG").where("link", "==",fileInput.files[0].name)
     //    .get()
     //    .then(function(querySnapshot) {
     //        querySnapshot.forEach(function(doc) {
     if(fileInput.files.length != 0){
         //alert('here')
                storageRef.child('BIMG/' + fileInput.files[0].name).getDownloadURL().then(function(thisurl) {
                    // console.log(i)
                    // console.log(savedVal)
                    // alert(yourMemes[i][0])
                    // This can be downloaded directly:
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function(event) {
                        var blob = xhr.response;
                    };
                    xhr.open('GET', thisurl);
                    xhr.send();
                    initMemeEditor(idVal--, thisurl)
                    // alert(yourMemes[savedVal][1])
                }); 
     }
                //alert(doc.data().url)
         //     })
         // })
    //initMemeEditor(" + imgs[i].id + ",'"+ imgs[i].url +"') 
//location.replace("file:///Users/dhartman/Documents/Documents%20-%20Darrow%E2%80%99s%20MacBook%20Pro/PROJECTS/memepage/pages/homepage.html");
}, 1500)
}
// // setTimeout(function(){
// //     while(profPic.src != null || profPic != undefined){


function generateName(len) {
    var length = len,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

// window.onload = function(){
// }



// //     })    
// // },3000)
