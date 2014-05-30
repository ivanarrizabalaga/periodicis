//--------------------
//Global variables
//--------------------
//Loading flags
var isRelatedLoaded=false;
var isTopLoaded=false;
//Data containers
var currentStory={};
var relatedStories=[];
var topStory={};

var MAX_AUTHOR_SIZE = 23;
var MAX_TAGS_SIZE = 30;
var MAX_TITLE_SIZE = 80;
var MAX_DESCRIPTION_SIZE = 120;
var SHOW_CLICKS = true;

//--------------------
//Helper's and Visual
//--------------------

function i18n(msg){
	document.write(chrome.i18n.getMessage(msg));
}

function i18nTpl(msg){
	return chrome.i18n.getMessage(msg);
}

function formatDate(date){
	var resul=date.toLocaleTimeString()+" - ";
		//en: mm/dd/YYYY
	if (chrome.i18n.getMessage("locale") == "en"){
		resul+= (date.getMonth()+1)+"/";
		resul+= date.getDate()+"/";
	}else{
		//es: dd/mm/YYYY
		resul+= date.getDate()+"/";
		resul+= (date.getMonth()+1)+"/";				
	}
	resul+=date.getFullYear();
	return resul;
}

//Short a string without cutting any word
function shortString(text,maxLength){
	if (text.length<maxLength) return text;
	var resul = text.substr(0, maxLength);
	//re-trim if we are in the middle of a word
	return resul.substr(0, Math.min(resul.length, resul.lastIndexOf(" ")));
}
//Short a string to max size + "..."
function shortAndStyle(text,maxLength){
	//Adjust text to max title size
	var shortText=shortString(text,maxLength-3);
	//If adjustment was required add "..." to show it
	if (shortText.length!=text.length) 
		shortText+="...";
	return shortText;
}

function showCurrent(data){	
	//Adjust Title to max title size
	var shortTitle=shortAndStyle(data.title,MAX_TITLE_SIZE-3);
	//Adjust Description to max title size
	data.description=shortAndStyle(data.description,MAX_DESCRIPTION_SIZE-3);	
	//Show title
	$( "#writeTpl" ).tmpl( {data:shortTitle}).appendTo( "#title" );
	//Show current info
	$( "#currentTpl" ).tmpl( data ).appendTo( "#current" );
	$('#rateCurrent').rateit();
}

function showRelated(related){
	//Turn dates "string" into dates "Date"
	for (var i=0;i<related.length;i++){
		related[i].date=new Date(related[i].date);
	}
	$( "#relatedTpl" ).tmpl( related ).appendTo( "#slider_inner" );
	$('.rateit').rateit();
}

function showTop(top){
	$( "#topTpl" ).tmpl( top ).appendTo( "#top" );
}

function showCounter(related){
	$( "#writeTpl" ).tmpl({data:related.length}).appendTo( "#counter" );
}

//--------------------
//Controller
//--------------------

function init(){	
	chrome.tabs.getSelected(null, show);
}

function show(tab){
	//Something to show?
	var data=localStorage.getItem(tab.url);
	//status: -1=no a news page| 0: a news page non related | 1: page with related
	var status=1;
	if (!data) 
		status=-1;
	else {
		data=JSON.parse(data);
		if (data.related.length==0) 
		status =0;
	}
		
	switch (status){
	case -1:
		//show title NO_STORIES
		$( "#writeTpl" ).tmpl( {data:chrome.i18n.getMessage("no_stories")}).appendTo( "#title" );
		break;
	case 0:
		//Show content
		$('#content').removeClass('hidden');
		//Show noneRelated NO_STORIES
		$('#noneRelated').removeClass('hidden');
		$( "#writeTpl" ).tmpl( {data:chrome.i18n.getMessage("no_stories")}).appendTo( "#noneRelated" );
		//Hide related
		$('#slider').addClass('hidden');
		//Hide top
		$('#top').addClass('hidden');
		//Show current
		showCurrent(data);
		break;
	case 1:
		//Show content
		$('#content').removeClass('hidden');
		//Show current
		showCurrent(data);
		//Show related
		showRelated(data.related);
		//Show counter
		showCounter(data.related);			
		//Show top
		showTop(data.related[0]);
		//launch Visual paging
		$(".wrapper-paging").show();
		NOTICIAS.paginate('#slider_inner', 1);		
		break;
	}
}

//--------------------
//Launcher
//--------------------

document.addEventListener("DOMContentLoaded", init, !1);


