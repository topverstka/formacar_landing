
// Служебные переменные
const d = document;
const body = document.querySelector('body');

// Служебные функции

function find(selector) {
	return document.querySelector(selector)
}

function findAll(selectors) {
	return document.querySelectorAll(selectors)
}

// Удаляет у всех элементов items класс itemClass
function removeAll(items,itemClass) {   
    if (typeof items == 'string') {
      items = document.querySelectorAll(items)
    }
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      item.classList.remove(itemClass)
    }
}

function bodyLock(con) {
    if (con === true) {
        body.classList.add('_lock');
    } else if (con === false) {
        body.classList.remove('_lock');
    } else if (con === undefined) {
		if (!body.classList.contains('_lock')) {
			body.classList.add('_lock');
		}
		else {
			body.classList.remove('_lock')
		}
	} else {
		console.error('Неопределенный аргумент у функции bodyLock()')
	}
}

function faq(){
    let faqElements = d.querySelectorAll('.faq__questions-item');

    for( let i = 0; i < faqElements.length; i++){
        faqElements[i].addEventListener('click', function(){
            if(this.classList.contains('active')){
                this.classList.remove('active');
            }else{
                if(d.querySelector('.faq__questions-item.active')){
                    d.querySelector('.faq__questions-item.active').classList.remove('active');
                }
                this.classList.add('active');
            }
        });
    }
}

faq();



// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.querySelector(".header");

// Get the offset position of the navbar
var sticky = 1000;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}




// Валидация формы
validationForm('.form');
function validationForm(selector) {
    const formNodes = document.querySelectorAll(selector);

    formNodes.forEach((formNode) => {
        const inputNodes = formNode.querySelectorAll('.form-input');
        const submitNode = formNode.querySelector('[type=submit]');

        formNode.setAttribute('novalidate', '');
        setEvents(inputNodes, submitNode);
        toggleSubmitState(inputNodes, submitNode);

        formNode.addEventListener('submit', (evt) => {
            if (hasInvalidInput(inputNodes)) {
                evt.preventDefault();
            }
        });
    });

    function toggleSubmitState(inputNodes, submitNode) {
        if (!submitNode) return;

        if (hasInvalidInput(inputNodes)) {
            submitNode.disabled = true;
        } else {
            submitNode.disabled = false;
        }
    }

    function setEvents(inputNodes, submitNode) {
        inputNodes.forEach((inputNode) => {
            inputNode.addEventListener('input', () => {
                checkInput(inputNode);
                toggleSubmitState(inputNodes, submitNode);
            });
        });
    }

    function hasInvalidInput(inputNodes) {
        return Array.from(inputNodes).some((inputNode) => !inputNode.validity.valid);
    }

    function checkInput(inputNode) {
        const placehoder = inputNode.getAttribute('data-placeholder') || '';
        const errorMessage = inputNode.getAttribute('data-error') || '';

        if (inputNode.validity.valid) {
            inputNode.classList.remove('form-input_error');
        } else {
            inputNode.classList.add('form-input_error');
            inputNode.placeholder = errorMessage;
        }

        if (inputNode.value.length) return;
        setTimeout(() => {
            inputNode.classList.remove('form-input_error');
            inputNode.placeholder = placehoder;
        }, 1200);
    }
}

// Кастомный select
castomSelect();
function castomSelect() {
    const selectNodes = document.querySelectorAll('.form-select');

    selectNodes.forEach(selectNode => {
        const inputNode = selectNode.querySelector('.form-select__input');
        const toggleNode = selectNode.querySelector('.form-select__toggle');
        const buttonNodes = selectNode.querySelectorAll('.form-select__btn');

        toggleNode.addEventListener('click', handleToggle);

        buttonNodes.forEach((buttonNode, index) => {
            buttonNode.addEventListener('click', () => {
                buttonNodes.forEach(buttonNode => buttonNode.classList.remove('form-select__btn_active'));
                buttonNode.classList.add('form-select__btn_active');
                inputNode.selectedIndex = index;
                toggleNode.classList.add('form-select__toggle_selected');
                toggleNode.textContent = buttonNode.textContent;
            });
        });

        function handleToggle(evt) {
            evt.stopPropagation();
            selectNode.classList.toggle('form-select_active');

            if (selectNode.classList.contains('form-select_active')) {
                toggleNode.removeEventListener('click', handleToggle);
                document.addEventListener('click', handleDocument);
            }
        }

        function handleDocument() {
            selectNode.classList.remove('form-select_active');

            document.removeEventListener('click', handleDocument);
            selectNode.addEventListener('click', handleToggle);
        }
    });
}


