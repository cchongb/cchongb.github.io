(function () {
  'use strict';

  var currentScript = document.currentScript;
  if (!currentScript) {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i -= 1) {
      if ((scripts[i].getAttribute('src') || '').indexOf('assets/js/sidebar.js') !== -1) {
        currentScript = scripts[i];
        break;
      }
    }
  }
  if (!currentScript) {
    return;
  }

  var siteRoot = new URL('../../', currentScript.src);
  var pageUrl = new URL(window.location.href);
  var normalizedPagePath = getPagePath(pageUrl, siteRoot);
  var mountPoint = document.getElementById('site-sidebar');

  if (!mountPoint) {
    return;
  }

  mountPoint.innerHTML = buildSidebar(normalizedPagePath);

  function getPagePath(currentPage, rootUrl) {
    var path = decodeURIComponent(currentPage.pathname).replace(/\\/g, '/');
    var rootPath = decodeURIComponent(rootUrl.pathname).replace(/\\/g, '/');

    if (path.indexOf(rootPath) === 0) {
      path = path.slice(rootPath.length);
    }

    path = path.replace(/^\/+/, '');
    return path || 'index.html';
  }

  function buildSidebar(pagePath) {
    if (/^index\(old\)\.html$/i.test(pagePath)) {
      return renderOldIndexSidebar(pagePath);
    }

    if (/^(index\.html|CV\.html|research\.html|publication\.html|other\.html|Astrophy\.html|Cosmo\.html|JapaneseU\.html|KobeU\.html|NanchangU\.html|Yiqi\.html|me\.html|presentation\.html)$/i.test(pagePath)) {
      return renderMainSidebar(pagePath);
    }

    if (/^Tutorial\/Tindex\.html$/i.test(pagePath)) {
      return renderTutorialIndexSidebar();
    }

    if (/^Tutorial\/BoltzmannCodes\/Introduction\.html$/i.test(pagePath)) {
      return renderTutorialIntroductionSidebar();
    }

    if (/^Tutorial\/BoltzmannCodes\/Recombination\.html$/i.test(pagePath)) {
      return renderTutorialRecombinationSidebar();
    }

    if (/^Room\/Rindex\.html$/i.test(pagePath)) {
      return renderRoomIndexSidebar();
    }

    if (/^Room\/Article\.html$/i.test(pagePath)) {
      return renderRoomArticleSidebar();
    }

    if (/^Room\/Article\/Hardware\/Bit\.html$/i.test(pagePath)) {
      return renderRoomBitSidebar();
    }

    return renderMainSidebar(pagePath);
  }

  function url(relativePath) {
    return new URL(relativePath, siteRoot).href;
  }

  function normalizePath(path) {
    return String(path || '').replace(/\\/g, '/');
  }

  function isCurrent(currentPath, targetPath) {
    return normalizePath(currentPath).toLowerCase() === normalizePath(targetPath).toLowerCase();
  }

  function currentAttr(currentPath, targetPath) {
    return isCurrent(currentPath, targetPath) ? ' aria-current="page"' : '';
  }

  function renderMainSidebar(currentPath) {
    return [
      '<div class="sidenav">',
      '  <nav id="nav">',
      '    <div class="innertube">',
      '      <h3 align="center">CHEN\'s HOMEPAGE</h3>',
      '      <ul align="center">',
      '        <li><a href="' + url('index.html') + '"' + currentAttr(currentPath, 'index.html') + '>HOME</a></li>',
      '        <li><a href="' + url('CV.html') + '"' + currentAttr(currentPath, 'CV.html') + '>CV</a></li>',
      '        <li><a href="' + url('research.html') + '"' + currentAttr(currentPath, 'research.html') + '>RESEARCH</a></li>',
      '        <li><a href="' + url('publication.html') + '"' + currentAt
tr(currentPath, 'publication.html') + '>PUBLICATION</a></li>',
      '        <li><a href="' + url('other.html') + '"' + currentAttr(currentPath, 'other.html') + '>OTHER</a></li>',
      '      </ul>',
      '    </div>',
      '  </nav>',
      '</div>'
    ].join('\n');
  }

  function renderOldIndexSidebar(currentPath) {
    return [
      '<div class="sidenav">',
      '  <nav id="nav">',
      '    <div class="innertube">',
      '      <h3 align="center">CHEN\'s HOMEPAGE</h3>',
      '      <ul align="center">',
      '        <li><a href="' + url('index.html') + '"' + currentAttr(currentPath, 'index(old).html') + '>HOME</a></li>',
      '        <li><a href="' + url('CV.html') + '">CV</a></li>',
      '        <li><a href="#">RESEARCH</a></li>',
      '        <li><a href="#">PUBLICATION</a></li>',
      '        <li><a href="#">PRESENTATION</a></li>',
      '        <li><a href="#">OTHER</a></li>',
      '      </ul>',
      '    </div>',
      '  </nav>',
      '</div>'
    ].join('\n');
  }

  function renderSectionSidebar(options) {
    var html = [
      '<div class="sidenav">',
      '  <nav id="nav">',
      '    <h4 align="' + (options.backAlign || 'middle') + '"><a href="' + url('index.html') + '">' + options.backHtml + '</a></h4>',
      '    <div class="innertube">',
      '      <div class="contentgap">',
             options.contentHtml,
      '      </div>',
      '    </div>',
      '  </nav>',
      '</div>'
    ];
    return html.join('\n');
  }

  function renderTutorialIndexSidebar() {
    return renderSectionSidebar({
      backHtml: '<img src="' + url('Tutorial/Timage/tra-re.png') + '" height="12em">BACK to HOMEPAGE',
      contentHtml: '<a href="' + url('Tutorial/BoltzmannCodes/Introduction.html') + '" align="middle"><u>Boltzmann Codes</u></a>'
    });
  }

  function renderTutorialIntroductionSidebar() {
    return renderSectionSidebar({
      backHtml: '<img src="' + url('Tutorial/Timage/tra-re.png') + '" height="12em">BACK to HOMEPAGE',
      contentHtml: '<a href="' + url('Tutorial/BoltzmannCodes/Introduction.html') + '" align="middle" aria-current="page"><u>Boltzmann Codes</u></a>'
    });
  }

  function renderTutorialRecombinationSidebar() {
    return renderSectionSidebar({
      backAlign: 'left',
      backHtml: '&#9664; BACK to HOMEPAGE',
      contentHtml: [
        '<div class="menu1">',
        '  <u>Boltzmann Codes</u>',
        '  <div>',
        '    <div class="drop"><a href="' + url('Tutorial/BoltzmannCodes/Introduction.html') + '">Introduction</a></div>',
        '  </div>',
        '</div>',
        '<div class="menu2">',
        '  <u>Topological Defects</u>',
        '  <div>',
        '    <div class="drop"><a href="">Domain Wall</a></div>',
        '    <div class="drop"><a href="">Cosmic String</a></div>',
        '    <div class="drop"><a href="">Monopole</a></div>',
        '  </div>',
        '</div>'
      ].join('\n')
    });
  }

  function renderRoomIndexSidebar() {
    return renderSectionSidebar({
      backHtml: '<img src="' + url('Room/Rimage/tra-re.png') + '" height="12em">BACK to HOMEPAGE',
      contentHtml: '<a href="' + url('Room/Article.html') + '" align="middle"><u>文章</u></a>'
    });
  }

  function renderRoomArticleSidebar() {
    return renderSectionSidebar({
      backHtml: '<img src="' + url('Room/Rimage/tra-re.png') + '" height="12em">BACK to HOMEPAGE',
      contentHtml: '<a href="' + url('Room/Article.html') + '" align="middle" aria-current="page"><u>文章</u></a>'
    });
  }

  function renderRoomBitSidebar() {
    return renderSectionSidebar({
      backHtml: '<img src="' + url('Room/Rimage/tra-re.png') + '" height="12em">BACK to HOMEPAGE',
      contentHtml: '<a href="' + url('Room/Article.html') + '" align="middle"><u>文章</u></a>'
    });
  }
})();
