// admin.js

// Same Firebase Config as before
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

// Handle Form Submit
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signal-form');
  const status = document.getElementById('status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const signal = {
      coin: form.coin.value,
      entry: form.entry.value,
      sl: form.sl.value,
      tp: form.tp.value,
      time: form.time.value
    };

    db.ref('signals').push(signal)
      .then(() => {
        status.textContent = "✅ Signal Posted Successfully!";
        form.reset();
        setTimeout(() => status.textContent = "", 3000);
      })
      .catch(err => {
        console.error(err);
        status.textContent = "❌ Error posting signal!";
      });
  });
});
