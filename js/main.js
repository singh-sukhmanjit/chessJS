var position = [];  //array of position for initial placement of pieces

var sqSize = 80;  //square size is 80*80px

var selectedPiece = null;

var piecesSquare = null;

var movements = []; //array of available movements

var pieces = [
  {
    name: "pawn",
    white: [
      { id: "wp1", position: [2, 1] },
      { id: "wp2", position: [2, 2] },
      { id: "wp3", position: [2, 3] },
      { id: "wp4", position: [2, 4] },
      { id: "wp5", position: [2, 5] },
      { id: "wp6", position: [2, 6] },
      { id: "wp7", position: [2, 7] },
      { id: "wp8", position: [2, 8] }
    ],
    black: [
      { id: "bp1", position: [7, 1] },
      { id: "bp2", position: [7, 2] },
      { id: "bp3", position: [7, 3] },
      { id: "bp4", position: [7, 4] },
      { id: "bp5", position: [7, 5] },
      { id: "bp6", position: [7, 6] },
      { id: "bp7", position: [7, 7] },
      { id: "bp8", position: [7, 8] }
    ]
  },
  {
    name: "rook",
    white: [{ id: "wr1", position: [1, 1] }, { id: "wr2", position: [1, 8] }],
    black: [{ id: "br1", position: [8, 1] }, { id: "br2", position: [8, 8] }]
  },
  {
    name: "knight",
    white: [{ id: "wn1", position: [1, 2] }, { id: "wn2", position: [1, 7] }],
    black: [{ id: "bn1", position: [8, 2] }, { id: "bn2", position: [8, 7] }]
  },
  {
    name: "bishop",
    white: [{ id: "wb1", position: [1, 3] }, { id: "wb2", position: [1, 6] }],
    black: [{ id: "bb1", position: [8, 3] }, { id: "bb2", position: [8, 6] }]
  },
  {
    name: "king",
    white: [{ id: "wk1", position: [1, 5] }],
    black: [{ id: "bk1", position: [8, 5] }]
  },
  {
    name: "queen",
    white: [{ id: "wq1", position: [1, 4] }],
    black: [{ id: "bq1", position: [8, 4] }]
  }
];

var Bishop = {
  showMovable: function(piece) {
    var x = parseInt(piece.position.x);

    var y = parseInt(piece.position.y);
    movements = [];
    // each variable will have reference from x and y
    var b1, b2, b3, b4, b5, b6, b7, b8;
    b1 = b3 = b5 = b7 = x;
    b2 = b4 = b6 = b8 = y;
    //loop runs 7 times as bishop has to move maximum of 7 squares at a time. eg 1x8 to 8x1
    for (var i = 0; i < 7; i++) {
      b1++;
      b2++;
      movements.push({ x: b1, y: b2 });
      b3++;
      b4--;
      movements.push({ x: b3, y: b4 });
      b5--;
      b6--;
      movements.push({ x: b5, y: b6 });
      b7--;
      b8++;
      movements.push({ x: b7, y: b8 });
    }

    for (var i = 0; i < movements.length; i++) {
      // console.log(movements[i]);
      var cls = "#s" + movements[i].x + "x" + movements[i].y;

      // console.log(cls);
      $(cls).addClass("placeable");
    }
    return movements;
  }
};

var Pawn = {
  showMovable: function(piece) {
    var x = parseInt(piece.position.x);
    var y = parseInt(piece.position.y);
    movements = [];

    //loop runs once because pawn moves one step at a time
    for (var i = 0; i < 1; i++) {
      x++; //only value of x needs to be incremented, as pawn moves straight
      movements.push({ x: x, y: y }); //possible moves are stored in movement[]
    }

    for (var i = 0; i < movements.length; i++) {
      var cls = "#s" + movements[i].x + "x" + movements[i].y; //eg cls = s2x5
      $(cls).addClass("placeable"); //placeable class added to all possible moves
    }
    return movements;
  }
};

