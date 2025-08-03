// vip.js

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  databaseURL: "https://your-app.firebaseio.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userEmail = document.getElementById("userEmail");
const vipSignalList = document.getElementById("vip-signal-list");

// VIP Email List (can also store this in DB)
const vipEmails = [
  "kaveesha@example.com",
  "pasidu@example.com"
];

loginBtn.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
});

logoutBtn.addEventListener("click", () => {
  auth.signOut();
});

auth.onAuthStateChanged(user => {
  if (user) {
    userEmail.textContent = `Logged in as: ${user.email}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";

    if (vipEmails.includes(user.email)) {
      loadVipSignals();
    } else {
      vipSignalList.innerHTML = `<p style="color: red;">❌ You are not a VIP Member</p>`;
    }
  } else {
    userEmail.textContent = "";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    vipSignalList.innerHTML = "";
  }
});

function loadVipSignals() {
  db.ref("vip_signals").on("value", snapshot => {
    vipSignalList.innerHTML = "";
    snapshot.forEach(child => {
      const signal = child.val();
      const box = document.createElement("div");
      box.className = "signal-box";
      box.innerHTML = `
        <h3>${signal.coin}</h3>
        <p><strong>Entry:</strong> ${signal.entry}</p>
        <p><strong>Stop Loss:</strong> ${signal.sl}</p>
        <p><strong>Take Profit:</strong> ${signal.tp}</p>
        <p><em>Posted: ${signal.time}</em></p>
      `;
      vipSignalList.appendChild(box);
    });
  });
}
