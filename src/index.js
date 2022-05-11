// Import the functions you need from the SDKs you need
// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCJNKURSeGbKuPVlU9_SSxEGkYax77gHM",
  authDomain: "tt-waitings-and-midnights.firebaseapp.com",
  projectId: "tt-waitings-and-midnights",
  storageBucket: "tt-waitings-and-midnights.appspot.com",
  messagingSenderId: "180025374911",
  appId: "1:180025374911:web:803bbf2cafebf4e3b4ee0a",
  measurementId: "G-QWJ2G3VSYR"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//given data retrieved from Firebase, update the webpage with corresponding data
function updateInputs(weekdayList) {
  for (const input of document.querySelectorAll('table input')) {
    if (input.id === "Week") {
      input.placeholder = weekdayList.get('Week').Date;
    } else {
      const path = input.id.split(' ');
      if (path[1] === "Dinner") {
        input.placeholder = weekdayList.get(path[0]).Dinner
      } else if (path[1] === "Waitings") {
        input.placeholder = path[2] === "1" ? weekdayList.get(path[0]).Waitings1 : weekdayList.get(path[0]).Waitings2
      } else {
        input.placeholder = path[2] === "1" ? weekdayList.get(path[0]).Midnights1 : weekdayList.get(path[0]).Midnights2
      }
    }
  }
}

//given a promise of data from Firebase, update Firebase data with data from webpage inputs
async function submitFunction(promise, button) {
  const retrievedData = await promise;
  if (document.getElementById('passcode').value.replace(/</g, "&lt;").replace(/>/g, "&gt;") !== retrievedData.get('security').passcode) {
    button.classList.remove('btn-success');
    button.classList.add('btn-warning');
    return;
  }
  button.classList.remove('btn-warning');
  button.classList.add('btn-success');
  for (const input of document.querySelectorAll('table input')) {
    const newValue = input.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (newValue) {
      const path = input.id.split(' ');
      const document = doc(db, 'Weekdays', path[0]);
      let newData = {};
      if (path[0] === "Week") {
        newData = {Date: newValue}
      } else if (path[1] === "Dinner") {
        newData = {Dinner: newValue}
      } else if (path[1] === "Waitings") {
        newData = path[2] === "1" ? {Waitings1: newValue} : {Waitings2: newValue};
      } else {
        newData = path[2] === "1" ? {Midnights1: newValue} : {Midnights2: newValue};
      }
      setDoc(document, newData, { merge: true });
    }
  }
}

// Get a list of weekdays from your database
async function getWeekdays(db) {
  const weekdayCol = collection(db, 'Weekdays');
  const weekdaySnapshot = await getDocs(weekdayCol);
  const weekdayList = new Map(weekdaySnapshot.docs.map(doc => [doc.id, doc.data()]));
  updateInputs(weekdayList);
  return weekdayList;
}

const returnValue = getWeekdays(db);
const button = document.getElementById('submitButton');
button.addEventListener('click', () => submitFunction(returnValue, button));
