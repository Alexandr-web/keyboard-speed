import keys from './keys';
import texts from './texts';

const keyboardStart = () => {
  let num_text = 0;
  let print = true;

  const createKey = () => {
    const list = document.querySelector('.wrapper__keyboard-list');

    keys.map(key => {
      const { val, code } = key;
      const block = `<li class="wrapper__keyboard-list-item" data-code="${code}">${val}</li>`;

      list.innerHTML += block;
    });
  }

  createKey();

  const keyPrint = () => {
    const keys_blocks = document.querySelectorAll('.wrapper__keyboard-list-item');
    const ms = 400;
    
    let keys = [];
    let upperCase = false;

    window.addEventListener('keydown', e => {
      keys_blocks.forEach(key => {
        const code = parseInt(key.dataset.code);
        
        keys.push(e.keyCode);
        checkKeys();

        if (keys.length > 1) {
          for (let i = 0; i < keys.length; i++) {
            for (let j = i + 1; j < keys.length; j++) {
              if (keys[i] === 191 && keys[j] === 16 || keys[i] === 16 && keys[j] === 191) {
                checkLetter(',');
              }
            }
          }
        }

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

          if (code === 32) {
            checkLetter(' ');
          }
        }

        function checkKeys() {
          if (keys.length > 2) {
            keys = keys.splice(keys.length, 1);
          }
        }
      });
    });
  } 

  keyPrint();

  const repeatPrintText = () => {
    const par = document.querySelector('.wrapper__text-par');
    const btn_repeat = document.querySelector('.wrapper__text-btn-repeat');
    const letters = document.querySelectorAll('.wrapper__text-letter');

    btn_repeat.addEventListener('click', () => {
      btn_repeat.classList.add('hidden');

      print = true;

      par.classList.remove('done-text');

      letters.forEach(item => item.classList.remove('valid-letter'));
      letters.forEach(item => item.classList.remove('invalid-letter'));
    });
  }

  repeatPrintText();

  const addNewText = () => {
    const input = document.querySelector('.wrapper__text-input');
    const btn_add_new_text = document.querySelector('.wrapper__text-btn-add-new-text');
    const btn_open_new_text = document.querySelector('.wrapper__text-btn-open-new-text');
    const block = document.querySelector('.wrapper__text-block.hidden');
    const par = document.querySelector('.wrapper__text-par');
    const btn_repeat = document.querySelector('.wrapper__text-btn-repeat');
    const letters = document.querySelectorAll('.wrapper__text-letter');

    let open = false;

    input.addEventListener('focus', () => print = false);
    input.addEventListener('blur', () => print = true);

    btn_open_new_text.addEventListener('click', () => {
      open = !open;

      setTextOfBtn();

      block.classList.toggle('hidden');
    });

    btn_add_new_text.addEventListener('click', () => {
      const value = input.value;

      if (/[а-я|А-я]{5,}/.test(value) && !/[\?|\d\+|\-|\(|\)|\*|\&|\^|\%|\$|\#|\@|\!]/.test(value)) {
        par.classList.remove('done-text');
        par.innerHTML = '';

        letters.forEach(item => item.classList.remove('valid-letter'));
        letters.forEach(item => item.classList.remove('invalid-letter'));

        btn_repeat.classList.add('hidden');

        input.value = '';

        block.classList.add('hidden');

        open = false;

        setTextOfBtn();

        getArrayOfText(value.replace(/ё/g, 'е').replace(/Ё/g, 'Е')).map(item => {
          const letter = `<span class="wrapper__text-letter">${item}</span>`;

          par.innerHTML += letter;
        });
      }
    });

    function setTextOfBtn() {
      btn_open_new_text.innerText = open ? 'Скрыть' : 'Вставить свой текст';
    }
  }

  addNewText();

  setText();

  function setText() {
    const par = document.querySelector('.wrapper__text-par');
    const text = texts[num_text];

    getArrayOfText(text).map(item => {
      const letter = `<span class="wrapper__text-letter">${item}</span>`;

      par.innerHTML += letter;
    });
  }

  function checkNumText() {
    if (num_text > texts.length - 1) {
      num_text = 0;
    } else if (num_text < 0) {
      num_text = texts.length - 1;
    }
  }
 
  function checkLetter(letter) {
    const letters = Array.from(document.querySelectorAll('.wrapper__text-letter')).filter(item => !item.classList.contains('valid-letter'));
    const par = document.querySelector('.wrapper__text-par');
    const btn_repeat = document.querySelector('.wrapper__text-btn-repeat');

    if (print) {
      if (letters[0].innerText === letter) {
        letters[0].classList.add('valid-letter');
        letters[0].classList.remove('invalid-letter');
      } else {
        letters[0].classList.remove('valid-letter');
        letters[0].classList.add('invalid-letter');
      }
    }

    if (!letters[0 + 1] &&
        Array.from(document.querySelectorAll('.wrapper__text-letter')).every(item => !item.classList.contains('invalid-letter'))) {
      const valid_letters = document.querySelectorAll('.wrapper__text-letter');

      btn_repeat.classList.remove('hidden');

      print = false;

      valid_letters.forEach(item => item.classList.remove('valid-letter'));
      par.classList.add('done-text');
    }
  }

  function getArrayOfText(text) {
    return typeof text === 'string' ? text.split('') : [];
  }
}

keyboardStart();