var Knight = {
  showMovable: function(piece) {
    var x = parseInt(piece.position.x);
    var y = parseInt(piece.position.y);
    movements = [];
    
    //loop runs once because pawn moves one step at a time
    for (var i = 0; i < 1; i++) {
      var k1, k2; //value of x & y will remain same and will be used for reference
      //if value of x is changed by 2 then y will be changed by 1 and vice-versa
      //max 8 moves possible from a given position
      k1 = x + 2;
      k2 = y + 1;
      movements.push({ x: k1, y: k2 });
      k1 = x + 2;
      k2 = y - 1;
      movements.push({ x: k1, y: k2 });
      k1 = x + 1;
      k2 = y + 2;
      movements.push({ x: k1, y: k2 });
      k1 = x + 1;
      k2 = y - 2;
      movements.push({ x: k1, y: k2 });
      k1 = x - 1;
      k2 = y + 2;
      movements.push({ x: k1, y: k2 });
      k1 = x - 1;
      k2 = y - 2;
      movements.push({ x: k1, y: k2 });
      k1 = x - 2;
      k2 = y + 1;
      movements.push({ x: k1, y: k2 });
      k1 = x - 2;
      k2 = y - 1;
      movements.push({ x: k1, y: k2 });
    }
    for (var i = 0; i < movements.length; i++) {
      // console.log(movements[i]);
      var cls = "#s" + movements[i].x + "x" + movements[i].y; //eg cls = s2x5

      // console.log(cls);
      $(cls).addClass("placeable"); //placeable class added to all possible moves
    }

    return movements;
  }
};

var Rook = {
  showMovable: function(piece) {
    var x = parseInt(piece.position.x);
    var y = parseInt(piece.position.y);
    movements = [];
    //4 variables for moves in 4 directions
    var r1, r2, r3, r4;
    r1 = r3 = x;
    r2 = r4 = y;
    //loop runs 7 times as rook has to move maximum of 7 squares at a time. eg 1x1 to 8x1
    for (var i = 0; i < 7; i++) {
      r1++;
      movements.push({ x: r1, y: y });
      r2++;
      movements.push({ x: x, y: r2 });
      r3--;
      movements.push({ x: r3, y: y });
      r4--;
      movements.push({ x: x, y: r4 });
    }

    for (var i = 0; i < movements.length; i++) {
      // console.log(movements[i]);
      var cls = "#s" + movements[i].x + "x" + movements[i].y; //eg cls = s2x5

      // console.log(cls);
      $(cls).addClass("placeable"); //placeable class added to all possible moves
    }

    // console.log(movements);

    return movements;
  }
};

var King = {
  showMovable: function(piece) {
    var x = parseInt(piece.position.x);
    var y = parseInt(piece.position.y);
    movements = [];

    var k1,k2;

    //loop runs once because pawn moves one step at a time
    for (var i = 0; i < 1; i++) {
      k1 = x + 1;
      movements.push({ x: k1, y: y }); //possible moves are stored in movement[]
      k1 = x + 1;
      k2 = y + 1;
      movements.push({ x: k1, y: k2 });
      k1 = x + 1;
      k2 = y - 1;
      movements.push({ x: k1, y: k2 });
      k2 = y - 1;
      movements.push({ x: x, y: k2 });
      k1 = x - 1;
      k2 = y - 1;
      movements.push({ x: k1, y: k2 });
      k1 = x - 1;
      movements.push({ x: k1, y: y });
      k1 = x - 1;
      k2 = y + 1;
      movements.push({ x: k1, y: k2 });
      k2 = y + 1;
      movements.push({ x: x, y: k2 });
    }

    for (var i = 0; i < movements.length; i++) {
      var cls = "#s" + movements[i].x + "x" + movements[i].y; //eg cls = s2x5
      $(cls).addClass("placeable"); //placeable class added to all possible moves
    }
    return movements;
  }
};

var Queen = {
  showMovable: function(piece) {
    var x = parseInt(piece.position.x);
    var y = parseInt(piece.position.y);
    movements = [];
    //4 variables for moves in 4 directions
    var q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12;
    q1 = q3 = q5 = q7 = q9 = q11 =x;
    q2 = q4 = q6 = q8 = q10 = q12 =y;
    //loop runs 7 times as rook has to move maximum of 7 squares at a time. eg 1x1 to 8x1
    for (var i = 0; i < 7; i++) {
      q1++;
      movements.push({ x: q1, y: y });
      q2++;
      movements.push({ x: x, y: q2 });
      q3--;
      movements.push({ x: q3, y: y });
      q4--;
      movements.push({ x: x, y: q4 });
      q5++;
      q6++;
      movements.push({ x: q5, y: q6 });
      q7++;
      q8--;
      movements.push({ x: q7, y: q8 });
      q9--;
      q10--;
      movements.push({ x: q9, y: q10 });
      q11--;
      q12++;
      movements.push({ x: q11, y: q12 });
    }

    for (var i = 0; i < movements.length; i++) {
      // console.log(movements[i]);
      var cls = "#s" + movements[i].x + "x" + movements[i].y; //eg cls = s2x5

      // console.log(cls);
      $(cls).addClass("placeable"); //placeable class added to all possible moves
    }

    // console.log(movements);

    return movements;
  }
};

