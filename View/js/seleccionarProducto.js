
var imagen;
var id ; 
var titulo; 
var descripcion;
var c4 = null;
var precio ;
function olvidarContrasena(){
    event.preventDefault(); 
    let email = $('#emailf').val()
    var request = $.ajax({
      url:'../Model/olvidarContrasena.php',
      type : 'POST', 
      dataType: 'json', 
      data : {email:email}
    }); 
    request.done(function(response){
      alert(response.msg)
      location.reload();
    })
  }
function desplegarComentarios(array){

console.log(array);
let uno = 0; 
let dos = 0; 
let tres = 0; 
let cuatro = 0; 
let cinco = 0; 
arr = array;
var promedio = 0 ; 
$('#tabla').empty();
var tabla = [];
for(let i = 0 ; i< array.comentario.length ; i ++){
console.log(i);
var puntuacio = array.comentario[i].puntuacion; 
promedio += puntuacio;
var tabla2="";
let j = 0;
switch (puntuacio){
case 1: j=1;
        uno ++;
        break;
case 2: j=2;
        dos ++;
        break;
case 3: j=3;
        tres ++; 
        break;
case 4: j=4;
        cuatro ++;
        break;
case 5: j=5;
        cinco ++; 
        break;
}

for (let k = 0; k<j; k++){
tabla2+=`<div class="cell large-2">
            <img src="img/star.svg" width="15px">
        </div>`;
}
tabla += `<div class="grid-x">
<div class="cell large-4">
    <div class="descrip"><p id="preview">05/06/2020</p></div>
</div>
<div class="cell large-4">
   <div class="grid-x" id = "subtabla">
       <div class="cell large-2"></div>
       
       ` + tabla2 +
            
            `
        <div class="cell large-2"></div>
    </div>
</div> 
<div class="cell large-4">
    <div class="descrip comen"><p><b>${array.comentario[i].titulo}</b></p></div>
    <div class="descrip"><p id="preview">${array.comentario[i].comentario}</p></div>
</div>
</div>`;

}

$('#tabla').append(tabla);

promedio = promedio / array.comentario.length;
console.log(promedio);
$('.total').text("Overrall Rating based on "+array.comentario.length+" Reviews");
let l=0;
if(promedio<=1){
l =1;
}else if (promedio > 1 && promedio <= 2){
l=2;
}else if (promedio > 2 && promedio <= 3){
l= 3;
}else if (promedio > 3 && promedio <=4){
l = 4;
}else{
l = 5;
}
$('#cont').empty();
let tabla3 = `<div class="cell large-2"></div>`;
let tabla4  ="";
$('#cont2').empty();
for (let i = 0; i<l; i ++){
tabla3+=`<div class="cell large-2">
            <img src="img/star.svg" width="15px">
        </div>`;
tabla4 +=  `<div class="cell large-1">
        <img src="img/star.svg" width="18px">
    </div>`;
}
tabla4 +=  `<div class="cell large-7">
    </div>`;
tabla3 += `<div class="cell large-2"></div>`;

$('#cont').append(tabla3);

$('#cont2').append(tabla4);

$('#prom').text(Math.round(promedio) + " Out of 5.0");

$('.uno').text(uno + " Reviews");
$('.dos').text(dos + " Reviews");
$('.tres').text(tres + " Reviews");
$('.cuatro').text(cuatro + " Reviews");
$('.cinco').text(cinco + " Reviews");


}
function review(){
   if (c4 == "true"){
       console.log(c4)
        alert("Oops It seems that you haven't logged yet ");
   }else{
        window.location.href = `comentarios.html?imagen=${imagen}&id=${id}&titulo=${titulo}&descripcion=${descripcion}&precio=${precio}&campo4=${c4}`;
    }
    
}

