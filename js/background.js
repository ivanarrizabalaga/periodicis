
//--------------------
//Services
//--------------------
var  URL_VISIT_SERVICE="http://www.periodicis/visit?url=";

function launchVisit(story){
	var xhr = new XMLHttpRequest();
	var ajaxRequest= URL_VISIT_SERVICE+encodeURIComponent(story.url);
	xhr.open("GET", ajaxRequest, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			//
			var urlStats = JSON.parse(xhr.responseText);
			//TODO recoger resultados y actualizar objeto
			//story.clicks=urlStats.clicks;
		}
	}
	xhr.send();
}

function launchProcess(story){
	//1. Enrich own story
		//TODO adding extra info from server
	story.clicks=getRandom(5000,25000);
	story.rate=getRandom(0,5);
	story.related=[];	
	story.logo=config[parseUri(story.url).domain].logo;
	//2. Get related stories
	launchRelated(story,config[parseUri(story.url).domain].feeds);
}

//1. From RSS Feeds via Google Feed Reader (1hour cache delay)
function launchRelated(story,feeds){	
	for (var i=0;i<feeds.length;i++){
		launchFeed(story,feeds[i],(i==feeds.length-1?true:false));
	}
}

//--------------------
//Visual Helpers
//--------------------
function updateBadge(tabId,data){
	//No data no badge
	if (!data){
		printBadge("",[0,0,0,0],tabId);
		return;
	}
	//Data ok, (related==0?"red + --": "green + size";
	if (data.related.length>0){
		textValue=""+data.related.length;
		colorValue=[0,208, 24, 255];
	}else{
		textValue="--";
		colorValue=[208, 0, 24, 255];
	
	}
	printBadge(textValue,colorValue,tabId);
}

function printBadge(textValue, colorValue, tabIdValue){
	chrome.browserAction.setBadgeText({text: textValue,tabId:tabIdValue});
	chrome.browserAction.setBadgeBackgroundColor({color: colorValue,tabId:tabIdValue});
}

//Return a random number between [1-max]
function getRandom(min,max){
	return Math.floor(Math.random()*max)+min;
}

//--------------------
//Listeners
//--------------------

//Kind of listener since its called from and async routines once they are done
function storeData(url,story){
	localStorage.removeItem(url);
	localStorage.setItem(url,JSON.stringify(story));
	//TO CHECK
	chrome.tabs.getSelected(null, function (tab){
		if (tab.url == url)
			updateBadge(tab.id,story);
	})
}
//Listener ready to get info from the content_script
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		//0. Call Ajax Visit service
		//launchVisit(request);
		//1. Everything is Async from this point
		launchProcess(request);	
	}
);
  
//Listener in charge of updating badge when tab changes

chrome.tabs.onSelectionChanged.addListener(
	function(tabId, selectedInfo) {
		console.log("onSelectionChanged tab");
		chrome.tabs.get(tabId,function (tab){
			if (localStorage.getItem(tab.url)){
				data=JSON.parse(localStorage.getItem(tab.url));
				updateBadge(tab.id,data);
			}
		})
	}
);

//Listener in charge of updating badge when tab is loaded

chrome.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab){
		console.log("onUpdate tab");
		if (localStorage.getItem(tab.url)){
				data=JSON.parse(localStorage.getItem(tab.url));
				updateBadge(tab.id,data);
		}
	}
);


