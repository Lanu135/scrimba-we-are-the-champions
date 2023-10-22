// Setup for Firebase Database
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://realtime-database-ac20c-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDatabase = ref(database, "endorsement")

// Variables to catch up Elements easier
const commentEl = document.getElementById("comment-el")
const fromEl = document.getElementById("from-el")
const toEl = document.getElementById("to-el")
const publishBtn = document.getElementById("publish-btn")
const endorsementList = document.getElementById("endorsement-list")



publishBtn.addEventListener("click", function() {
  const commentValue = commentEl.value

  push(endorsementInDatabase, commentValue)
  

})