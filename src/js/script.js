import keys from './keys';

const keyboardStart = () => {
  let seal = true;

  const createKey = () => {
    const list = document.querySelector('.wrapper__keyboard-list');

    keys.map(key => {
      const { val, code } = key;
      const block = `<li class="wrapper__keyboard-list-item" data-code="${code}">${val}</li>`;

      list.innerHTML += block;
    });
  }

  createKey();

  const setText = () => {
    const par = document.querySelector('.wrapper__text-par');
    const text = 'Hello, world.';

    getArrayOfText(text).map(item => {
      const letter = `<span class="wrapper__text-letter">${item}</span>`;

      par.innerHTML += letter;
    });
  }

  setText();

  const keySeal = () => {
    const keys_blocks = document.querySelectorAll('.wrapper__keyboard-list-item');
    const ms = 400;

    let upperCase = false;

    window.addEventListener('keydown', e => {
      keys_blocks.forEach(key => {
        const code = parseInt(key.dataset.code);
        
        if (e.keyCode === code) {
          key.classList.add('active-key');

          setTimeout(() => key.classList.remove('active-key'), ms);
          checkUpperCase();

          if (key.innerText === 'CapsLock') {
            upperCase = !upperCase;
            checkUpperCase();
          }
        }

        function checkUpperCase() {
          if (![13, 8, 20, 32].includes(code)) {
            checkLetter(upperCase ? key.innerText.toUpperCase() : key.innerText);
          }

          switch(code) {
            case 32:
              checkLetter(' ');
          }
        }
      });
    });
  } 

  keySeal();

  function checkLetter(letter) {
    const letters = Array.from(document.querySelectorAll('.wrapper__text-letter')).filter(item => !item.classList.contains('valid-letter'));
    const par = document.querySelector('.wrapper__text-par');

    if (seal) {
      if (letters[0].innerText === letter) {
        letters[0].classList.add('valid-letter');
        letters[0].classList.remove('invalid-letter');
      } else {
        letters[0].classList.remove('valid-letter');
        letters[0].classList.add('invalid-letter');
      }
    }

    if (!letters[0 + 1]) {
      const valid_letters = document.querySelectorAll('.valid-letter');
      
      seal = false;

      valid_letters.forEach(item => item.classList.remove('valid-letter'));
      par.classList.add('done-text');
    }
  }

  function getArrayOfText(text) {
    return typeof text === 'string' ? text.split('') : [];
  }
}

keyboardStart();