// Мобильное меню
// menu()
function menu() {
	const burger = find('.header__nav-burger')
	const menu = find('.header__nav--mobile');

	burger.addEventListener('click', (e) => {
		burger.classList.toggle('active')
		menu.classList.toggle('active')
		bodyLock()
	})
}

menu();

// Мобильное меню выбора языка
function menuLang() {
    const buttonNode = find('.header__nav-lang-btn');
    const menuNode = find('.mobile-lang');
    const backNode = find('.mobile-lang__back');
    const closeNode = find('.mobile-lang__close');
    const mainMenuNode = find('.header__nav--mobile');
    const burgerNode = find('.header__nav-burger');

    buttonNode.addEventListener('click', () => {
        menuNode.classList.add('active');
    });

    backNode.addEventListener('click', () => {
        menuNode.classList.remove('active');
    });

    if (mainMenuNode) {
        closeNode.addEventListener('click', () => {
            mainMenuNode.classList.remove('active');
            menuNode.classList.remove('active');
            bodyLock();

            if (burgerNode) burgerNode.classList.toggle('active');
        });
    }
}

menuLang();


// Плавная прокрутка

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}


function elmYPosition(eID) {
    var elm = document.querySelector(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}


function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}



let anchors = d.querySelectorAll('.anchor');
for(let i = 0; i < anchors.length; i++){
    anchors[i].addEventListener('click', function(){
        let anchor = this.getAttribute('href');
        console.log(anchor)
        smoothScroll(anchor);
        if(this.closest('.header__nav--mobile')){
            d.querySelector('.header__nav-burger').click();
        }
    });
}



// Функции для модальных окон
function modal() {
    
    
    // Открытие модальных окон при клике по кнопке
    
    function openModalWhenClickingOnBtn() {
        const btnsOpenModal = document.querySelectorAll('[data-modal-open]');
        
        
        for (let i = 0; i < btnsOpenModal.length; i++) {
            const btn = btnsOpenModal[i];
    
            btn.addEventListener('click', (e) => {
                const dataBtn = btn.dataset.modalOpen;
                const modal = document.querySelector(`#${dataBtn}`)
                openModal(modal)
                window.location.hash = dataBtn
            });
        }
    }
    openModalWhenClickingOnBtn();

    // Открытие модального окна, если в url указан его id
    
    function openModalHash() {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1)
            const modal = document.querySelector(`.modal#${hash}`)
    
            if (modal) openModal(modal)
        }
    }
    openModalHash();

    // Показываем/убираем модальное окно при изменения хеша в адресной строке
    function checkHash() {
        window.addEventListener('hashchange', e => {
            const hash = window.location.hash
            const modal = document.querySelector(`.modal${hash}`)

            if (find('.modal._show')) find('.modal._show').classList.remove('_show')
            if (modal && hash != '') openModal(modal)
        })
    }
    checkHash()

    // Закрытие модального окна при клике по заднему фону
    function closeModalWhenClickingOnBg() {
        document.addEventListener('click', (e) => {
            const target = e.target
            const modal = document.querySelector('.modal._show')

            if (modal && target.classList.contains('modal__body')) closeModal(modal)
        })
    }
    closeModalWhenClickingOnBg();

    // Закрытие модальных окон при клике по крестику
    function closeModalWhenClickingOnCross() {
        const modalElems = document.querySelectorAll('.modal')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];
            const closeThisModal = modal.querySelector('.modal__close')
    
            closeThisModal.addEventListener('click', () => {
                closeModal(modal)
            })
        }
    }
    closeModalWhenClickingOnCross();

    // Закрытие модальных окон при нажатии по клавише ESC
    function closeModalWhenClickingOnESC() {
        const modalElems = document.querySelectorAll('.modal')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];
    
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') closeModal(modal)
            })
        }
    }
    closeModalWhenClickingOnESC();

    // Сброс id модального окна в url
    function resetHash() {
        const windowTop = window.pageYOffset
        window.location.hash = ''
        window.scrollTo(0, windowTop)
    }

    // Открытие модального окна
    function openModal(modal) {
        modal.classList.add('_show')
        bodyLock(true)
    }

    // Закрытие модального окна
    function closeModal(modal) {
        modal.classList.remove('_show')
        bodyLock(false)
        resetHash()
    }
}

