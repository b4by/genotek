document.addEventListener('DOMContentLoaded', function(e) {

  // dropdown toggle

  let toggles = document.querySelectorAll('.btn');
  toggles.forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      this.classList.toggle('btn--active')
      let content = this.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none'
      } else {
        content.style.display = 'block'
      }
    })
  })

  // input clear button

  let inputs = document.querySelectorAll('.form__input');
  inputs.forEach(function(input) {
    let clear = input.nextElementSibling;
    input.addEventListener('input', function(e) {
      if (e.target.value.length > 0) {
        clear.classList.add('form__clear--show')
      } else {
        clear.classList.remove('form__clear--show')
      }
    })
    clear.addEventListener('click', function(e) {
      e.preventDefault();
      input.value = '';
      e.target.parentNode.classList.remove('form__clear--show')
    })
  })

})