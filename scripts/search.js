var tagSearchDiv = document.getElementById("tagSearchDiv");
var officialTags = document.getElementById("officialTags");
var chosenTags = [];
var a, b, i, val
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' class='autoresults'value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
            // alert("wow!")
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
              localStorage.setItem("searchKey",this.getElementsByTagName("input")[0].value)
              if(location.href == "https://www.thrmpage.com/pages/basepage.html" || location.href == "https://www.thrmpage.com/pages/login.html" || location.href == "https://www.thrmpage.com/pages/signup.html"){
                Swal.fire({
                  title: 'Whoops',
                  text: 'You need to create an account or login to do that...',
                  type: 'warning',
                  confirmButtonText: 'Signup', 
                  background: '#1e1e1e',
                })
                .then(clicked => {
                	if(clicked.value){
                		location.href = 'https://www.thrmpage.com/pages/signup.html'
                	}
                });
              }else{
                  location.replace("../pages/homepage.html");
              }
              });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  // document.addEventListener("click", function (e) {
  //     closeAllLists(e.target);
  // });
  // if(document.getElementById("myInputautocomplete-list") != null){
  //   document.getElementById("myInputautocomplete-list").onclick = function(){
  //        alert(e.target)
  //       localStorage.setItem("searchKey",)
  //   }
  // }
//   document.body.onkeyup = function(e){
//     if(e.keyCode == 32){
//       closeAllLists(e.target);
//     }
// }
}
function autotag(inp, arr) {
  /*the autotag function takes two arguments,
  the text field element and an array of possible autotaged values:*/
  var nextFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    // console.log("here")
      a, b, i, val = this.value;
      /*close any already open lists of autotaged values*/
      closeAllLists();
      if (!val) { return false;}
      nextFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autotag-list");
      a.setAttribute("class", "autotag-items");
      /*append the DIV element as a child of the autotag container:*/
      tagSearchDiv.appendChild(a);
      /*for each item in the array...*/
      //For the suggested terms
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
         //     if(i != arr.length){
         //   b.innerHTML = "<span class='tagText'>" + arr[i].substr(0, val.length) + "</span>";
         // }else{
         //    alert("eww")
         // }
           b.innerHTML = "<span class='tagText'>" + arr[i].substr(0, val.length) + "</span>";
           b.innerHTML += arr[i].substr(val.length);
          b.classList.add("taggy");
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' class='autoresults'value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
            // alert("wow!")
              /*close the list of autotag values,
              (or any other open lists of autotag values:*/
              // db.collection("tags").where("name", "==", e.toElement.textContent)
              //     .get()
              //     .then(function(querySnapshot) {
              //         querySnapshot.forEach(function(doc) {
              //             // doc.data() is never undefined for query doc snapshots
              //             // console.log(doc.id, " => ", doc.data());
              //             // alert(doc.id)
              //         });
              //     })
              //     .catch(function(error) {
              //         console.log("Error getting documents: ", error);
              //     });
              closeAllLists();
              chosenTags.push(e.toElement.textContent)
              localStorage.setItem("chosenTags",chosenTags)
              console.log(e)
              document.getElementById("searchTag").value = e.toElement.textContent;
              officialTags.innerHTML += "<div id=" + e.toElement.textContent + 'TagDiv ' + "onmousedown = 'detectButton(this.id)'class='permTag'><p class='actualTxt'>" + e.toElement.textContent + "</p>";
              officialTags.innerHTML += "<input type='hidden' class='autoresults'value='" + arr[i] + "'></div>"
              // document.getElementById("searchTag").value = "";
              // localStorage.setItem("searchKey",this.getElementsByTagName("input")[0].value)
              // location.replace("file:///Users/dhartman/Documents/PROJECTS/memepage/pages/homepage.html");
          });
          a.appendChild(b);
        }
      }
      //for the new tag term
       if (val.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
         //     if(i != arr.length){
         //   b.innerHTML = "<span class='tagText'>" + arr[i].substr(0, val.length) + "</span>";
         // }else{
         //    alert("eww")
         // }
           b.innerHTML = "<span class='tagText'>" + val.substr(0, val.length) + "</span>";
           b.innerHTML += val.substr(val.length);
          b.classList.add("taggy");
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' class='autoresults'value='" + val + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
            // alert("wow!")
              /*close the list of autotag values,
              (or any other open lists of autotag values:*/
              db.collection("tags").where("name", "==", e.toElement.textContent)
                  .get()
                  .then(function(querySnapshot) {
                      querySnapshot.forEach(function(doc) {
                          // doc.data() is never undefined for query doc snapshots
                          // console.log(doc.id, " => ", doc.data());
                          alert(doc.id)
                      });
                  })
                  .catch(function(error) {
                      console.log("Error getting documents: ", error);
                  });
              closeAllLists();
              chosenTags.push(e.toElement.textContent)
              delDuplicates(chosenTags,findDuplicates(chosenTags))
              localStorage.setItem("chosenTags",chosenTags)
              console.log(e)
              document.getElementById("searchTag").value = e.toElement.textContent;
              officialTags.innerHTML += "<div id=" + e.toElement.textContent + 'TagDiv ' + "onmousedown = 'detectButton(this.id)'class='permTag'><p class='actualTxt'>" + e.toElement.textContent + "</p>";
              officialTags.innerHTML += "<input type='hidden' class='autoresults'value='" + val + "'></div>"
              // document.getElementById("searchTag").value = "";
              // localStorage.setItem("searchKey",this.getElementsByTagName("input")[0].value)
              // location.replace("file:///Users/dhartman/Documents/PROJECTS/memepage/pages/homepage.html");
          });
          a.appendChild(b);
        }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    // console.log("here2")
      var x = document.getElementById(this.id + "autotag-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the nextFocus variable:*/
        nextFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the nextFocus variable:*/
        nextFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (nextFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[nextFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (nextFocus >= x.length) nextFocus = 0;
    if (nextFocus < 0) nextFocus = (x.length - 1);
    /*add class "autotag-active":*/
    x[nextFocus].classList.add("autotag-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autotag items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autotag-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autotag lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autotag-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  // document.addEventListener("click", function (e) {
  //     closeAllLists(e.target);
  // });
  // if(document.getElementById("myInputautocomplete-list") != null){
  //   document.getElementById("myInputautocomplete-list").onclick = function(){
  //        alert(e.target)
  //       localStorage.setItem("searchKey",)
  //   }
  // }
//   document.body.onkeyup = function(e){
//     if(e.keyCode == 32){
//       closeAllLists(e.target);
//     }
// }
}
/*An array containing all the country names in the world:*/
var tags = [];
  db.collection("tags")
  .get()
  .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // alert(doc.data().name)
      // for (var i = 0; i < doc.data().length; i++) {
      
          tags.push(String(doc.data().name))
    // }
  })})
