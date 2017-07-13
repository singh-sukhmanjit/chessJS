var position=[];

var sqSize = 80;

var pieces = [
	{
		name:'pawn',
		movement:'straight',
		white : [
			[2,1], [2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8]
		],
		black : [
			[7,1], [7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8]
		]
	},
	{
		name:'rook',
		movement:'straight',
		white : [[1,1],[1,8]],
		black : [[8,1],[8,8]]
	},
	{
		name:'knight',
		movement:'two_and_half',
		white : [[1,2],[1,7]],
		black : [[8,2],[8,7]]
	},
	{
		name:'bishop',
		movement:'diagonal',
		white : [[1,3],[1,6]],
		black : [[8,3],[8,6]]
	},
	{
		name:'king',
		movement:'single',
		white : [[1,5]],
		black : [[8,5]]
	},
	{
		name:'queen',
		movement:'straight_diagonal',
		white : [[1,4,'wq']],
		black : [[8,4,'bq']]

	}

];

for(var i=1; i <= 8; i++){

	position[i] = [];

	for(var j=1; j <= 8;j++){

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

	for(var k = 0; k < pieces.length; k++){

		var piece = pieces[k]; 
		
		for(var l = 0; l < piece.white.length; l++) {

			var position = piece.white[l];
			
			if(i == position[0] && j == position[1]) {

				box.append('<p class="white_piece">'+piece.name+'</p>');

				if(position[2] != null)
					box.find("p:eq(1)").attr("id",position[2]);

			}
		}
	
		for(var l = 0; l < piece.black.length; l++) {

			var position = piece.black[l];
			
			if(i == position[0] && j == position[1]) {
				box.append('<p class="black_piece">'+piece.name+'</p>');

				if(position[2] != null)
					box.find("p:eq(1)").attr("id",position[2]);
			}
		}
	}
}


function piece(box, i , j) {
		if(i==1){
			box.append($('<p class="black"></p>')).find('p').text(i+" "+j);
		}
		if(i==6){
			box.append($('<p class="white"></p>')).find('p').text(pieces[0].name);
		}
		if(i==0){
			if((j==0)||(j==7)){
				box.append($('<p class="black"></p>')).find('p').text(pieces[1].name);
			}
		}
		if(i==7){
			if((j==0)||(j==7)){
				box.append($('<p class="white"></p>')).find('p').text(pieces[1].name);
			}
		}
		if(i==0){
			if((j==1)||(j==6)){
				box.append($('<p class="black"></p>')).find('p').text(pieces[2].name);
			}
		}
		if(i==7){
			if((j==1)||(j==6)){
				box.append($('<p class="white"></p>')).find('p').text(pieces[2].name);
			}
		}
		if(i==0){
			if((j==2)||(j==5)){
				box.append($('<p class="black"></p>')).find('p').text(pieces[3].name);
			}
		}
		if(i==7){
			if((j==2)||(j==5)){
				box.append($('<p class="white"></p>')).find('p').text(pieces[3].name);
			}
		}
		if(i==0){
			if(j==3){
				box.append($('<p class="black"></p>')).find('p').text(pieces[4].name);
			}
		}
		if(i==7){
			if(j==3){
				box.append($('<p class="white"></p>')).find('p').text(pieces[4].name);
			}
		}
		if(i==0){
			if(j==4){
				box.append($('<p class="black"></p>')).find('p').text(pieces[5].name);
			}
		}
		if(i==7){
			if(j==4){
				box.append($('<p class="white"></p>')).find('p').text(pieces[5].name);
			}
		}
}