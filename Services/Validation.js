const regexExp = {
    latLng: /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
    cacheDetails: /^.{10,}$/,
    cacheName: /^.{8,}$/,
    userName: /^[a-zA-Z\\s]*$/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
}

export const validate = (text, regex) => {
    var re = new RegExp(regexExp[regex]);
    if (re.test(text)) {
        return true;
    } 
    return false;
}