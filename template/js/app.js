$(function() {
  
  var $iframe = $('iframe');
  if (location.toString().substr(0,7) === 'file://') {
    
    console.warn('CSS injection disabled');

  } else {

    $iframe.on('load', function(e){
      
      var $this = $(this);
      var $head = $this.contents().find('head');
      $head.append($('<link/>',{
        rel: 'stylesheet',
        href: 'template/css/index.css',
        type: 'text/css'
      }));

    });

  }

  var $links = $('li > a'), 
      index = 0;

  function show() {
    $iframe.attr('src', $links.eq(index).attr('href'));
  }

  show();

  $(window).on('keyup', function(e) {
    
    if (e.which === 37 || e.which === 38) {
      e.preventDefault();
      if (index > 0) {
        index--;
        show();
      }
    } else if (e.which === 39 || e.which === 40) {
      e.preventDefault();
      if (index < $links.length - 1) {
        index++;
        show();
      }
    }

  });

  $('ul > a').on('click', function(e) {
    
    e.preventDefault();

    var $this = $(this);

    $this.parent().toggleClass('invisible');
    if ($this.parent().hasClass('invisible')) {
      $this.find('i').addClass('fa-folder').removeClass('fa-folder-open');
    } else {
      $this.find('i').removeClass('fa-folder').addClass('fa-folder-open');
    }

  });
});
