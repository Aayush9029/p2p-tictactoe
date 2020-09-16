// Board properties
let board = [0,0,0,0,0,0,0,0,0]
let boxes = []
let size = 150

// Turn properties
let turn = "X"
let current_player = "O"



function setup(){
  let cnv = createCanvas(size*3, size*3)
  cnv.parent('sketch-holder');


  for (let i = 0; i < board.length; i++) {
    if (i <= 2){
      boxes.push(new Boxy(i * size, 0, size, size, i))
    }else if(i > 2 && i <= 5){
      boxes.push(new Boxy(i * size - size*3, size, size, size, i))
    }else{
      boxes.push(new Boxy(i * size - size*6, size*2, size, size, i))
    }
  }
}

function draw(){
  background(51)
  boxes.forEach(box=>{
    box.show()
  })
  
}


class Boxy{
  constructor(x, y, w, h, i){
      this.x = x
      this.y = y
      this.w = w
      this.h = h
      this.i = i
      this.clickedBy = null
  }
  update(){
      
  }
  show(){
    fill(200, 229, 205)
    rect(this.x, this.y, this.w, this.h)


    fill(0, 22, 22)
    stroke(0)
    // text(this.i, this.x + this.w/2, this.y + this.w/2)
    if(this.clickedBy){
      fill(0, 125)
      textSize(80)
      textAlign(CENTER,CENTER)
      text(this.clickedBy, this.x + this.w/2, this.y + this.w/2)

    }
  }
  peer_picked(){
    this.clickedBy = "1"
  }
}

function mouseClicked(){
  if(turn === current_player){
  boxes.forEach(box =>{
    if(mouseX > box.x && mouseX < box.x + box.w){
      if(mouseY > box.y && mouseY < box.y + box.h){
        if (box.clickedBy ==null){
          
        box.clickedBy = current_player
        SendMessage(box.i)
        if(turn == "X"){
          turn = "O"
        }else{
          turn = "X"
        }
        }
        document.getElementById("turn").innerHTML="Player's turn: "+turn
        document.getElementById("which_player").innerHTML="You are: "+ current_player

      }
    }
  })
}
  console.log("current Player : " + current_player)
  console.log("Turn : " + turn)

}