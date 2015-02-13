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

  $links.on('click', function(e) {
    
    var $this = $(this);
    for (var i = 0; i < $links.length; i++) {
      var $link = $links.eq(i);
      if ($link.attr('href') === $this.attr('href')) {
        index = i;
      }
    }

    location.hash = $this.attr('href');

  });

  $(window).on('hashchange', function(e) {
    
    var url = location.hash.substr(1);

    var $result = $links.find('[href="' + url + '"]');
    if ($result.length === 1) {
      $iframe.attr('src', url);
    }

  }).trigger('hashchange');

  function show() {
    
    var url = $links.eq(index).attr('href');
    location.hash = url;

    // ¡¿WTF?!
    $iframe.attr('src', url);
    
  }

  show();

  $(window).on('keyup', function(e) {
    
    if (e.shiftKey && (e.which === 37 || e.which === 38)) {
      e.preventDefault();
      if (index > 0) {
        index--;
        show();
      }
    } else if (e.shiftKey && (e.which === 39 || e.which === 40)) {
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
