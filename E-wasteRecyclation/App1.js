const firebaseConfig = {
    apiKey: "AIzaSyCw0OWySi4O28JOj1pmdImPNC2thRy7QIU",
    authDomain: "ewasteman.firebaseapp.com",
    databaseURL: "https://ewasteman-default-rtdb.firebaseio.com",
    projectId: "ewasteman",
    storageBucket: "ewasteman.firebasestorage.app",
    messagingSenderId: "864683600216",
    appId: "1:864683600216:web:88c5947a03199405059d2d",
    measurementId: "G-SBEKR6VYE8"
  };

firebase.initializeApp(firebaseConfig);

var EwasteInfoDB= firebase.database().ref('EwasteInfo');

document.getElementById('ewasteForm').addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();

  var Type = getElementVal('type');
  var weight =getElementVal('weight');
  var pickupLocation = getElementVal('pickupLocation');
  var pickupDate = getElementVal('pickupDate');
  var contact = getElementVal('contact');

  SetDetails(Type, weight, pickupDate, pickupLocation, contact);
}

const SetDetails=(Type, weight, pickupDate, pickupLocation, contact)=>{

  var newPickup =EwasteInfoDB.push();

  newPickup.set({
    Type : Type,
    weight :weight,
    pickupLocation : pickupLocation,
    pickupDate : pickupDate,
    contact : contact,
    
  })


}
const getElementVal=(id)=>{
    return document.getElementById(id).Value;
}