const setListeners = () => {
    const colors = document.querySelectorAll('.place');

    for(const color of colors){
        color.addEventListener('click', () => {
            const child = color.children[0];

            const colorValue = child.innerHTML;

            navigator.clipboard.writeText(colorValue);

            child.classList.add('clicked');
            child.innerHTML = 'Copié';

            setTimeout(() => {
                child.classList.remove('clicked');
                child.innerHTML = colorValue;
            }, 1000);
        });
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setListeners);
} else {
    setListeners();
}
