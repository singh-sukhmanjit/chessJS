var position = [];

var sqSize = 80;

var selectedPiece = null;

var picesSquare = null;

var movements = [];

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

var movement = [
  {
    piece: "pawn",
    moves: [
      ["3x1"],
      ["3x2"],
      ["3x3"],
      ["3x4"],
      ["3x5"],
      ["3x6"],
      ["3x7"],
      ["3x8"]
    ]
  }
];

var Bishop = {
  moveTo: function(piece) {
    var x = parseInt(piece.position.x);
    var v = parseInt(piece.position.y);
  },
  showMovable: function(piece) {
    var x = parseInt(piece.position.x);
    var v = parseInt(piece.position.y);

    movements = [];

    while (x >= 1 && x <= 8 && y >= 1 && y <= 8) {
      movements.push({ x: x, y: y });
      x++;
      y++;
    }

    var x = piece.position.x;
    var y = piece.position.y;

    while (x >= 1 && x <= 8 && y >= 1 && y <= 8) {
      //   console.log("1st" + x + "x" + y);
      movements.push({ x: x, y: y });
      x++;
      y++;
    }

    for (var i = 0; i < movements.length; i++) {
      console.log(movements[i]);
      var cls = "#s" + movements[i].x + "x" + movements[i].y;

      console.log(cls);
      $(cls).addClass("placeable");
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
  }
  if (id !== null) {
    selectedPiece = $("#" + id);
    console.log(selectedPiece);
  } else {
    selectedPiece = null;
  }
}

function pawn(pcs, sq) {
  if (pcs !== (null || undefined) && sq !== (null || undefined)) {
    var i = sq.charAt(1);
    var j = sq.charAt(3);
    i = i + 1;
    picesSquare = [i, j];
  }

  console.log(picesSquare);
  return picesSquare;
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
  switch (pc.name) {
    case "bishop":
      Bishop.showMovable(pc);
      break;
  }

  var pcs = e.currentTarget.innerHTML;
  var sq = e.target.parentElement.id;

  if (pcs === "pawn(W)") {
    pawn(pcs, sq);
  }

  e.stopPropagation();
  // console.log(e);
});

$(".square").click(function(e) {
  if (selectedPiece !== null) {
    var pc = checkPiece(selectedPiece.attr("id"));
    if (pc.name == "pawn") {
      var tes = pawn()[0];
      //   console.log(tes);
      if (
        e.target.id.search(pawn()[0]) === 1 &&
        e.target.id.search(pawn()[1]) === 3
      ) {
        // console.log(e.target.id);
      }
    } else {
        console.log({x: parseInt(this.id[1]), y: parseInt(this.id[3])});

        // Incomplete login for moving the piece. Working on it
      if (movements.indexOf({x: parseInt(this.id[1]), y: parseInt(this.id[3])}) !== 0) {
        selectedPiece.detach().appendTo("#" + this.id);
        selectPiece();
      }
    }
  }
});

(function loop() {
  if (selectedPiece !== null) {
    selectedPiece.addClass("selected");
  }

  console.log(".");
  setTimeout(loop, 1000 / 30);
})();
