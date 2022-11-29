import { Injectable } from '@angular/core';

import { environment as config } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../user/storageService';
@Injectable()
export class BaseService {

    OBJECT_ERROR = { 'code': 400, 'message': 'Please check your internet connection and try again' };
    constructor(protected http: HttpClient, private storageService?: StorageService) {
    }


    private getUrlApi() {
        return config.host;
    }

    protected getData(path?: string): Observable<any> {
        let options = this.getHeaders();
        return this.http.get(`${this.getUrlApi()}/${path}`, options)
            .pipe(
                map(res => {
                    return res
                }),
                catchError(err =>

                    this.getError(err))
            )
    }

    protected postData(path?: string, body?: any, headersPairs?: any): Observable<any> {
        let options = this.getHeaders(headersPairs);
        return this.http.post(`${this.getUrlApi()}/${path}`, body, options)
            .pipe(
                map(res => {
                    return res
                }),
                catchError(err => this.getError(err))
            )
    }

    protected putData(path?: string, body?: any, headersPairs?: any): Observable<any> {
        let options = this.getHeaders(headersPairs);
        return this.http.put(`${this.getUrlApi()}/${path}`, body, options)
            .pipe(
                map(res => {
                    return res
                }),
                catchError(err => this.getError(err))
            );
    }

    protected delete(path? : string, headersPairs?: any) {
        let options = this.getHeaders(headersPairs);
        return this.http.delete(`${this.getUrlApi()}/${path}`, options)
            .pipe(
                map(res => {
                    return res
                }),
                catchError(err => this.getError(err))
            )
    }

    getError(err? : any) {
        if (err.error.code === 102 || err.error.code === 107) {
        }

        return throwError({ http_status: err.status, errors: err.error });
    }

    private getHeaders(headersPairs?: any) {
        const httpOptions = {
            headers: new HttpHeaders()
        }

        if (localStorage.getItem('token')) {
            const token : string | any = localStorage.getItem('token');
            httpOptions.headers = httpOptions.headers.set('token', token);
        }

        if (sessionStorage.getItem('token')) {
            const token : string | any = sessionStorage.getItem('token');
            httpOptions.headers = httpOptions.headers.set('token', token);
        }
        httpOptions.headers = httpOptions.headers.set('locale', localStorage.getItem('locale') || 'ja');
        httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json');

        if (headersPairs) {
            headersPairs.forEach((element : any) => {
                httpOptions.headers = httpOptions.headers.set(element.key, element.value);
            });
        }
        return httpOptions;
    }

}
