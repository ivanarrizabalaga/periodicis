//--------------------
//Helpers: Some sets, strings and DOM
//--------------------
Array.prototype.diff = function () {
    var a1 = this;
    var a = a2 = null;
    var n = 0;
    while (n < arguments.length) {
        a = [];
        a2 = arguments[n];
        var l = a1.length;
        var l2 = a2.length;
        var diff = true;
        for (var i = 0; i < l; i++) {
            for (var j = 0; j < l2; j++) {
                if (a1[i] === a2[j]) {
                    diff = false;
                    break;
                }
            }
            diff ? a.push(a1[i]) : diff = true;
        }
        a1 = a;
        n++;
    }
    return a.unique();
};

Array.prototype.unique = function () {
    var a = [];
    var l = this.length;
    for (var i = 0; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
            if (this[i] === this[j]) j = ++i;
        }
        a.push(this[i]);
    }
    return a;
};

//Return value for a xpath expression
function xpath(path, node) {
  return document.evaluate(path, node).iterateNext();
}
//Deleting accents and so
var diacriticsRemovalMap = [
    {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
	{'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},	
    {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
    {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
    {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
    {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
    {'base':'OI','letters':/[\u01A2]/g},
    {'base':'OO','letters':/[\uA74E]/g},
    {'base':'OU','letters':/[\u0222]/g},
    {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
    {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
    {'base':'aa','letters':/[\uA733]/g},
    {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
    {'base':'ao','letters':/[\uA735]/g},
    {'base':'au','letters':/[\uA737]/g},
    {'base':'av','letters':/[\uA739\uA73B]/g},
    {'base':'ay','letters':/[\uA73D]/g},
	{'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
    {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},	
    {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
    {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
    {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
    {'base':'oi','letters':/[\u01A3]/g},
    {'base':'ou','letters':/[\u0223]/g},
    {'base':'oo','letters':/[\uA74F]/g},
    {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
    {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
];
function removeDiacritics (str) {

    for(var i=0; i<diacriticsRemovalMap.length; i++) {
        str = str.replace(diacriticsRemovalMap[i].letters, diacriticsRemovalMap[i].base);
    }
    return str;
}

//return keywords from a string
String.prototype.getKeywords = function(){
	var noWords=['','a','aca','ademas','ahora','al','algo','alguna','algunas','alguno','algunos','ante','antes','aquel','aquella','aquello','aquellos','aqui','asi','aunque','bien','bueno','cada','casa','caso','cierto','como','con','conocer','contra','cosa','cree','creen','creer','cual','cuales','cuando','dar','de','deber','decir','dejar','del','desde','despues','dia','don','donde','dos','durante','el','en','entonces','entre','es','esa','eso','ese','estar','este','esto','estos','esta','estan','estas','ha','haber','hablar','hacer','hasta','ir','junto','la','las','le','llegar','lo','los','mas','me','mi','mismo','mucha','mucho','muchas','muchos','muy','ni','no','nos','nuestra','nuestro','nueva','nuevo','otra','otro','para','pasar','pero','poca','poco','pocas','pocos','poder','por','porque','primero','pues','que','que','querer','quien','saber','salir','se','seguir','senor','ser','si','siempre','sin','sino','sobre','solo','son','su','sus','tal','tambien','tanto','te','tener','tiempo','todo','tras','tratar','tu','un','una','unas','uno','unos','usted','ustedes','ve','ver','vez','y','ya','yo'];
	var punctuation=/,| |\¿|\?|\.|\;|\!|\¡|\[|\]|\{|\}|\(|\)/;

	var resul=removeDiacritics(this.toLowerCase());
	return resul.split(punctuation).diff(noWords)
}
//return keywords array from N strings: getKeywords("una casa muy bonita","un perro muy chulo") -> ["casa","bonita","perro","chulo"]
function getKeywords(){
    if (!arguments.length) return [];
	var words="";
	for (var i=0;i<arguments.length;i++){
		if (typeof arguments[i]!= "string") return new TypeError("Only String variables are accepted");
		words+=" "+arguments[i];
	}
	return words.getKeywords();
}


//--------------------
//Config sources, expressions, etc
//--------------------
/*
Available sources:
	www.marca.com
	www.mundodeportivo.com 
	www.elmundo.es - image con problemas
	www.elpais.com
	www.20minutos.es
	www.abc.es
	www.larazon.es
	www.publico.es
	www.nytimes.com 
	www.as.com
*/

var config={
	"www.marca.com":{ 
					"logo": "images/marca.png",
					"title": "//h1",							
					"image": "//div[@class='foto_noticia']/img",
					"date": "/html/head/meta[@name='date']/@content",
					"keywords": "/html/head/meta[@name='keywords']/@content",
					"description": "/html/head/meta[@name='description']/@content"					
					},
	"www.mundodeportivo.com":{ 
					"logo": "images/mundodeportivo.png",
					"title": "//h1",						
					"image": "//div[@class='foto']/img",
					"date": null,
					"keywords": "/html/head/meta[@name='Keywords']/@content",
					"description": "/html/head/meta[@name='Description']/@content"			
					},
	"www.elmundo.es":{ 
					"logo": "images/elmundo.png",
					"title": "//h2",										
					"image": "//div[@class='foto ']/img",
					"date": "/html/head/meta[@name='date']/@content",
					"keywords": "/html/head/meta[@name='keywords']/@content",
					"description": "/html/head/meta[@name='description']/@content"				
					},					
	"www.elpais.com":{ 
					"logo": "images/elpais.png",
					"title": "//h1",					  
					"image": "//div[@class='foto_mg']/img",
					"date": "/html/head/meta[@name='date']/@content",
					"keywords": "/html/head/meta[@name='Keywords']/@content",
					"description": "/html/head/meta[@name='Description']/@content"			
					},	
	"www.20minutos.es":{ 
					"logo": "images/20minutos.png",
					"title": "//h3[@class='article-title']",		  
					"image": "//div[@class='article inner']/a/img",
					"date": null,
					"keywords": "/html/head/meta[@name='keywords']/@content",
					"description": "/html/head/meta[@name='description']/@content"				
					},
	"www.abc.es":{ 
					"logo": "images/abc.png",
					"title": "//h1/a",					  
					"image": "//div[@class='photo-alt1']/a/img",
					"date": null,
					"keywords": "/html/head/meta[@name='keywords']/@content",
					"description": "/html/head/meta[@name='description']/@content"				
					},
	"www.larazon.es":{ 
					"logo": "images/larazon.png",
					"title": "//h2",
					"image": "//div[@class='multimedia-content']/img",					
					"date": null,
					"keywords": "/html/head/meta[@name='keywords']/@content",
					"description": "/html/head/meta[@name='description']/@content"				
					},					
	"www.publico.es":{ 
					"logo": "images/publico.png",
					"title": "//h1/a",					  
					"image": "//div[@class='contImagen']/img",
					"date": null,
					"keywords": "/html/head/meta[@name='keywords']/@content",
					"description": "/html/head/meta[@name='description']/@content"			
					},		
    "www.nytimes.com":{ 
					"logo": "images/nytimes.png",
					"title": "//h1/nyt_headline",					  
					"image": "//div[@id='article']/div/div[3]/div/div/a/img",
					"date": "/html/head/meta[@name='pdate']/@content",
					"keywords": "/html/head/meta[@name='keywords']/@content",
					"description": "/html/head/meta[@name='description']/@content"				
					},
    "www.as.com":{ 
					"logo": "images/as.png",
					"title": "//div[contains(@class,'cab_articulo')]/h2",					  
					"image": "//div[@class='mod_img']/img",
					"date": null,
					"keywords": "/html/head/meta[@name='Keywords']/@content",
					"description": "/html/head/meta[@name='Description']/@content"				
					}					
}

//Result from scrapping current tab
var story={
	ok:true,
	url:"",
	title:"",
	imageURL:"",
	date:null,
	keywords:[]
};

//Title is mandatory, no title no story
function getTitle(){	
	return xpath(config[location.host].title,document).innerText;
}

//Since its an optional field catch exception
function getImageURL(){	
	try{
		//If available get it
		return xpath(config[location.host].image,document).src;
	}catch (err){
		console.log("getImageURL: Not available for ["+location.href+"]");
	}
	//Otherwise return ""
	return "";
}

//Since its an optional field catch exception
function getDate(){	
	try{
		//If date is available get it
		if (config[location.host].date)
			return xpath(config[location.host].date,document).value;
	}catch (err){
		console.log("getImageURL: Not available for ["+location.href+"]");
	}
	//Otherwise return ""
	return "";
}
//Keywords is mandatory, no keywords no story
function getKeywordsFromPage(title){	
	//Keywords from META
	var metaKeywords=xpath(config[location.host].keywords,document).value;
	//mixed META + TITLE
	return getKeywords(title,metaKeywords);
}

//Description is mandatory, no description no story
function getDescription(title){	
	//Keywords from META
	return xpath(config[location.host].description,document).value;
}
	
function isStory(){		
	//get the title text
	var host=location.host;
	try{
		//get URL
		story.url=location.href;
		//get title
		story.title=getTitle();
		//get image	
		story.imageURL=getImageURL();		
		//get date
		story.date=getDate();
		//get keywords
		story.keywords=getKeywordsFromPage(story.title);
		//get description
		story.description=getDescription();
		
	}catch(err){
		story.ok=false;
	}
	return story.ok&story.title!="";
}

//--------------------
//Content Launcher -> calling background to do its job
//--------------------

if (isStory()){
	chrome.extension.sendRequest(story, function(response) {
		console.log(response.farewell);
	});
}


