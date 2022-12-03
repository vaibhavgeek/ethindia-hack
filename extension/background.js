try{
	function getHistoryFromChrome(history){
		console.log("history", history);
		const injectElement = document.createElement('div');
		history.forEach((item) => {
			injectElement.innerHTML += item.title + " <br/>"; 
		});
		document.body.appendChild(injectElement);
	}
	//ON page change
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	  if(changeInfo.status == 'complete'){
		chrome.history.search({
			'text': '',
			'maxResults': 75
	 	}, function(historyItem) {
			chrome.scripting.executeScript({
				function: getHistoryFromChrome,
				target: {tabId: tab.id},
				args:  [history=historyItem]
			  });
	 	});		
	  }
	});
  
  }catch(e){
	console.log(e);
  }