$(function() {

  var $iframe = $('iframe');
  if (location.toString().substr(0,7) === 'file://') {

    console.warn('CSS injection disabled');

  } else {

    var base = location.origin + location.pathname.replace('index.html','');
    $iframe.on('load', function(e){

      var $this = $(this);
      var $head = $this.contents().find('head');
      $head.append($('<link/>',{
        rel: 'stylesheet',
        href: base + 'template/css/iframe.css',
        type: 'text/css'
      }));

    });

  }

  var $links = $('li > a'), index = 0;
  function load() {
    var url = location.hash.substr(1);
    var $result = $('a[href="' + url + '"]');
    if ($result.length === 1) {
      $iframe.attr('src', url);
    }
  }

  function show() {
    $links.eq(index).click();
  }

  $links.on('click', function(e) {

    var $this = $(this);
    $links.removeClass('selected');
    for (var i = 0; i < $links.length; i++) {
      var $link = $links.eq(i);
      if ($link.attr('href') === $this.attr('href')) {
        index = i;
      } else {
      }
    }

    $this.addClass('selected');
    location.hash = $this.attr('href');

  });

  $(window).on('hashchange', function(e) {
    load();
  });

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

  // collapsing sidebar
  $('.trigger-aside').on('click', function(e) {

    e.preventDefault();

    var   $this     = $(this),
    $body     = $('body'),
    $sidebar  = $('.sidebar');

    $body.toggleClass('sidebar-collapsed');
    if ($body.hasClass('sidebar-collapsed')) {
      $('.sidebar').css("pointer-events", "none");
      setTimeout(function() {
        $('.sidebar').css("pointer-events", "auto");
      }, 200);
    } else {
      $this.find('i').removeClass('fa-folder').addClass('fa-folder-open');
    }
  });


  // Starting only with the first level folder opened
  $('nav > .open-list > .open-list').removeClass('invisible').click();

  if (location.hash.length > 0) {

    load();

  } else {

    show();

  }

});