for (var i = 1; i <= 8; i++) {
  position[i] = [];

  for (var j = 1; j <= 8; j++) {
    position[i].push({ a: i, b: j });

    var cls = "s" + i + "x" + j;

    var square = $('<div id="' + cls + '" class="square"></div>');

    $("#chess_board").append(square);

    var box = $("#" + cls);

    box.append("<p>" + cls + "</p><br />");

    box.css("top", Math.abs(i - 8) * sqSize).css("left", (j - 1) * sqSize);

    if ((i + j) % 2 !== 0) {
      box.addClass("white");
    } else {
      box.addClass("black");
    }
    setPieces(box, i, j);
  }
}

function setPieces(box, i, j) {
  for (var k = 0; k < pieces.length; k++) {
    var piece = pieces[k];
    var position;

    for (var l = 0; l < piece.white.length; l++) {
      position = piece.white[l].position;

      if (i === position[0] && j === position[1]) {
        box.append('<p class="piece white_piece">' + piece.name + "(W)</p>");
        box.find("p:eq(1)").attr("id", piece.white[l].id);
      }
    }

    for (var m = 0; m < piece.black.length; m++) {
      position = piece.black[m].position;

      if (i === position[0] && j === position[1]) {
        box.append('<p class="piece black_piece">' + piece.name + "(B)</p>");

        box.find("p:eq(1)").attr("id", piece.black[m].id);
      }
    }
  }
}

function selectPiece(id) {
  if (selectedPiece !== null) {
    selectedPiece.removeClass("selected");
    //if one piece is selected and anoher piece is clicked it will remove all movements
    $(".placeable").removeClass("placeable");
  }
  if (id !== null) {
    selectedPiece = $("#" + id);
  } else {
    selectedPiece = null;
  }
}

function checkPiece(id, sq) {
  if (id === (null || undefined)) return "Invalid Entry";

  var type;
  var name;

  switch (id[0]) {
    case "w":
      type = "white";
      break;
    case "b":
      type = "black";
      break;
    default:
      return "Invalid ID";
      break;
  }

  switch (id[1]) {
    case "p":
      name = "pawn";
      break;
    case "b":
      name = "bishop";
      break;
    case "n":
      name = "knight";
      break;
    case "r":
      name = "rook";
      break;
    case "k":
      name = "king";
      break;
    case "q":
      name = "queen";
      break;
    default:
      return "Invalid ID";
      break;
  }

  if (sq !== (null || undefined))
    return { name: name, type: type, position: { x: sq[1], y: sq[3] } };
  else return { name: name, type: type };
}

$(".piece").click(function(e) {
  selectPiece(this.id);
  var pc = checkPiece(this.id, e.target.parentElement.id);
  //Do not need multiple switch statements for the same logic.
  switch (pc.name) {
    case "bishop":
      Bishop.showMovable(pc);
      break;
    case "pawn":
      Pawn.showMovable(pc);
      break;
    case "knight":
      Knight.showMovable(pc);
      break;
    case "rook":
      Rook.showMovable(pc);
      break;
    case "king":
      King.showMovable(pc);
      break;
    case "queen":
      Queen.showMovable(pc);
      break;
  }
  e.stopPropagation();
});

$(".square").click(function(e) {
  if (selectedPiece !== null) {
    var pc = checkPiece(selectedPiece.attr("id")); //eg pc = wp4
    var ch=e.delegateTarget.lastChild.className;   //ch = piece white_piece
    var chk=ch.substr(6,16);    //chk = white_piece
    //@var move is set to false so that peice won't move at first
    var move = false;
    for (var i = 0; i < movements.length; i++) {
      var m = movements[i];
      //Checking the square if the position exists in the movements array and if it does @var move is set to true
      if (m.x == this.id[1] && m.y == this.id[3]) {
        move = true;
        break;
      }
    }
    if (move && chk!=='white_piece') {
      //moving piece if @var move is true
      selectedPiece.detach().appendTo("#" + this.id);
      selectPiece();
    } else {
      selectPiece();
      console.log("Invalid Move " + this.id);
    }
  }
});

(function loop() {
  if (selectedPiece !== null) {
    //if selectedPiece != null then selected class is added to that piece
    selectedPiece.addClass("selected");
  }

  console.log(".");
  setTimeout(loop, 1000 / 60);
})();
