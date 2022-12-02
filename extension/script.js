// get entire browsing history for first time use
async function getHistory(){
    chrome.history.search({
        'text': '',               // Return every history item....
        'startTime': oneWeekAgo,  // that was accessed less than one week ago.
        'maxResults': 100         // Optionally state a limit
    },
    function(historyItems) {
        // For each history item, get details on all visits.
        for (var i = 0; i < historyItems.length; ++i) {
        var url = historyItems[i].url;
        getEmbeddings(url);
        }
    });
}

// IPFS CID needs to be stored on chain 
async function storeCIDOnChain(cids,privateKey){

}

// get vector from browsing history 
async function getEmbeddings(text){
    // get vector NLP embeddings from API from specific text
}



// Create function to send data to send data to IPFS, returns CID. 
async function uploadToIPFS () {
    const node = await window.IpfsCore.create()
    // Ready to use!
    // See https://github.com/ipfs/js-ipfs#core-api
 }
