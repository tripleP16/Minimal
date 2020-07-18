var c4 = null
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
 function recibirParametros2(){
    var url = new URL(window.location.href);
    var c1 = url.searchParams.get("campo1");
    var c2 = url.searchParams.get("campo2");
    var c3 = url.searchParams.get("campo3");
        c4 = url.searchParams.get("campo4");
      if(c4 == null){
          $('#account').removeAttr('id');
      }else {
          $('#usuario').hide(); 
      }
    if (c3 == null){
      busquedaParametrizada(c1, c2);
    }else {
        busquedaGenero(c3);
    }

      console.log(c1,c2);
  }
  function busquedaGenero(c3){
      let genero ="";
      if(c3 == "women"){
          genero = "F";
      }else{
          genero = "M";
      }

      var request = $.ajax({
          url: '../Model/buscarProductoG.php', 
          type:'POST', 
          dataType:'html', 
          data: {genero:genero}
      }); 

  request.done(function(data){
    var response = JSON.parse(data);
    desplegarBusqueda(response);
    console.log(response);

  }); 


  }
function busquedaParametrizada(genero , valor){
  if (genero ==  "w search"){
    genero = "F";
  }else {
    genero = "M";
  }



  event.preventDefault(); 
  var request = $.ajax({
    url: '../Model/buscarProducto.php',
    type: 'POST', 
    dataType:'html', 
    data : {genero: genero, valor:valor}
  })

  request.done(function(data){
    var response = JSON.parse(data);
    desplegarBusqueda(response);
    console.log(response);

  }); 
}


function desplegarBusqueda(array){

    
    console.log(array);
    
    arr = array;

    var tabla = [];
    for(let i = 0 ; i< array.productos.length ; i ++){ 
      console.log(i);
      tabla += `
      <div class="swiper-slide">
          <div class="card">
              <a href=""><img src="${array.productos[i].imagen}"></a>
              <div class="card-section">
                  <a href=""><p id="title" class="titulo"> ${array.productos[i].titulo} </p></a>
                  <a href=""><p class="descrip">${array.productos[i].descripcion}</p></a>
                  <button class="button secondary descrip expanded producto" onclick="selectProducto(${i})"> See More </button>
              </div>
          </div>
      </div>`;
      
    }
    
    swiper.appendSlide(tabla);

    
  }

  function selectProducto(i){
    console.log(i);

    window.location.href = `seleccionarProducto.html?imagen=${arr.productos[i].imagen}&id=${arr.productos[i].id}&titulo=${arr.productos[i].titulo}&descripcion=${arr.productos[i].descripcion}&campo4=${c4}`;
  }

  $('#recover').click(function(){
    olvidarContrasena();
  })