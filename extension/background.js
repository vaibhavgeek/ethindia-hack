try{

	//ON page change
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	  if(changeInfo.status == 'complete'){
		alert("Alert");
	  //if (changeInfo.url) {
		chrome.scripting.executeScript({
		  files: ['contentScript.js'],
		  target: {tabId: tab.id}
		});
	  //}
	  }
	});
	
  
  
  }catch(e){
	console.log(e);
  }