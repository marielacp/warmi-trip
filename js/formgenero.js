/* creando funcion global con JQuery*/
$(document).ready(function () {
  var $genero = $('#select-genero');
  var $address = $('#address');
  var $checkbox = $('input[type="checkbox"]');
  var $submit = $('#submit');
  /* Validando genero */
  $genero.change(function () {
    if ($(this).val() === 'fem') {
      console.log('ok');
    } else {
      console.log('no eres un fem');
    }
  });
  /* Validando datos llenos en dirección*/
  $address.on('input', function (event) {
    /* Comprobando que no ingrese vacios o que no ingrese datos number*/
    if (($(this).val() === '')) {
      $(this).val('');
      alert('Ingrese su direccion');
    }
  });
  /* Validando boton submit genero*/
  $submit.click(function (event) {
    if ($checkbox.prop('checked') && ($genero.val() === 'fem') && ($address.val() !== '')) {
      event.preventDefault();
      window.location.href = '../views/login.html';
    } else {
      alert('Por favor ingrese sus datos correctamente');
      event.preventDefault();
    }
  });
});