modal();




// Куки
function setCookie(c_name,value,exdays){
    var exdate=new Date();
           exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()) + "; path=/";
    document.cookie=c_name + "=" + c_value;
}

function getMyCookie(name) {
    var c = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
        if (c) return c[2];
        else return "";
}

let cookieBtn = d.querySelector('#cookie-btn');

cookieBtn.addEventListener('click', function(event){
    event.preventDefault();
    d.querySelector('.cookie').classList.remove('active');
    setCookie("Cookie", 'yes', 1);
});



document.addEventListener("DOMContentLoaded", function () {
    var cookieCheck = getMyCookie("Cookie");
	if (cookieCheck != 'yes') {
        d.querySelector('.cookie').classList.add('active');
	}

});

function checkPowerSavingModeVideo() {
    const videoNode = document.querySelector('.first-screen__video');
    if (!videoNode) return;
    videoNode.addEventListener('canplay', () => videoNode.play());
}

checkPowerSavingModeVideo();

// Смена языка
toggleChangeLang();
function toggleChangeLang() {
    const toggleNode = document.querySelector('.header__lang-btn');
    const menuNode = document.querySelector('.header__lang-menu');

    if (!toggleNode || !menuNode) return;

    toggleNode.addEventListener('click', handleToggle);
    menuNode.addEventListener('click', (evt) => evt.stopPropagation());

    function handleToggle(evt) {
        evt.stopPropagation();
        menuNode.classList.toggle('header__lang-menu_active');

        if (menuNode.classList.contains('header__lang-menu_active')) {
            toggleNode.removeEventListener('click', handleToggle);
            document.addEventListener('click', handleDocument);
        }
    }

    function handleDocument() {
        menuNode.classList.remove('header__lang-menu_active');

        document.removeEventListener('click', handleDocument);
        toggleNode.addEventListener('click', handleToggle);
    }
}

initRoadmapCollapse();
function initRoadmapCollapse() {
    const collapseNodes = document.querySelectorAll('.roadmap__collapse');
    const iconSrc = 'data:image/svg+xml,%3Csvg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0.707105 1.7071C0.07714 1.07714 0.523309 0 1.41421 0L14.5858 0C15.4767 0 15.9229 1.07714 15.2929 1.70711L8.70711 8.29289C8.31658 8.68342 7.68342 8.68342 7.29289 8.29289L0.707105 1.7071Z" fill="white"/%3E%3C/svg%3E%0A';

    collapseNodes.forEach((collapseNode) => {
        const contentNode = collapseNode.querySelector('.roadmap__collapse-content');
        const collapsedNode = collapseNode.querySelector('.roadmap__collapse-collapsed');
        const toggleNode = collapseNode.querySelector('.roadmap__collapse-toggle');

        if (!collapsedNode || !toggleNode || !contentNode) return;

        let collapseHeight = collapsedNode.clientHeight;
        window.addEventListener('resize', () => {
            collapsedNode.style.height = null;

            const currentHeight = collapsedNode.clientHeight;

            collapsedNode.style.height = 0;
            contentNode.classList.remove('roadmap__collapse-content_active');
            toggleNode.classList.remove('roadmap__collapse-toggle_active');
            collapseHeight = currentHeight;
        });

        collapsedNode.style.height = 0;
        const icon = document.createElement('img');
        icon.src = iconSrc;
        toggleNode.append(icon);
        
        toggleNode.addEventListener('click', () => {
            collapsedNode.style.height = parseInt(collapsedNode.style.height) ? 0 : collapseHeight + 'px';
            contentNode.classList.toggle('roadmap__collapse-content_active');
            toggleNode.classList.toggle('roadmap__collapse-toggle_active');
        });
    });
}