'use strict';

(function() {
  var menuOpen = false,
    formSubmited = false,
    httpRequest,
    burger,
    nav,
    links;

  var form = {
    elt: null,
    email: {
      elt: null,
      value: '',
    },
    message: {
      elt: null,
      value: '',
    },
  };

  function getXmlHttpRequestObject() {
    return function(callback, params) {
      if (!httpRequest) {
        throw new Error("Impossible d'executer la requete");
      }

      httpRequest.onreadystatechange = callback;
      httpRequest.open(params.method, params.uri);
      httpRequest.setRequestHeader('Content-Type', 'application/json');
      httpRequest.send(JSON.stringify(params.data));
    };
  }

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

  function handleBurgerClick(e) {
    menuOpen ? closeMenu() : openMenu();
  }

  function send() {
    if (httpRequest.readyState == XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var response = JSON.parse(httpRequest.responseText);
        console.log(response.computedString);
        document.getElementById('contact-form-success').classList.remove('hide');
        window.setTimeout(function(){
          window.location.reload();
        }, 5000); 
      } else {
        console.log('Une erreur est survenue'); 
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formSubmited) {
      window.location.reload();
    }

    formSubmited = true;

    var req = getXmlHttpRequestObject();
    var options = {
      method: 'POST',
      uri: '/api/contacts',
      data: { email: form.email.value, message: form.message.value },
    };
    req(send, options);
    console.log('Submit');
  }

  function handleChange(e) {
    var el = e.currentTarget;
    form[el.name].value = el.value;
  }

  function handleNavLinks(e) {
    e.preventDefault();
    var link = e.currentTarget;
    var section = link.dataset.section;

    document.querySelectorAll('.active').forEach(function(l) {
      l.classList.remove('active');
    });
    link.classList.add('active');
    document.querySelectorAll('section').forEach(function(s) {
      s.classList.add('hide');
    });
    document.getElementById(section).classList.remove('hide');
    closeMenu();
  }

  document.addEventListener('DOMContentLoaded', function() {
    burger = document.getElementById('Burger');
    nav = document.querySelector('.nav');
    links = document.querySelectorAll('.link a');
    form.elt = document.getElementById('contact-form');
    form.email.elt = document.getElementById('email');
    form.message.elt = document.getElementById('message');
    httpRequest = new XMLHttpRequest();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
          console.log('Service worker registered!');
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    links.forEach(function(l) {
      l.addEventListener('click', handleNavLinks);
    });

    burger.addEventListener('click', handleBurgerClick);

    form.elt.addEventListener('submit', handleSubmit);

    form.email.elt.addEventListener('input', handleChange);
    form.message.elt.addEventListener('input', handleChange);
  });
})();
