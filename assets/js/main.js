(function ($) {
  "user strict";
  // Preloader Js
  $(window).on('load', function () {
    $('.overlayer').fadeOut(1000);
    var img = $('.bg_img');
    img.css('background-image', function () {
      var bg = ('url(' + $(this).data('background') + ')');
      return bg;
    });
    galleryMasonary();
    galleryMasonaryTwo();
  });
  // Gallery Masonary
  function galleryMasonary() {
    // filter functions
    var $grid = $(".class-wrapper");
    var filterFns = {};
    var $pagination = $(".default-pagination");
    var itemsPerPage = 3;
    var currentFilter = '*';
    var currentPage = 1;

    function getFilteredItems() {
      return $grid.find('.class-inner').filter(function () {
        return currentFilter === '*' || $(this).is(currentFilter);
      });
    }

    function updatePagination() {
      var $items = getFilteredItems();
      var pageCount = Math.max(1, Math.ceil($items.length / itemsPerPage));
      currentPage = Math.min(currentPage, pageCount);
      var firstItem = (currentPage - 1) * itemsPerPage;
      var visibleItems = $items.slice(firstItem, firstItem + itemsPerPage).toArray();

      $grid.find('.class-inner').removeClass('pagination-visible');
      $(visibleItems).addClass('pagination-visible');
      $grid.isotope({ filter: '.pagination-visible' });

      $pagination.find('li').remove();
      $('<li><a  data-page="previous"><i class="fas fa-angle-left"></i></a></li>')
        .appendTo($pagination);
      for (var page = 1; page <= pageCount; page++) {
        $('<li><a  data-page="' + page + '">' + ('0' + page).slice(-2) + '</a></li>')
          .appendTo($pagination);
      }
      $('<li><a  data-page="next"><i class="fas fa-angle-right"></i></a></li>')
        .appendTo($pagination);
      $pagination.find('a[data-page="' + currentPage + '"]').addClass('active');
    }

    $grid.isotope({
      itemSelector: '.class-inner',
      masonry: {
        columnWidth: 0,
      }
    });
    // bind filter button click
    $('ul.filter').on('click', 'li', function () {
      currentFilter = $(this).attr('data-filter');
      currentPage = 1;
      var filterValue = currentFilter;
      // use filterFn if matches value
      filterValue = filterFns[filterValue] || filterValue;
      if ($pagination.length) {
        updatePagination();
      } else {
        $grid.isotope({
          filter: filterValue
        });
      }
    });
    // change is-checked class on buttons
    $('ul.filter').each(function (i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on('click', 'li', function () {
        $buttonGroup.find('.active').removeClass('active');
        $(this).addClass('active');
      });
    });

    if ($pagination.length) {
      $pagination.on('click', 'a', function (event) {
        event.preventDefault();
        var requestedPage = $(this).data('page');
        var pageCount = Math.max(1, Math.ceil(getFilteredItems().length / itemsPerPage));

        if (requestedPage === 'previous') {
          currentPage = Math.max(1, currentPage - 1);
        } else if (requestedPage === 'next') {
          currentPage = Math.min(pageCount, currentPage + 1);
        } else {
          currentPage = Number(requestedPage);
        }
        updatePagination();
      });
      updatePagination();
    }
  }
  // Gallery Masonary
  function galleryMasonaryTwo() {
    // filter functions
    var $gridTwo = $(".masonary-wrapper");
    var filterFns = {};
    $gridTwo.isotope({
      itemSelector: '.masonary-item',
      masonry: {
        columnWidth: 0,
      }
    });
    // bind filter button click
    $('ul.filter-2').on('click', 'li', function () {
      var filterValueTwo = $(this).attr('data-filter');
      // use filterFn if matches value
      filterValueTwo = filterFns[filterValueTwo] || filterValueTwo;
      $gridTwo.isotope({
        filter: filterValueTwo
      });
    });
    // change is-checked class on buttons
    $('.filter-2').each(function (i, buttonGroup) {
      var $buttonGroupTwo = $(buttonGroup);
      $buttonGroupTwo.on('click', 'li', function () {
        $buttonGroupTwo.find('.active').removeClass('active');
        $(this).addClass('active');
      });
    });
  }
  $(document).ready(function () {
    $('.select-bar').niceSelect();
    // PoPuP 
    $('.popup').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
      disableOn: 300
    });
    $("body").each(function () {
      $(this).find(".img-pop").magnificPopup({
        type: "image",
        gallery: {
          enabled: true
        }
      });
    });
    // aos js active
    new WOW().init()
    //Faq
    $('.faq-wrapper .faq-title').on('click', function (e) {
      var element = $(this).parent('.faq-item');
      if (element.hasClass('open')) {
        element.removeClass('open');
        element.find('.faq-content').removeClass('open');
        element.find('.faq-content').slideUp(300, "swing");
      } else {
        element.addClass('open');
        element.children('.faq-content').slideDown(300, "swing");
        element.siblings('.faq-item').children('.faq-content').slideUp(300, "swing");
        element.siblings('.faq-item').removeClass('open');
        element.siblings('.faq-item').find('.faq-title').removeClass('open');
        element.siblings('.faq-item').find('.faq-content').slideUp(300, "swing");
      }
    });
    //Menu Dropdown Icon Adding
    $("ul>li>.submenu").parent("li").addClass("menu-item-has-children");
    // drop down menu width overflow problem fix
    $('ul').parent('li').hover(function () {
      var menu = $(this).find("ul");
      var menupos = $(menu).offset();
      if (menupos.left + menu.width() > $(window).width()) {
        var newpos = -$(menu).width();
        menu.css({
          left: newpos
        });
      }
    });
    $('.menu li a').on('click', function (e) {
      var element = $(this).parent('li');
      if (element.hasClass('open')) {
        element.removeClass('open');
        element.find('li').removeClass('open');
        element.find('ul').slideUp(300, "swing");
      } else {
        element.addClass('open');
        element.children('ul').slideDown(300, "swing");
        element.siblings('li').children('ul').slideUp(300, "swing");
        element.siblings('li').removeClass('open');
        element.siblings('li').find('li').removeClass('open');
        element.siblings('li').find('ul').slideUp(300, "swing");
      }
    })
    $('.ellepsis-bar').on('click', function (e) {
      var element = $('.header-top');
      if (element.hasClass('open')) {
        element.removeClass('open');
        element.slideUp(300, "swing");
        $('.overlayTwo').removeClass('active');
      } else {
        element.addClass('open');
        element.slideDown(300, "swing");
        $('.overlayTwo').addClass('active');
      }
    });
    // Scroll To Top 
    var scrollTop = $(".scrollToTop");
    $(window).on('scroll', function () {
      if ($(this).scrollTop() < 500) {
        scrollTop.removeClass("active");
      } else {
        scrollTop.addClass("active");
      }
    });
    //Click event to scroll to top
    $('.scrollToTop').on('click', function () {
      $('html, body').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
    //Header Bar
    $('.header-bar').on('click', function () {
      $(this).toggleClass('active');
      $('.overlay').toggleClass('active');
      $('.menu').toggleClass('active');
    })
    var isPagesDirectory = window.location.pathname.indexOf('/pages/') !== -1;
    var searchPathPrefix = isPagesDirectory ? '../' : '';
    var searchablePages = [{
        url: searchPathPrefix + 'index.html',
        label: 'Home'
      },
      {
        url: searchPathPrefix + 'about.html',
        label: 'About'
      },
      {
        url: searchPathPrefix + 'teacher.html',
        label: 'Teachers'
      },
      {
        url: searchPathPrefix + 'gallery.html',
        label: 'Gallery'
      },
      {
        url: searchPathPrefix + 'contact.html',
        label: 'Contact'
      },
      {
        url: searchPathPrefix + 'pages/class-schedule.html',
        label: 'Class Schedule'
      },
      {
        url: searchPathPrefix + 'pages/class-single.html',
        label: 'Class Details'
      },
      {
        url: searchPathPrefix + 'pages/faqs.html',
        label: 'FAQs'
      },
      {
        url: searchPathPrefix + 'pages/login.html',
        label: 'Login'
      },
      {
        url: searchPathPrefix + 'pages/registration.html',
        label: 'Registration'
      },
      {
        url: searchPathPrefix + 'pages/teacher1.html',
        label: 'Teacher Profile'
      }
    ];
    var searchIndexPromise;

    function escapeHtml(text) {
      return String(text || '').replace(/[&<>"']/g, function (character) {
        return {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        } [character];
      });
    }

    function getSearchResultsContainer() {
      var $form = $('.header-form .form-container');
      var $container = $form.find('.search-results');
      if (!$container.length) {
        $container = $('<div class="search-results" aria-live="polite"></div>');
        $form.append($container);
      }
      return $container;
    }

    function showSearchMessage(message, modifierClass) {
      var $container = getSearchResultsContainer();
      $container.removeClass('has-results is-loading is-error').addClass(modifierClass || '');
      $container.html('<p class="search-message">' + escapeHtml(message) + '</p>');
    }

    function buildSearchIndex() {
      if (searchIndexPromise) {
        return searchIndexPromise;
      }

      searchIndexPromise = Promise.all(searchablePages.map(function (page) {
        return fetch(page.url, {
            cache: 'force-cache'
          })
          .then(function (response) {
            if (!response.ok) {
              throw new Error('Page unavailable');
            }
            return response.text();
          })
          .then(function (html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            var metaDescription = doc.querySelector('meta[name="description"]');
            var headings = Array.prototype.map.call(doc.querySelectorAll('h1, h2, h3'), function (heading) {
              return (heading.textContent || '').trim();
            }).join(' ');
            var bodyText = ((doc.body && doc.body.textContent) || '').replace(/\s+/g, ' ').trim();

            return {
              url: page.url,
              label: page.label,
              title: (doc.title || page.label || '').trim(),
              description: metaDescription ? (metaDescription.getAttribute('content') || '').trim() : '',
              headings: headings,
              text: bodyText
            };
          })
          .catch(function () {
            return {
              url: page.url,
              label: page.label,
              title: page.label,
              description: '',
              headings: '',
              text: ''
            };
          });
      })).then(function (pages) {
        return pages;
      });

      return searchIndexPromise;
    }

    function scoreResult(page, terms) {
      var title = page.title.toLowerCase();
      var description = page.description.toLowerCase();
      var headings = page.headings.toLowerCase();
      var text = page.text.toLowerCase();
      var fullText = [title, description, headings, text, page.url.toLowerCase(), page.label.toLowerCase()].join(' ');
      var matchesAllTerms = terms.every(function (term) {
        return fullText.indexOf(term) !== -1;
      });

      if (!matchesAllTerms) {
        return -1;
      }

      var score = 0;
      terms.forEach(function (term) {
        if (title.indexOf(term) !== -1) {
          score += 6;
        }
        if (headings.indexOf(term) !== -1) {
          score += 4;
        }
        if (description.indexOf(term) !== -1) {
          score += 3;
        }
        if (text.indexOf(term) !== -1) {
          score += 1;
        }
      });

      return score;
    }

    function escapeRegExp(value) {
      return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function buildSnippet(source, terms) {
      var normalizedSource = (source || '').replace(/\s+/g, ' ').trim();
      if (!normalizedSource) {
        return 'Open this page to view related content.';
      }

      var lowerSource = normalizedSource.toLowerCase();
      var firstMatchIndex = -1;
      terms.forEach(function (term) {
        var currentIndex = lowerSource.indexOf(term);
        if (currentIndex !== -1 && (firstMatchIndex === -1 || currentIndex < firstMatchIndex)) {
          firstMatchIndex = currentIndex;
        }
      });

      var snippetLength = 180;
      var start = firstMatchIndex > -1 ? Math.max(0, firstMatchIndex - 45) : 0;
      var end = Math.min(normalizedSource.length, start + snippetLength);
      var snippet = normalizedSource.slice(start, end).trim();

      if (start > 0) {
        snippet = '... ' + snippet;
      }
      if (end < normalizedSource.length) {
        snippet += ' ...';
      }

      return snippet;
    }

    function highlightText(text, terms) {
      var uniqueTerms = terms.filter(function (term, index, collection) {
        return collection.indexOf(term) === index;
      }).sort(function (a, b) {
        return b.length - a.length;
      });

      if (!uniqueTerms.length) {
        return escapeHtml(text);
      }

      var highlightPattern = new RegExp('(' + uniqueTerms.map(escapeRegExp).join('|') + ')', 'ig');
      var html = '';
      var lastIndex = 0;

      text.replace(highlightPattern, function (match) {
        var offset = arguments[arguments.length - 2];
        html += escapeHtml(text.slice(lastIndex, offset));
        html += '<mark class="search-highlight">' + escapeHtml(match) + '</mark>';
        lastIndex = offset + match.length;
        return match;
      });

      html += escapeHtml(text.slice(lastIndex));
      return html;
    }

    function renderSearchResults(results, query, terms) {
      var $container = getSearchResultsContainer();

      if (!results.length) {
        $container.removeClass('has-results is-loading').addClass('is-error');
        $container.html('<p class="search-message">No results found for "' + escapeHtml(query) + '".</p>');
        return;
      }

      var listHtml = results.map(function (result) {
        var snippetSource = result.description || result.headings || result.text;
        var snippet = buildSnippet(snippetSource, terms);
        var highlightedSnippet = highlightText(snippet, terms);
        var highlightedTitle = highlightText((result.title || result.label), terms);

        return '<li class="search-result-item">' +
          '<a href="' + escapeHtml(result.url) + '">' +
          '<span class="search-result-title">' + highlightedTitle + '</span>' +
          '<span class="search-result-url">' + escapeHtml(result.url.replace(/^\.\//, '')) + '</span>' +
          '<span class="search-result-snippet">' + highlightedSnippet + '</span>' +
          '</a>' +
          '</li>';
      }).join('');

      $container.removeClass('is-loading is-error').addClass('has-results');
      $container.html('<ul class="search-result-list">' + listHtml + '</ul>');
    }

    $('.search-button, .search-button a').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $('.header-form').addClass('active');
      $('.header-form input[name="name"]').trigger('focus');
    })
    $('.header-form .bg-lay, .header-form .cross').on('click', function (e) {
      e.preventDefault();
      $('.header-form').removeClass('active');
    })
    $('.header-form .form-container').on('click', function (e) {
      e.stopPropagation();
    })
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape') {
        $('.header-form').removeClass('active');
      }
    })
    $('.header-form .form-container').on('submit', function (e) {
      e.preventDefault();

      var query = $.trim($(this).find('input[name="name"]').val());
      var normalizedQuery = query.toLowerCase();
      var terms = query.toLowerCase().split(/\s+/).filter(function (term) {
        return term.length > 1;
      });

      var wantsSchoolImages = (
        /\bschool\b/.test(normalizedQuery) &&
        /\b(images?|photos?|pictures?|pics?|gallery)\b/.test(normalizedQuery)
      ) || /\bschool\s+(images?|photos?|pictures?|pics?)\b/.test(normalizedQuery);

      if (wantsSchoolImages) {
        window.location.href = searchPathPrefix + 'gallery.html';
        return;
      }

      if (!query) {
        showSearchMessage('Type something to search the website.', 'is-error');
        return;
      }

      if (!terms.length) {
        showSearchMessage('Please enter at least 2 characters.', 'is-error');
        return;
      }

      showSearchMessage('Searching pages...', 'is-loading');

      buildSearchIndex().then(function (index) {
        var results = index
          .map(function (page) {
            return {
              score: scoreResult(page, terms),
              page: page
            };
          })
          .filter(function (result) {
            return result.score > -1;
          })
          .sort(function (a, b) {
            return b.score - a.score;
          })
          .slice(0, 8)
          .map(function (result) {
            return result.page;
          });

        renderSearchResults(results, query, terms);
      }).catch(function () {
        showSearchMessage('Search is temporarily unavailable. Please try again.', 'is-error');
      });
    })
    //Cart Button
    $('.cart-button, .side-sidebar-close-btn').on('click', function () {
      $(this).toggleClass('active');
      $('.overlay').toggleClass('active');
      $('.cart-sidebar-area').toggleClass('active');
    })
    $('.remove-cart').on('click', function (e) {
      e.preventDefault();
      $(this).parent().parent().hide(300);
    });
    //Header Bar
    $('.overlay').on('click', function () {
      $(this).removeClass('active');
      $('.header-bar').removeClass('active');
      $('.menu').removeClass('active');
      $('.cart-sidebar-area').removeClass('active');
    })
    //Header Bar
    $('.overlayTwo').on('click', function () {
      $(this).removeClass('active');
      $('.header-top').slideUp(300, "swing");
    })
    //Header
    var fixed_top = $("header");
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 300) {
        fixed_top.addClass("header-fixed fadeInUp");
      } else {
        fixed_top.removeClass("header-fixed fadeInUp");
      }
    });
    //Odometer
    $(".counter-item").each(function () {
      $(this).isInViewport(function (status) {
        if (status === "entered") {
          for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
            var el = document.querySelectorAll('.odometer')[i];
            el.innerHTML = el.getAttribute("data-odometer-final");
          }
        }
      });
    });
    //Tab Section
    // $('.tab ul.tab-menu').addClass('active').find('> li:eq(0)').addClass('active');
    $('.tab ul.tab-menu li').on('click', function (g) {
      var tab = $(this).closest('.tab'),
        index = $(this).closest('li').index();
      tab.find('li').siblings('li').removeClass('active');
      $(this).closest('li').addClass('active');
      tab.find('.tab-area').find('div.tab-item').not('div.tab-item:eq(' + index + ')').slideUp(600);
      tab.find('.tab-area').find('div.tab-item:eq(' + index + ')').slideDown(600);
      g.preventDefault();
    });

    //banner slider
    $('.banner-slider').slick({
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
    });

    $('.client-slider').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 991,
        settings: {
          slidesToShow: 1
        }
      }]
    });
    $('.post-slider').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
    });
    $('.post-next').on('click', function (e) {
      $('.post-slider').slick('slickNext');
    });
    $('.post-prev').on('click', function (e) {
      $('.post-slider').slick('slickPrev');
    });
    //Circle ProgressbarOne
    var skillLevel1 = jQuery('#circles .first').data('percent');
    $('.first.circle').circleProgress({
      value: '0.' + skillLevel1,
      fill: {
        gradient: ['#6dc72a']
      }
    }).on('circle-animation-progress', function (event, progress) {
      $(this).find('strong').html(Math.round(skillLevel1 * progress) + '<i>%</i>');
    });
    //Circle ProgressBarTwo
    var skillLevel2 = jQuery('#circles .second').data('percent');
    $('.second.circle').circleProgress({
      value: '0.' + skillLevel2,
      fill: {
        gradient: ['#aa2293']
      }
    }).on('circle-animation-progress', function (event, progress) {
      $(this).find('strong').html(Math.round(skillLevel2 * progress) + '<i>%</i>');
    });
    //Circle ProgressBarThree
    var skillLevel3 = jQuery('#circles .third').data('percent');
    $('.third.circle').circleProgress({
      value: '0.' + skillLevel3,
      fill: {
        gradient: ['#ff6514']
      }
    }).on('circle-animation-progress', function (event, progress) {
      $(this).find('strong').html(Math.round(skillLevel3 * progress) + '<i>%</i>');
    });
    // shop cart + - start here
    var CartPlusMinus = $('.cart-plus-minus');
    CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
    CartPlusMinus.append('<div class="inc qtybutton">+</div>');
    $(".qtybutton").on("click", function () {
      var $button = $(this);
      var oldValue = $button.parent().find("input").val();
      if ($button.text() === "+") {
        var newVal = parseFloat(oldValue) + 1;
      } else {
        // Don't allow decrementing below zero
        if (oldValue > 0) {
          var newVal = parseFloat(oldValue) - 1;
        } else {
          newVal = 1;
        }
      }
      $button.parent().find("input").val(newVal);
    });

    // product view mode change js
    $('.product-view-mode').on('click', 'a', function (e) {
      e.preventDefault();
      var shopProductWrap = $('.shop-product-wrap');
      var viewMode = $(this).data('target');
      $('.product-view-mode a').removeClass('active');
      $(this).addClass('active');
      shopProductWrap.removeClass('grid list').addClass(viewMode);
    });

    // model option start here
    $('.view-modal').on('click', function () {
      $('.modal').addClass('show');
    });
    $('.close').on('click', function () {
      $('.modal').removeClass('show');
    });
    //Slick Slider
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: false,
      asNavFor: '.slider-nav',
      autoplay: 5000,
      adaptiveHeight: true
    });
    $('.slider-nav').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: false,
      centerMode: false,
      focusOnSelect: true,
      responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }
      ]
    });

    //Review Tabs
    $('ul.review-nav').on('click', 'li', function (e) {
      e.preventDefault();
      var reviewContent = $('.review-content');
      var viewRev = $(this).data('target');
      $('ul.review-nav li').removeClass('active');
      $(this).addClass('active');
      reviewContent.removeClass('review-content-show description-show').addClass(viewRev);
    });
  });
})(jQuery);