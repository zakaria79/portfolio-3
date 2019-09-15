(function() {
  'use strict';
  var menuOpen = false;

  document.addEventListener('DOMContentLoaded', function() {
    var burger = document.getElementById('Burger');
    var nav = document.querySelector('.nav');
    var links = document.querySelectorAll('.link a');

    function openMenu() {
      burger.classList.add('open');
      nav.classList.add('open');
      menuOpen = true;
    }

    function closeMenu() {
      burger.classList.remove('open');
      nav.classList.remove('open');
      menuOpen = false;
    }

    function handleNavLinks(e) {
      e.preventDefault();
      var link = e.currentTarget;
      var section = link.dataset.section;

      console.log(section);
      // GERER L'AFFICHAGE DES SECTIONS
      document.querySelectorAll('section').forEach(function(s) {
        s.classList.add('hide');
      });
      document.getElementById(section).classList.remove('hide');
      closeMenu();
    }

    function handleBurgerClick(e) {
      menuOpen ? closeMenu() : openMenu();
    }

    links.forEach(function(l) {
      l.addEventListener('click', handleNavLinks);
    });

    burger.addEventListener('click', handleBurgerClick);
  });
})();
