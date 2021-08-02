const regexExp = {
    latLng: /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
    cacheDetails: /^.{10,}$/,
    cacheName: /^.{8,}$/,
}

export const validate = (text, regex) => {
    var re = new RegExp(regexExp[regex]);
    if (re.test(text)) {
        return true;
    } 
    return false;
}