$(function() {
  var index = 0;
  var $body = $('body');
  var $links = $('li > a');
  var $iframe = $('iframe');
  var $folders = $('ul > a');

  function load() {
    var url = location.hash.substr(1);
    var $result = $('a[href="' + url + '"]');

    if ($result.length === 1) {
      $iframe.attr('src', url);
      $result.parents('ul').removeClass('invisible');
      $result.parents('ul').find('i.fa-folder').removeClass('fa-folder').addClass('fa-folder-open');
      $links.removeClass('active');
      $result.addClass('active');
    }
  }

  function show() {
    $links.eq(index).click();
  }

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

  $folders.on('click', function(e) {
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
    $sidebar  = $('.sidebar');

    $body.toggleClass('sidebar-collapsed');
    if ($body.hasClass('sidebar-collapsed')) {
      localStorage.setItem("sidebarCollapsed", "true");
      $('.sidebar').css("pointer-events", "none");
      setTimeout(function() {
        $('.sidebar').css("pointer-events", "auto");
      }, 200);
    } else {
      localStorage.setItem("sidebarCollapsed", "false");
      $this.find('i').removeClass('fa-folder').addClass('fa-folder-open');
    }
  });

  // Starting only with the first level folder opened
  $('nav > .open-list > .open-list').removeClass('invisible').click();

  if (location.hash.length > 0) { load(); } else { show(); }

  if (localStorage.getItem("sidebarCollapsed") === "true") {
    $body.addClass('sidebar-collapsed');
  } else {
    $body.removeClass('sidebar-collapsed');
  }
});
