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
const fromEl = document.getElementById("from-el")
const toEl = document.getElementById("to-el")
const publishBtn = document.getElementById("publish-btn")
const commentListEl = document.getElementById("comment-list")


// pushs value of inputs to Firebase and clears the inputs
publishBtn.addEventListener("click", function() {
  const commentValue = {
    from: fromEl.value,
    comment: commentEl.value,
    to: toEl.value
  }
  if (commentValue.from === "" || commentValue.to === "" || commentValue.from === "") {
    window.alert("Please enter a comment and names, thank you :)")
  } else {
    push(commentInDatabase, commentValue)
  clearInputFields()
  }

  
})

onValue(commentInDatabase, function(snapchat) {
  let commentsArray = Object.entries(snapchat.val())

  clearCommentListEl()

  for (let i = 0; i < commentsArray.length; i++) {
    let currentComment = commentsArray[i]
    // not used yet let currentCommentID = currentComment[0]
    let currentCommentValue = currentComment[1]
    let from = currentCommentValue.from
    let comment = currentCommentValue.comment
    let to = currentCommentValue.to
    appendCommentToCommentListEl(comment, from, to)
  }
  

})


function appendCommentToCommentListEl(comment, from, to) {
  let newCommentEl = document.createElement("li")
  let newFromEl = document.createElement("p")
  let newToEl = document.createElement("p")
  newCommentEl.textContent = comment
  newFromEl.textContent = `From ${from}`
  newToEl.textContent = `To ${to}`


  
  commentListEl.append(newCommentEl)
  newCommentEl.appendChild(newToEl) 
  newCommentEl.prepend(newFromEl)
}

function clearCommentListEl() {
  commentListEl.innerHTML = ""
}

function clearInputFields() {
  commentEl.value = ""
   fromEl.value = ""
   toEl.value = ""
}
