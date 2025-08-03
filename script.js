// script.js

// 🔐 Replace this with your Firebase config:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  databaseURL: "https://your-app.firebaseio.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

document.addEventListener('DOMContentLoaded', () => {
  const signalList = document.getElementById('signal-list');

  db.ref('signals').on('value', (snapshot) => {
    signalList.innerHTML = ""; // Clear previous
    snapshot.forEach(child => {
      const signal = child.val();
      const box = document.createElement('div');
      box.className = 'signal-box';
      box.innerHTML = `
        <h3>${signal.coin}</h3>
        <p><strong>Entry:</strong> ${signal.entry}</p>
        <p><strong>Stop Loss:</strong> ${signal.sl}</p>
        <p><strong>Take Profit:</strong> ${signal.tp}</p>
        <p><em>Posted: ${signal.time}</em></p>
      `;
      signalList.appendChild(box);
    });
  });
});
