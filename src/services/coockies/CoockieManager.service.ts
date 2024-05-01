class CookieManagerService {
    private readonly cookieName = 'token';
    private readonly expiryDays = 30;
    setCookie(value: string) {
        const date = new Date();
        date.setTime(date.getTime() + (this.expiryDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = this.cookieName + "=" + value + ";" + expires + ";path=/";
    }

    getCookie(): string | null {
        const name = this.cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for(let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null;
    }
}

export const cookieManager = new CookieManagerService();