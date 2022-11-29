import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../user/storageService';

@Injectable({ providedIn: 'root' })
export class LangService {
    private lang = new BehaviorSubject('');
    public _lang = this.lang.asObservable();
    constructor(private storageService: StorageService) {
        this.lang.next(this.storageService.getLang() || 'en');
    }

    toogle(value) {
        this.lang.next(value);
        this.storageService.setLang(value);
    }
}