window.cargarComentarios = function(){
    var request = $.ajax({
        url : '../Model/devolverComentarios.php', 
        type: 'POST',
        dataType: 'json',
        data : {id: id}
    })

    request.done(function(data){
        var response = JSON.parse(JSON.stringify(data)); 
        console.log(response);
        desplegarComentarios(response);
        
    })
request.fail(function( jqXHR, textStatus, errorThrown ){
if (jqXHR.status === 0) {

alert('Not connect: Verify Network.');

} else if (jqXHR.status == 404) {

alert('Requested page not found [404]');

} else if (jqXHR.status == 500) {

alert('Internal Server Error [500].');

} else if (textStatus === 'parsererror') {

//alert('Requested JSON parse failed.');

} else if (textStatus === 'timeout') {

alert('Time out error.');

} else if (textStatus === 'abort') {

alert('Ajax request aborted.');

} else {

alert('Uncaught Error: ' + jqXHR.responseText);

}

});
}
window.recibirParametros2 = function(){
    var url = new URL(window.location.href);
    imagen = url.searchParams.get("imagen");
    id = url.searchParams.get("id");
    titulo = url.searchParams.get("titulo");
    descripcion = url.searchParams.get("descripcion");
    c4 = url.searchParams.get("campo4"); 
    precio = url.searchParams.get("precio");
    console.log(c4);
    if(c4 == "true"){
        $('#usuario').hide();
        $('#shopButton2').prop('disabled', true);
    }else {
        $('#account').removeAttr('id');
    }
    acomodarProducto2(imagen,titulo, descripcion, precio);
    comprobarTallas();
    
}

function acomodarProducto2(imagen,titulo, descripcion, precio){
    $('.recuadroImag').attr('src', imagen);
    $('.orbit-image').attr('src', imagen);
    $('#tProducto').html(titulo);
    $('#dProducto').text(descripcion);
    $('#price').text("$" + precio);
    
}

function anadirListaDeDeseos(){
    if (c4 != "true"){ 
    var request = $.ajax({
        url : '../Model/anadirDeseos.php', 
        type: 'POST',
        dataType: 'html', 
        data: {id:id}
    })

    request.done(function(data){
        alert(data);
        
    })

request.fail(function( jqXHR, textStatus, errorThrown ){
if (jqXHR.status === 0) {

alert('Not connect: Verify Network.');

} else if (jqXHR.status == 404) {

alert('Requested page not found [404]');

} else if (jqXHR.status == 500) {

alert('Internal Server Error [500].');

} else if (textStatus === 'parsererror') {

alert('Requested JSON parse failed.');

} else if (textStatus === 'timeout') {

alert('Time out error.');

} else if (textStatus === 'abort') {

alert('Ajax request aborted.');

} else {

alert('Uncaught Error: ' + jqXHR.responseText);

}

});
}else {
    alert("Please sign in first ")
}
}

function comprobarTallas(){
    var request = $.ajax({
        url: '../Model/comprobarTalla.php',
        type: 'POST',
        dataType:'json',
        data : {id: id}
    })

    request.done(function(data){
        var response = JSON.parse(JSON.stringify(data));
        ponerTallas(response);
    })
    request.fail(function( jqXHR, textStatus, errorThrown ){
        if (jqXHR.status === 0) {
        
        alert('Not connect: Verify Network.');
        
        } else if (jqXHR.status == 404) {
        
        alert('Requested page not found [404]');
        
        } else if (jqXHR.status == 500) {
        
        alert('Internal Server Error [500].');
        
        } else if (textStatus === 'parsererror') {
        
        alert('Requested JSON parse failed.');
        
        } else if (textStatus === 'timeout') {
        
        alert('Time out error.');
        
        } else if (textStatus === 'abort') {
        
        alert('Ajax request aborted.');
        
        } else {
        
        alert('Uncaught Error: ' + jqXHR.responseText);
        
        }
        
        });
}

function ponerTallas(array){
    console.log("Hola");
    var xs = false; 
    var s = false; 
    var m = false; 
    var l = false;
    var xl = false;
    if(array == null){
        $('#tablero').empty(); 
        $('#tablero').append(`<p> Sorry we don't have this product in stock `);
        $('#shopButton2').prop('disabled', true);
    }else {
        for (let i = 0; i < array.length; i++) {
            switch (array[i].talla){
                case "XS" : xs = true; 
                            break;
                case "S" : s = true; 
                            break;
                case "M" : m = true; 
                            break;
                case "L" : l = true; 
                            break;
                case "XL" : xl = true; 
                            break;
            }
        }

        if(xs == false){
            $("#XS").hide();
        }
        if(s == false){
            $("#S").hide();
        }
        if(m == false){
            $("#M").hide();
        }
        if(l == false){
            $("#L").hide();
        }
        if(xl == false){
            $("#XL").hide();
        }
    }
}
$(document).ready(function(){
     $('#lupa').click(function(){
        if($('#barra').is(":visible")){
            $('#barra').hide(1000);
        }else{
            $('#barra').show(1000);
        }
        
    })

    $('#recover').click(function(){
        olvidarContrasena();
      })
})
