$(document).ready(function() {
/* logueando js con google. */
  var provider = new firebase.auth.GoogleAuthProvider();

  $('#login').click(function() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      
     
      guardaDatos(result.user);
      window.localStorage.setItem('storageUID',result.user.uid );
      console.log(result.user);


      var UID = window.localStorage.getItem('storageUID');
      console.log(UID);
    // Creando el código de usuario en la rama de posts 
      firebase.database().ref('posts').set({UID});
      
      window.location.href = 'perfil.html';
    }); 
  });
  /* funcion guardar datos */
  function guardaDatos(user) {
    var usuario = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    };
    
    
    firebase.database().ref('bd/'+ user.uid).set(usuario);
      
          
  }
 
 
  
});


