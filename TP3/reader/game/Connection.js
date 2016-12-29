function getPrologRequest(requestString, onSuccess, onError, port){
    var requestPort = port || 8081;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

    request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
    request.onerror = onError || function(){console.log("Error waiting for response");};

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
}




function makeRequest(requestString, state, type)
{
	
	 			
	console.log(requestString);
	
	// Make Request
	
	switch(type) {
		case 0:		// all possible moves for one player
			getPrologRequest(requestString, state.allMoves);
		break;
		case 1:		// best move for Bot
			getPrologRequest(requestString, state.bestMove);
		break;
		case 2:		// if its the end
			getPrologRequest(requestString, state.theEnd);
		break;
		
	}
	
	
	 
}
			
//Handle the Reply
function handleReply(data)
{
	console.log(data.target.response);
}