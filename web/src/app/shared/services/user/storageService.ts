import { Injectable } from '@angular/core';
// const AUTHEN_TOKEN = 'authen_token';
const USER_INFO = 'data';
const locale = 'locale';
const TOKEN = 'token';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    setLang(lang: string) {
        return localStorage.setItem(locale, lang);
    }
    getLang() {
        return localStorage.getItem(locale);
    }

    setToken(value: string) {
        localStorage.setItem(TOKEN, value);
    }

    getToken() {
        return localStorage.getItem(TOKEN);

    }
    removeToken() {
        return localStorage.removeItem(TOKEN);
    }

}
