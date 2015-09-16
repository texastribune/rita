/* global ga */

(function() {
  var menuBar;
  var dropdown;
  var activeMenuClass = 'nav__dropdown--visible';

  function onMenuBarClick(e) {
    dropdown.classList.toggle(activeMenuClass);
  }

  function setupMenu() {
    menuBar = document.querySelector('#js-nav-menu');
    dropdown = document.querySelector('#js-nav-dropdown');

    menuBar.addEventListener('click', onMenuBarClick);
  }

  document.addEventListener('DOMContentLoaded', setupMenu);

  function sendEvent(eventAction, label, value) {
    var eventParams = {
      hitType: 'event',
      eventCategory: 'road-from-rita',
      eventAction: eventAction
    };

    if (label) {
      eventParams.eventLabel = label;
    }

    if (value) {
      eventParams.eventValue = value;
    }

    ga('send', eventParams);
  }

  document.querySelector('#js-nav-menu').addEventListener('click', function() {
    sendEvent('js-nav-menu-button');
  });

  ['.js-twitter-button', '.js-facebook-button', '.js-email-button'].forEach(function(el) {
    document.querySelector(el).addEventListener('click', function() {
      sendEvent(el.substr(3), 'shareline');
    });
  });

})();
