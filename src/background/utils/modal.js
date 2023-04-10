import {getAllCssColors} from "./cssReader.js";
import {findHighestOccurences} from "./array.js";

const initTransition = () => {
    const transition = document.createElement('div');

    transition.id = 'raccourcia-modal-transition';

    transition.classList.add('hide');
    transition.style.cssText = `
    transition: opacity 0.5s ease;
    z-index: 100000;
    position: fixed;`;

    return transition;
}

const initDialog = () => {
    const dialog = document.createElement('div');

    dialog.id = 'raccourcia-modal-dialog';

    dialog.style.cssText = `
    border: none; 
    background: transparent; 
    position: fixed; 
    top: 0; 
    left:0; 
    overflow: hidden; 
    width: 100%; 
    height: 100%; 
    display: flex; 
    justify-content: center; 
    align-items: center;`;

    return dialog;
}

const initBackdrop = () => {
    const backdrop = document.createElement('div');

    backdrop.id = 'raccourcia-modal-backdrop';

    backdrop.style.cssText = `
    position: fixed; 
    top:0; 
    left:0; 
    inset: 0px; 
    background-color: #130b0b; 
    opacity: 0.75;`;

    return backdrop;
}

const initModal = () => {
    const modal = document.createElement('div');

    modal.id = 'raccourcia-modal';

    modal.style.cssText = `
    z-index: 10; 
    overflow: hidden; 
    background-color: #F5F5F5
    text-align:left; 
    min-width: 50vw; 
    position: relative;
    height: 90vh;
    border-radius: 0.5rem;`;

    modal.innerHTML = `<svg id="close-modal-btn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
<iframe id="modal-content"; style="height:100%; width: 100%;"></iframe>`;

    return modal;
}

const initStyle = () => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
    body.noscroll
    {
        position: fixed;
        overflow-y: scroll;
        width: 100%;
    }
    .hide {
      display: none;
      opacity: 0;
    }
    .div-enter {
      opacity: 0;
    }
    .div-enter-to {
      opacity: 1;
    }
    .div-leave {
      opacity: 1;
    }
    .div-leave-to {
      opacity: 0;
    }
    #close-modal-btn{
      position: absolute;
      top: 0;
      right: 0;
      color: black;
      margin-top: 1rem;
      margin-right: 1rem;
      height: 20px;
    }
    #close-modal-btn:hover{
      cursor: pointer;
    }`;
    document.getElementsByTagName('head')[0].appendChild(style);
}

const prepareModal = () => {
    const transition = initTransition();

    const dialog = initDialog();

    const backdrop = initBackdrop();

    const modal = initModal();

    initStyle();

    dialog.appendChild(backdrop);
    dialog.appendChild(modal);
    transition.appendChild(dialog);
    document.body.appendChild(transition);

    document.querySelector('#close-modal-btn').addEventListener('click', () => {
        closeModal();
    });
}

const setIFrameContent = (content, code) => {
    const iframe = document.querySelector('#modal-content');
    const iframeDocument = iframe.contentDocument;

    iframeDocument.open();
    iframeDocument.write(content);
    iframeDocument.close();

    iframe.frameBorder = 0;

    if(code === 'GET_COLORS'){
        const colors = getAllCssColors();

        const colorPalette = findHighestOccurences(colors, 4).map(color => color.item);

        for(const [index, color] of colorPalette.entries()){
            const colorNumber = colorPalette.length - index - 1;

            iframeDocument.querySelector(`#c${colorNumber}`).style.backgroundColor = color;
            iframeDocument.querySelector(`#c${colorNumber} > div`).innerText = color.toUpperCase();
        }

        iframeDocument.getElementsByTagName("head")[0].insertAdjacentHTML(
            "beforeend",
            `<link rel="stylesheet" href="${chrome.runtime.getURL('src/modal/index.css')}" />`);

    }
}

const isModalOpened = () => !document.querySelector('#raccourcia-modal-transition')?.classList.contains('hide');

const closeModal = () => {
    const transition = document.querySelector('#raccourcia-modal-transition');

    transition.classList.add('div-leave');
    transition.classList.replace('div-leave', 'div-leave-to');

    transition.addEventListener('transitionend', () => {
        transition.classList.replace('div-leave-to', 'hide');
    }, { once: true });

    document.body.classList.toggle('noscroll');
}

const openModal = () => {
    const transition = document.querySelector('#raccourcia-modal-transition');

    transition.classList.replace('hide', 'div-enter');

    setTimeout(() => {
        transition.classList.replace('div-enter', 'div-enter-to');

        transition.addEventListener('transitionend', () => {
            transition.classList.remove('div-enter-to');
        }, { once: true });

        document.body.classList.toggle('noscroll');
    }, 100);
}

export { prepareModal, setIFrameContent, isModalOpened, openModal };
