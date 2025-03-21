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
  

  checkIfEmailExists(email, name, pass);

}


document.getElementById('SignupForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('conPass').value;

  if (password !== confirmPassword) {
     alert('Password not matched');
      return;
  }

});

const checkIfEmailExists = (email, name, pass) => {
  UserInfoDB.orderByChild('emailid').equalTo(email).once('value', (snapshot) => {
    if (snapshot.exists()) {
      
      alert("Email already exists. Please login.");
    } else {
      
      SendMessage(name, email, pass);
      alert("Sign-up successful. Redirecting to login page...");
     
      window.location.href = "index.html"; 
    }
  });
};

const SendMessage =(name, email, pass) => {

  var newContact = UserInfoDB.push();
  
  newContact.set({
    name : name,
    emailid: email,
    password: pass,
   

  });
};


document.getElementById('SignInForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form behavior

  var email = getElementVal('emailid');
  var password = getElementVal('Password');

  // Call sign-in function
  signInUser(email, password);
});

// Function to sign-in the user using Firebase Authentication
const signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log('User signed in:', user.email);

      // Redirect user after successful sign-in
      window.location.href = "../homepage/index.html"; // Redirect to the dashboard after sign-in
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // Handle specific errors
      if (errorCode === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else if (errorCode === 'auth/user-not-found') {
        alert('No user found with this email. Please sign up.');
      } else {
        alert('Error: ' + errorMessage); // Generic error message
      }
    });
};
const getElementVal= (id)=> {

  return document.getElementById(id).value;
};