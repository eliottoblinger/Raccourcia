const sluggify = (str) => {
    if(!str || str.trim() === '')
        return '';

    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

export default sluggify;
