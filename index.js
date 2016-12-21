const altura = "40px";
var cuerpo;

var cuadro1 = new Cuadro(true);
var cuadro2 = new Cuadro(false);
var cuadro3 = new Cuadro(false);


var fichaSeleccionada;
var origen;
var destino;

function crearDiv(){
    var caja = document.createElement("div");
    return caja;
}

function over1() {
   over(cuadro1);
}

function over2() {
     over(cuadro2);
}

function over3() {
     over(cuadro3);
}

function over(Cuadro) {
  Cuadro.caja.style.backgroundColor = "#D8FFFF";

}
function out1(){
    out(cuadro1);
}

function out2(){
    out(cuadro2);
}

function out3(){
    out(cuadro3);
}

function out(Cuadro) {
  Cuadro.caja.style.backgroundColor = "white";
}
function click1() {
 cuadro1.elegido = !cuadro1.elegido;
    click(cuadro1);
}

function click2() {
 cuadro2.elegido = !cuadro2.elegido;
    click(cuadro2);
}

function click3() {
 cuadro3.elegido = !cuadro3.elegido;
    click(cuadro3);
}

function click(cuadro) {
 if (cuadro.elegido) {
    seleccionarOrigenDestino(cuadro);
 } else {
    cuadro.caja.style.borderColor = "black";
    reiniciarOrigenDestino();
  }
}

function rellenarContenido() {
  var contenido = new Array();

  for (var i = 0; i < 5; i++) {
    contenido[i] = new Relleno();
  }
  return contenido;

}

function rellenarFichas() {
  var contenido = new Array();

  contenido[0] = new Relleno();
  contenido[1] = new FichaS();
  contenido[2] = new FichaM();
  contenido[3] = new FichaL();
  contenido[4] = new FichaXL();
  return contenido;
}

function FichaS(){
  this.caja = crearDiv();
  this.caja.style.width = "10%";
  this.caja.style.height = altura;
  this.caja.style.backgroundColor = "#0088cc";
  this.caja.style.marginLeft = "auto";
  this.caja.style.marginRight = "auto";
  this.caja.style.borderRadius = "30px";
  this.valor = 0;
}

function FichaM() {
  this.caja = crearDiv();
  this.caja.style.width = "30%";
  this.caja.style.height = altura;
  this.caja.style.backgroundColor = "#979797";
  this.caja.style.marginLeft = "auto";
  this.caja.style.marginRight = "auto";
  this.caja.style.borderRadius = "30px";
  this.valor = 1;
}

function FichaL() {
  this.caja = crearDiv();
  this.caja.style.width = "50%";
  this.caja.style.height = altura;
  this.caja.style.backgroundColor = "#666666";
  this.caja.style.marginLeft = "auto";
  this.caja.style.marginRight = "auto";
  this.caja.style.borderRadius = "30px";
  this.valor = 2;
}

function FichaXL () {
  this.caja = crearDiv();
  this.caja.style.width = "70%";
  this.caja.style.height = altura;
  this.caja.style.backgroundColor = "#000000";
  this.caja.style.marginLeft = "auto";
  this.caja.style.marginRight = "auto";
  this.caja.style.borderRadius = "30px";
  this.valor = 3;
}

function Relleno() {
  this.caja = crearDiv();
  this.caja.style.width = "100%";
  this.caja.style.height = altura;

}

function Cuadro(cajaInicial) {
  this.caja = crearDiv();
  this.caja.style.width = "28%";
  this.caja.style.height = "200px";
  this.caja.style.marginLeft = "4%";
  this.caja.style.borderWidth = "2%";
  this.caja.style.border = "solid black";
  this.caja.style.float = "left";
  this.elegido = false;
  this.contenido;

  if(cajaInicial) {
    this.contenido = rellenarFichas();

  }
  else {
    this.contenido = rellenarContenido();
  }
  for (var i = 0; i < this.contenido.length; i++){
    this.caja.appendChild(this.contenido[i].caja);
  }

  this.tieneFichas = function() {
    var rellenos = 0;

    for(var i = 0; i < this.contenido.length; i++) {
      if(this.contenido[i] instanceof Relleno) {
            rellenos++;
      }

    }
    if(rellenos == this.contenido.length){
      return false;
    }else {
      return true;
    }
  };
  this.obtenerFichaSuperior = function() {

      for(var i = 0; i < this.contenido.length;i++) {
        if (!(this.contenido[i] instanceof Relleno)) {
             return this.contenido[1];
        }

      }
  };

  this.quitarFichaSuperior = function(){
    for(var i = 0; i < this.contenido.length; i++) {
     if (!(this.contenido[i] instanceof Relleno)) {
       fichaSeleccionada = this.contenido[i];
       this.contenido[i] = new Relleno();
       break;
     }
    }
  };

   this.insertarFichaSuperior = function() {

      for(var i = this.contenido.length - 1; i >= 0; i--) {
         if(this.contenido[i] instanceof Relleno) {
           this.contenido[i] = fichaSeleccionada;
           break;
         }
      }
   };

   this.redibujarCaja = function() {
        while(this.caja.hasChildNodes()) {
           this.caja.removeChild(this.caja.lastChild);
        }
        for(var i = 0; i < this.contenido.length; i++) {
          this.caja.appendChild(this.contenido[i].caja)
        }
   };

}

function seleccionarOrigenDestino(cuadro) {
      if(origen == undefined) {
        if(cuadro.tieneFichas()){
          cuadro.caja.style.borderColor = "red";
          origen = cuadro;
          origen.elegido = true;
        }
      } else if(origen != undefined && destino == undefined) {
            destino = cuadro;
            destino.elegido = true;

            if(origen != destino) {
              if(!destino.tieneFichas() || (origen.obtenerFichaSuperior().valor < destino.obtenerFichaSuperior().valor)) {
                 origen.quitarFichaSuperior();
                 origen.redibujarCaja();
                 destino.insertarFichaSuperior();
                 destino.redibujarCaja();
              }
            }
      }

      if(destino != undefined && origen != undefined) {
        reiniciarOrigenDestino();
      }
}

function reiniciarOrigenDestino() {
  if(origen != undefined) {

    origen.caja.style.borderColor = "black";
    origen.elegido = false;
  }
  if(destino != undefined) {
    destino.caja.style.borderColor = "black";
    destino.elegido = false;
  }

  origen = undefined;
  destino = undefined;

   cuadro1.elegido = false;
   cuadro2.elegido = false;
   cuadro3.elegido = false;
}

function iniciar() {
 cuerpo = document.getElementsByTagName("body")[0];

cuerpo.appendChild(cuadro1.caja);
cuerpo.appendChild(cuadro2.caja);
cuerpo.appendChild(cuadro3.caja);

 cuadro1.caja.addEventListener("mouseover", over1, false);
 cuadro2.caja.addEventListener("mouseover", over2, false);
 cuadro3.caja.addEventListener("mouseover", over3, false);

 cuadro1.caja.addEventListener("mouseout", out1, false);
 cuadro2.caja.addEventListener("mouseout", out2, false);
 cuadro3.caja.addEventListener("mouseout", out3, false);

 cuadro1.caja.addEventListener("click", click1,false);
 cuadro2.caja.addEventListener("click", click2,false);
 cuadro3.caja.addEventListener("click", click3,false);
}
window.addEventListener("load",iniciar,false);
