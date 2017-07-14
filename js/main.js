var position=[];

var sqSize = 80;

var pieces = [
	{
		name:'pawn',
		movement:'straight',
		white : [
			[2,1,'wp1'], [2,2,'wp2'],[2,3,'wp3'],[2,4,'wp4'],[2,5,'wp5'],[2,6,'wp6'],[2,7,'wp7'],[2,8,'wp8']
		],
		black : [
			[7,1,'bp1'], [7,2,'bp2'],[7,3,'bp3'],[7,4,'bp4'],[7,5,'bp5'],[7,6,'bp6'],[7,7,'bp7'],[7,8,'bp8']
		]
	},
	{
		name:'rook',
		movement:'straight',
		white : [[1,1,'wr1'],[1,8,'wr2']],
		black : [[8,1,'br1'],[8,8,'br2']]
	},
	{
		name:'knight',
		movement:'two_and_half',
		white : [[1,2,'wn1'],[1,7,'wn2']],
		black : [[8,2,'bn1'],[8,7,'bn2']]
	},
	{
		name:'bishop',
		movement:'diagonal',
		white : [[1,3,'wb1'],[1,6,'wb2']],
		black : [[8,3,'bb1'],[8,6,'bb2']]
	},
	{
		name:'king',
		movement:'single',
		white : [[1,5,'wk1']],
		black : [[8,5,'bk1']]
	},
	{
		name:'queen',
		movement:'straight_diagonal',
		white : [[1,4,'wq1']],
		black : [[8,4,'bq1']]

	}

];

for(var i=1; i <= 8; i++){

	position[i] = [];

	for(var j=1; j <= 8;j++) {

		position[i].push({
			a : i,
			b : j
		});

		var cls = "s"+i+"x"+j;

		var	square=$('<div id="'+ cls + '" class="square"></div>');

		$('#chess_board').append(square);

		var box = $('#'+cls);

		box.append('<p>'+cls+'</p><br />');

		box.css("top",Math.abs(i-8) * sqSize).css("left",(j - 1) * sqSize);

		if((i+j)%2 !== 0){
			box.addClass('white');
		}
		else{
			box.addClass('black');
		}

		ps(box,i , j);
	}
}

function ps (box, i , j) {

	for(var k = 0; k < pieces.length; k++) {

		var piece = pieces[k]; 
		
		for(var l = 0; l < piece.white.length; l++) {

			var position = piece.white[l];
			
			if(i == position[0] && j == position[1]) {

				box.append('<p class="white_piece">'+piece.name+'</p>');

				if(position[2] != null)
					box.find("p:eq(1)").attr("id",position[2]).draggable();

			}
			$('#s'+i+'x4').droppable({drop: handleDropEvent});
		}
	
		for(var l = 0; l < piece.black.length; l++) {

			var position = piece.black[l];
			
			if(i == position[0] && j == position[1]) {
				box.append('<p class="black_piece">'+piece.name+'</p>');

				if(position[2] != null)
					box.find("p:eq(1)").attr("id",position[2]).draggable({
						containment:'#chess_board',
						revert: true});
					
			}
			$('#s'+i+'x4').droppable({drop: handleDropEvent});
		}
	}
}

function handleDropEvent( event, ui ) {
  var draggable = ui.draggable;
  alert( 'Dropped successfully!' );
}