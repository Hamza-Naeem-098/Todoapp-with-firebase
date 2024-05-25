// function addTask(){
//     var input = document.getElementById('todoInput');
//     console.log(input.value);
 
//     var list = document.getElementById('list');
//     list.innerHTML += `<li>${input.value}<button onclick="Edit(this)">Edit</button>
//     <button onclick="Delete(this)">Delete</button>
//     </li>`
    
//     input.value = ""

// }
// function deleteAll(){
//     var list = document.getElementById('list');
//     list.innerHTML = "";
// }
// function Delete(e){
//     e.parentNode.remove();

// }
// function Edit(e){
//     var updateValue = prompt("Enter your update value.")
//     e.parentNode.firstChild.nodeValue = updateValue;
// }



var firebaseConfig = {
    apiKey: "AIzaSyB7LZa2QpFydYkRuieLMlYsvBRsJ7ERsDw",
    authDomain: "todoapp-b9840.firebaseapp.com",
    databaseURL: "https://todoapp-b9840-default-rtdb.firebaseio.com",
    projectId: "todoapp-b9840",
    storageBucket: "todoapp-b9840.appspot.com",
    messagingSenderId: "108619731962",
    appId: "1:108619731962:web:3b22a825635e5ec3820a43"
  };

  // Initialize Firebase
  var app =firebase.initializeApp(firebaseConfig);
  
  firebase
  .database()
  .ref("todos")
  .on("child_added", function (data) {
    // console.log(data.val().key);
    // console.log(data.val().todoValue);

    var list = document.getElementById("list");

    var liElement = document.createElement("li");

    var liText = document.createTextNode(data.val().todoValue);

    liElement.appendChild(liText);

    var list = document.getElementById("list");

    list.appendChild(liElement);

    var delBtnELement = document.createElement("button");

    var delBtnText = document.createTextNode("delete");

    delBtnELement.appendChild(delBtnText);

    liElement.appendChild(delBtnELement);

    delBtnELement.style.backgroundColor = "blue";
    delBtnELement.style.color = "white";

    delBtnELement.setAttribute("onclick", "deleteItem(this)");

    delBtnELement.setAttribute("id", data.val().key);
    //   Edit button creation

    var EditBtnELement = document.createElement("button");

    var EditBtnText = document.createTextNode("edit");

    EditBtnELement.appendChild(EditBtnText);

    liElement.appendChild(EditBtnELement);

    EditBtnELement.setAttribute("class", "editBtn");

    EditBtnELement.setAttribute("id", data.val().key);

    EditBtnELement.setAttribute("onclick", "editItem(this)");
  });

function addTodo() {
  var input = document.getElementById("todoInput");

  var id = Date.now().toString(31);

  var obj = {
    key: id,
    todoValue: input.value,
  };

  console.log(obj);

  firebase
    .database()
    .ref("todos/" + id)
    .set(obj);

    input.value = ""
}

function delteAll() {
  firebase.database().ref("todos").remove();
  var list = document.getElementById("list");
  list.innerHTML = "";
}

function deleteItem(e) {
  firebase
    .database()
    .ref("todos/" + e.id)
    .remove();
  e.parentNode.remove();
}

function editItem(e) {
  var ValId = e.id;
  var updateValue = prompt("Enter updated value..");

  firebase
    .database()
    .ref("todos/" + ValId)
    .set({
      key: e.id,
      todoValue: updateValue,
    });

  e.parentNode.firstChild.nodeValue = updateValue;
}