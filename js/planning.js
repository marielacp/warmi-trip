$(document).ready(function() {
  $('.datepicker').datepicker();
  var city = 'Cuzco';
  

 
  firebase.database().ref('place/'+city+'/hotels').on('value', function(snap) {
    console.log(snap.val());
    var hotels = Object.keys(snap.val());
   
    console.log(hotels);
  
   
  });

}); 