// Setup for Firebase Database
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://realtime-database-ac20c-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const commentInDatabase = ref(database, "comment")

// Variables to catch up Elements easier
const commentEl = document.getElementById("comment-el")
// const fromEl = document.getElementById("from-el")
// const toEl = document.getElementById("to-el")
const publishBtn = document.getElementById("publish-btn")
const commentListEl = document.getElementById("comment-list")


// pushs value of commentEl to Firebase and clears the commentEl
publishBtn.addEventListener("click", function() {
  const commentValue = commentEl.value

  push(commentInDatabase, commentValue)
  clearInputFields()
})

onValue(commentInDatabase, function(snapchat) {
  let commentsArray = Object.entries(snapchat.val())

  clearCommentListEl()

  for (let i = 0; i < commentsArray.length; i++) {
    let currentComment = commentsArray[i]
    let currentCommentID = currentComment[0]
    let currentCommentValue = currentComment[1]
    appendCommentToCommentListEl(currentCommentValue)
  }
  

})


function appendCommentToCommentListEl(comment) {
  let newEl = document.createElement("li")
  newEl.textContent = comment

  commentListEl.append(newEl) 
}

function clearCommentListEl() {
  commentListEl.innerHTML = ""
}

function clearInputFields() {
  commentEl.value = ""
  // fromEl.value = ""
  // toEl.value = ""
}