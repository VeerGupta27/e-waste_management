const firebaseConfig = {
  apiKey: "AIzaSyCw0OWySi4O28JOj1pmdImPNC2thRy7QIU",
  authDomain: "ewasteman.firebaseapp.com",
  databaseURL: "https://ewasteman-default-rtdb.firebaseio.com",
  projectId: "ewasteman",
  storageBucket: "ewasteman.firebasestorage.app",
  messagingSenderId: "864683600216",
  appId: "1:864683600216:web:947b66768828f6dd059d2d",
  measurementId: "G-19L2RC3H5M"
};



  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

var UserInfoDB= firebase.database().ref('UserInfo');

document.getElementById('SignupForm').addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();

  var name = getElementVal('fullName');
  var email =getElementVal('email');
  var pass = getElementVal('password');
  var conPass = getElementVal('conPass');

  SendMessage(name, email, pass, conPass);

}

const SendMessage =(name, email, pass, conPass) => {

  var newContact = UserInfoDB.push();
  
  newContact.set({
    name : name,
    emailid: email,
    password: pass,
    Confirm_Password: conPass,

  });
};
const getElementVal= (id)=> {

  return document.getElementById(id).value;
};