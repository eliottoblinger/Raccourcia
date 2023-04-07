const initTransition = () => {
    const transition = document.createElement('div');

    transition.id = 'raccourcia-modal-transition';

    transition.classList.add('hide');
    transition.style.cssText = `
    transition: opacity 0.5s ease;
    z-index: 10000;
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

    //need height: auto;
    modal.style.cssText = `
    z-index: 10; 
    overflow: hidden; 
    background-color: white; 
    text-align:left; 
    min-width: 50vw; 
    height: 50vh;
    border-radius: 0.5rem;`;

    modal.innerHTML = `<iframe id="modal-content"; style="height:100%; width: 100%;"></iframe>`;

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
}

const toggleModal = (htmlContent) => {
    const transition = document.querySelector('#raccourcia-modal-transition');

    if(!transition.classList.contains("hide")) {
        transition.classList.add('div-leave');
        transition.classList.replace('div-leave', 'div-leave-to');

        transition.addEventListener('transitionend', () => {
            transition.classList.replace('div-leave-to', 'hide');
        }, { once: true });

        document.body.classList.toggle('noscroll');
        return;
    }

    const iframe = document.querySelector('#modal-content');

    iframe.contentDocument.write(htmlContent);

    iframe.frameBorder = 0;

    transition.classList.replace('hide', 'div-enter');

    setTimeout(() => {
        transition.classList.replace('div-enter', 'div-enter-to');

        transition.addEventListener('transitionend', () => {
            transition.classList.remove('div-enter-to');
        }, { once: true });

        document.body.classList.toggle('noscroll');
    }, 100);
}

export { prepareModal, toggleModal };
