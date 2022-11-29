import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/helpers/base.service';

@Injectable()
export class AdminService extends BaseService {
    constructor(private httpc: HttpClient) {
        super(httpc)
    }

    getListPlan(page: number, limit: number, text: string) {
        return this.getData(`user/admin/list?page=${page}&limit=${limit}&text=${text}`);
    }

    createPlan(body: any){
        return this.postData(``, body);
    }

    updatePlan(body: any, id: any){
        return this.postData(``, body);
    }

    deletePlan(id: string){
        return this.delete(`id`);
    }

    getListTag(page: number, limit: number, text: string) {
        return this.getData(`user/admin/list?page=${page}&limit=${limit}&text=${text}`);
    }

    createTag(body: any){
        return this.postData(``, body);
    }

    updateTag(body: any, id: any){
        return this.postData(``, body);
    }

    deleteTag(id: string){
        return this.delete(`id`);
    }

    getListCategory(page: number, limit: number, text: string) {
        return this.getData(`user/admin/list?page=${page}&limit=${limit}&text=${text}`);
    }

    createCategory(body: any){
        return this.postData(``, body);
    }

    updateCategory(body: any, id: any){
        return this.postData(``, body);
    }

    deleteCategory(id: string){
        return this.delete(`id`);
    }

    getListAd() {
        return this.getData('/');
    }

    createAd(body: any){
        return this.postData(``, body);
    }

    updateAd(body: any, id: any){
        return this.postData(``, body);
    }

    deleteAd(id: string){
        return this.delete(`id`);
    }
}
