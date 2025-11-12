
let lamparas = [];

function setup() {
  createCanvas(displayWidth, displayHeight, true);
  
  
  for (let i = 0; i < 30; i++) {
    let x = random(100, width - 100);
    let y = random(height - 150, height - 50);
    lamparas.push(new Lampara(x, y));
  }
}

function draw() {
  background(30, 30, 45); // 
  
  let cursorMano = false;
  

  for (let i = 0; i < lamparas.length; i++) {
    lamparas[i].show();
    
    if (lamparas[i].estaSobreInterruptor(mouseX, mouseY) || lamparas[i].estaSobreCuerpo(mouseX, mouseY)) {
      cursorMano = true;
    }
  }
  
  if (cursorMano) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}


function mousePressed() {
  for (let i = lamparas.length - 1; i >= 0; i--) {
    
    // Interruptor (encender/apagar y cambiar color)
    if (lamparas[i].estaSobreInterruptor(mouseX, mouseY)) {
      lamparas[i].tirarDelCable();
      break;
    }
    // Cuerpo (arrastrar)
    else if (lamparas[i].estaSobreCuerpo(mouseX, mouseY)) {
      lamparas[i].empezarArrastre();
      break;
    }
  }
}

function mouseDragged() {
  for (let i = 0; i < lamparas.length; i++) {
    lamparas[i].arrastrar();
  }
}

function mouseReleased() {
  for (let i = 0; i < lamparas.length; i++) {
    lamparas[i].soltarArrastre();
  }
}
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

class Lampara {

  constructor(x, y) {
    this.x = x; 
    this.y = y; 
    
    this.encendida = false;
    this.colorPantalla = color(random(150, 255), random(100, 200), random(100, 200));
    
    
    this.arrastrando = false;
    this.offsetX = 0;
    this.offsetY = 0;
    
    // Posición del interruptor 
    this.interruptorRelX = 15; 
    this.interruptorRelY = -40; 
    this.radioInterruptor = 4;
  }

  show() {
    push();
    translate(this.x, this.y); 
    
    // Luz 
    if (this.encendida) {
      noStroke();
      fill(255, 255, 180, 100); 
      quad(-40, -75, 40, -75, 90, 0, -90, 0); 
      fill(255, 255, 200, 180);
      ellipse(0, -80, 15, 15);
    }
    
    // El tronco y la base
    stroke(0); 
    strokeWeight(3);
    line(0, 0, 0, -85);     
    line(-25, 0, 25, 0);    
    
    // Cabeza 
    fill(this.colorPantalla); 
    stroke(0);
    strokeWeight(2);
    quad(-30, -85, 30, -85, 40, -75, -40, -75);

    // La cuerda y el interruptor
    stroke(50);
    strokeWeight(1.5);
    line(this.interruptorRelX, -75, this.interruptorRelX, this.interruptorRelY);
    fill(100);
    noStroke();
    circle(this.interruptorRelX, this.interruptorRelY, this.radioInterruptor * 2); 
    
    pop();
  }
  
  
   estaSobreInterruptor(px, py) {
    let d = dist(px, py, this.x + this.interruptorRelX, this.y + this.interruptorRelY);
    return d < this.radioInterruptor + 5; 
  }
  
  estaSobreCuerpo(px, py) {
    return (px > this.x - 40 &&
            px < this.x + 40 &&
            py > this.y - 90 &&
            py < this.y);
  }

  tirarDelCable() {
    this.encendida = !this.encendida; 
    this.colorPantalla = color(random(150, 255), random(100, 200), random(100, 200));
  }
  
  empezarArrastre() {
    this.arrastrando = true;
    this.offsetX = this.x - mouseX;
    this.offsetY = this.y - mouseY;
  }
  
  arrastrar() {
    if (this.arrastrando) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }
  
  soltarArrastre() {
    this.arrastrando = false;
  }
}