var NOTICIAS = {};

NOTICIAS.paginate = function(div, pageLength) {
  // 1. Set up paging information
  var $divNews = $(div);
  var $noticias = $divNews.find('.story');
  var $current;
  var numPages = Math.ceil($noticias.length / pageLength) - 1;
  var current = 0;
  
  // 2. Set up the navigation controls
  var $nav = $divNews.parents('#slider').find('.wrapper-paging ul');
  var $back = $nav.find('li:first-child a');
  var $next = $nav.find('li:last-child a');
  
  $nav.find('a.paging-this strong').text(current + 1);
  $nav.find('a.paging-this span').text(numPages + 1);
  $back
    .addClass('paging-disabled')
    .click(function() {
      pagination('<');
    });
  $next.click(function() {
    pagination('>');
  });
  
  // 3. Show initial news
  $noticias.hide();
  $current=$($noticias.slice(0,pageLength)[0]);
  $current.show("slide",{direction:'right'}, 1000);
    
  pagination = function (direction){
    reveal = function (current,dir){
		$back.removeClass('paging-disabled');
		$next.removeClass('paging-disabled');
      
		$current.hide("slide",{direction:(dir=='left'?'right':'left')},1000, function(){
			$current=$($noticias.slice(current * pageLength, current * pageLength + pageLength)[0]);
			$current.show("slide",{direction:dir}, 1000);
			$nav.find('a.paging-this strong').text(current + 1);		
		});				
    };
    // 4. Move previous and next  
  	if (direction == '<') { // previous
      if (current > 1) {
        reveal(current -= 1,'left');
      }
      else if (current == 1) {
        reveal (current -= 1,'left');
        $back.addClass('paging-disabled');
      }
    } else {
      if (current < numPages - 1) {
        reveal(current += 1,'right');
      }
      else if (current == numPages - 1) {
        reveal(current += 1,'right');
        $next.addClass('paging-disabled');
      }
    }
  }
}
