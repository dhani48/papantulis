const global = {
    Cookie: () => ({
        getCookie: (search) => {
            var allcookies = document.cookie;
            var cookiearray = allcookies.split(';');
            var count = cookiearray.length;
            for(var i = 0; i < count; i++){
                var name = cookiearray[i].split('=')[0].replace(' ', '');
                if (name === search) return cookiearray[i].split('=')[1];
            }
        },
    
        setCookie: (variable, value, expires_seconds) => {
            var d = new Date();
            d = new Date(d.getTime() + 1000 * expires_seconds);
            document.cookie = variable + '=' + value + '; expires=' + d.toUTCString() + '; path=/;';
        },
    
        deleteCookie: (name) => {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
        }
    })
}

module.exports = global