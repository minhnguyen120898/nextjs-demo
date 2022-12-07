import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/helpers/base.service';

@Injectable()
export class AdminService extends BaseService {
    constructor(private httpc: HttpClient) {
        super(httpc)
    }

    getListBuilding(page: number, limit: number, text: string) {
        return this.getData(`user/admin/list?page=${page}&limit=${limit}&text=${text}`);
    }

    createBuilding(body: any){
        return this.postData(``, body);
    }

    updateBuilding(body: any, id: any){
        return this.postData(``, body);
    }

    deleteBuilding(id: string){
        return this.delete(`id`);
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

    getListUser(page: number, limit: number, text: string) {
        return this.getData(`user/admin/list?page=${page}&limit=${limit}&text=${text}`);
    }

    createUser(body: any){
        return this.postData(``, body);
    }

    updateUser(body: any, id: any){
        return this.postData(``, body);
    }

    deleteUser(id: string){
        return this.delete(`id`);
    }

    getListTag(page: number, limit: number, text: string) {
        return this.getData(`tag?page=${page}&limit=${limit}&search=${text}`);
    }

    getDetailTag(id: any){
        return this.getData(`tag/${id}`);
    }

    createTag(body: any){
        return this.postData(`tag`, body);
    }

    updateTag(body: any, id: any){
        return this.putData(`tag/${id}`, body);
    }

    deleteTag(id: string){
        return this.delete(`tag/${id}`);
    }

    getListCategory(page: number, limit: number, text: string) {
        return this.getData(`category?page=${page}&limit=${limit}&search=${text}`);
    }

    getDetailCategory(id: any){
        return this.getData(`category/${id}`);
    }

    createCategory(body: any){
        return this.postData(`category`, body);
    }

    updateCategory(body: any, id: any){
        return this.putData(`category/${id}`, body);
    }

    deleteCategory(id: string){
        return this.delete(`category/${id}`);
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

    getListNotice(page: number, limit: number, text: string) {
        return this.getData(`user/admin/list?page=${page}&limit=${limit}&text=${text}`);
    }

    createNotice(body: any){
        return this.postData(``, body);
    }

    updateNotice(body: any, id: any){
        return this.postData(``, body);
    }

    deleteNotice(id: string){
        return this.delete(`id`);
    }
}