var users = [];
  db.collection("users")
  .get()
  .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // alert(doc.data().name)
      // for (var i = 0; i < doc.data().length; i++) {
          users.push(String(doc.data().name))
    // }
  })})
/*initiate the autocomplete function on the "myInput" element, and pass along the memes array as possible autocomplete values:*/
if (officialTags) {
 autotag(document.getElementById("searchTag"), tags);
}
 autocomplete(document.getElementById("searchInput"), users);



function detectButton(a){
  if(event.button == 0){
    // alert(document.getElementById(a).textContent);
    for( var i = 0; i < chosenTags.length; i++){ 
   if ( chosenTags[i] == document.getElementById(a).textContent) {
      chosenTags.splice(i, 1);
      localStorage.setItem("chosenTags",chosenTags) 
     }
  }
  document.getElementById(a).remove()
  }else if(event.button == 2){
    alert("This functionality is still in progress!")
  }
}

function findDuplicates(data) {
  let result = [];
  data.forEach(function(element, index) {
    // Find if there is a duplicate or not
    if (data.indexOf(element, index + 1) > -1) {
      // Find if the element is already in the result array or not
      if (result.indexOf(element) === -1) {
        result.push(element);
      }
    }
  });

  return result;
}

function delDuplicates(data,dup){
  for (var i = 0; i < data.length; i++) {
    for (var a = 0; a < dup.length; a++) {
    if(data[i] == dup[a]){
      data.splice(i, 1);
      alert("deleting" + i)
    }
    }
    if(dup[a] != data[i]){
      
    }
  }

  for (var y = 0; y < dup.length; y++) {
    data.push(dup[y])
  }
}



