var allTop = [];
var stuck = false;
var leaderDiv = document.getElementById('topUsers')
function getTop(){
    db.collection('users')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if(doc.data().name != null){
                var likeSum = 0;
                 db.collection('memeInfo').where("creator", "==", doc.data().uid)
                  .get()
                  .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        likeSum += parseInt(doc.data().likes);
                    })
                  }).then(function(){
                     // alert(likeSum)
                    allTop.push({
                        name: doc.data().name,
                        rep: likeSum + 100 + (3* doc.data().totalFollowers) + doc.data().reputation[1],
                        uid: doc.data().uid,
                        img: doc.data().img
                        
                    })
                  })   
            }
        })
      }).then(function(){
          sortTop();
      })
}

// function sortTop(){
//     function compare( a, b ) {
//       if ( a.rep < b.rep ){
//         return -1;
//       }
//       if ( a.rep > b.rep ){
//         return 1;
//       }
//       return 0;
//     }
    
//     allTop.sort(compare);
// }