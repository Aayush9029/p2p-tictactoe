var conn;
var peer = new Peer();
let peer_id_number;
let isIdHidden = true;
let connected = false;
let errorShown = false;

peer.on("open", function (id) {
  peer_id_number = id;
  // console.log("My game ID is:" + id);
 if (isIdHidden){
   document.getElementById("peerIdDisplay").innerHTML = "●●●●●●●●●●●";

 }else{
  document.getElementById("peerIdDisplay").innerHTML = id;

 }

});


function ConnectToPeer(peerId_auto="") {
  
  if (document.getElementById("peerIdTxtBox").value.length > 4 && peerId_auto.length < 2 && !connected) {
    connected = true;

    var peerId = document.getElementById("peerIdTxtBox").value;
    let error = false;
    // console.log(peerId);
    conn = peer.connect(peerId);
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML =
      "connecting to " + peerId + ".....";

    
    peer.on("error", function (err) {
      error = true;
      // console.log(err);
      document.getElementById("error").innerHTML =
        "Could not connect to peer " + peerId + ", try again :(";
    });

    setTimeout(function () {
      if (!error) {
        document.getElementById("error").innerHTML = "connected :)";
        connected = true;
        document.getElementById("peer_id").innerHTML = "<span class='dot'></span> Connected to: "+peerId.slice(0, 5) + "..."
      }
    }, 5300);

    setTimeout(function () {
      document.getElementById("error").style.display = "none";
    }, 10000);
  }else if(peerId_auto.length > 2  && !connected){
    connected = true;

    peerId = peerId_auto
    let error = false;
    // console.log(peerId);
    conn = peer.connect(peerId);
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML =
      "connecting to " + peerId + ".....";

    
    peer.on("error", function (err) {
      error = true;
      // console.log(err);
      document.getElementById("error").innerHTML =
        "Could not connect to peer " + peerId + ", try again :(";
    });

    setTimeout(function () {
      if (!error) {
        document.getElementById("error").innerHTML = "connected :)";
        document.getElementById("peer_id").innerHTML = "<span class='dot'></span> Connected to: "+peerId.slice(0, 5) + "..."
      }
    }, 5300);

    setTimeout(function () {
      document.getElementById("error").style.display = "none";
    }, 10000);
   
  }
}
peer.on("connection", function (conn) {

  console.log("peer connected");
  console.log(conn.peer)
  ConnectToPeer(peerId_auto=conn.peer)


  conn.on("open", function () {
    console.log("conn open");
  });
  conn.on("data", function (data) {
    console.log("recieved: "+data)
    
    if(turn != current_player){
      boxes.forEach(box =>{

        if(box.i == data){
          if(box.clickedBy == null){
          box.clickedBy = turn
          if(turn == "X"){
            turn = "O"
          }else{
            turn = "X"
          }
          }else{
            console.log("box already selected:")
            console.log(box.clickedBy)
          }
        }
      })
      

        document.getElementById("turn").innerHTML="Player's turn: "+turn
        document.getElementById("which_player").innerHTML="You are: "+current_player
      
    }
  })
});

function SendMessage(payload) {
  if (connected) {
    
      conn.send(payload);
      print("sending" + payload)
    
  } else {
    if (!errorShown) {
      console.log(payload)
    }
  }
}

function hideId() {
  if (!isIdHidden) {
    document.getElementById("peerIdDisplay").innerHTML = "●●●●●●●●●●●";
    document.getElementById("hideIdBtn").innerHTML = "Show Game ID";
    isIdHidden = true;
  } else {
    document.getElementById("peerIdDisplay").innerHTML = peer_id_number;
    document.getElementById("hideIdBtn").innerHTML = "Hide Game ID";
    isIdHidden = false;
  }
}

function copyId() {
  document.getElementById("notification").innerHTML =
    "Failed to copy link to clipboard";
  navigator.clipboard.writeText(peer_id_number).then(() => {
    document.getElementById("notification").innerHTML =
      "Copied Game Id to clipboard";
  });
  document.getElementById("notification").style.animation = "nanimation 2s 1";

  setTimeout(function () {
    document.getElementById("notification").style.animation = "";
    // console.log("ckear");
  }, 3500);
}



function sharePlayerInfo(){
}