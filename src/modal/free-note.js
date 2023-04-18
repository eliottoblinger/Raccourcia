const setListeners = () => {
    ClassicEditor
        .create(document.querySelector('#editor'))
        .then(async (editor) => {
            const content = document.querySelector('#editor-content').innerHTML;

            editor.setData(content);
        })
        .catch(error => {
            console.error( error );
        });
}


if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setListeners);
} else {
    setListeners();
}
