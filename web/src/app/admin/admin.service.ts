import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/helpers/base.service';

@Injectable()
export class AdminService extends BaseService {
    constructor(private httpc: HttpClient) {
        super(httpc)
    }

    getListWork(page: number, limit: number, text: string) {
        return this.getData(`work/admin?page=${page}&limit=${limit}&search=${text}`);
    }

    createWork(body: any) {
        return this.postData(`work`, body);
    }

    updateWork(body: any, id: any) {
        return this.putData(`work/${id}`, body);
    }

    getDetailWork(id: any) {
        return this.getData(`work/${id}`);
    }

    deleteWork(id: string) {
        return this.delete(`work/${id}`);
    }

    getListPlan(page: number, limit: number, text: string) {
        return this.getData(`user/admin/list?page=${page}&limit=${limit}&text=${text}`);
    }

    createPlan(body: any) {
        return this.postData(``, body);
    }

    updatePlan(body: any, id: any) {
        return this.postData(``, body);
    }

    deletePlan(id: string) {
        return this.delete(`id`);
    }

    getListUser(page: number, limit: number, text: string) {
        return this.getData(`user/admin/list?page=${page}&limit=${limit}&text=${text}`);
    }

    createUser(body: any) {
        return this.postData(``, body);
    }

    updateUser(body: any, id: any) {
        return this.postData(``, body);
    }

    deleteUser(id: string) {
        return this.delete(`id`);
    }

    getListTag(page: number, limit: number, text: string) {
        return this.getData(`tag?page=${page}&limit=${limit}&search=${text}`);
    }

    getDetailTag(id: any) {
        return this.getData(`tag/${id}`);
    }

    createTag(body: any) {
        return this.postData(`tag`, body);
    }

    updateTag(body: any, id: any) {
        return this.putData(`tag/${id}`, body);
    }

    deleteTag(id: string) {
        return this.delete(`tag/${id}`);
    }

    getListCategory(page: number, limit: number, text: string) {
        return this.getData(`category?page=${page}&limit=${limit}&search=${text}`);
    }

    getDetailCategory(id: any) {
        return this.getData(`category/${id}`);
    }

    createCategory(body: any) {
        return this.postData(`category`, body);
    }

    updateCategory(body: any, id: any) {
        return this.putData(`category/${id}`, body);
    }

    deleteCategory(id: string) {
        return this.delete(`category/${id}`);
    }

    getDataPromise(path: string, another: boolean = false) {
        return new Promise((resolve: any, reject: any) => {
            this.getData(path).subscribe(res => {
                let docs: any[] = [];
                if (another) {
                    // for (let index = 0; index < res.docs.length; index++) {
                    //     const element = res.docs[index];
                    //     let doc = element.parent.map((e: any) => {
                    //         return {
                    //             itemName: e.title,
                    //             id: e._id,
                    //             item: JSON.stringify(
                    //                 {
                    //                     itemName: e.title,
                    //                     id: e._id
                    //                 }
                    //             )
                    //         }
                    //     });
                    //     docs = docs.concat(doc);
                    // }
                    docs = res.docs.filter((e: any) => {
                        return e.parent.length;
                    }).map((e: any) => {
                        return {
                            itemName: e.title,
                            id: e._id,
                            item: JSON.stringify(
                                {
                                    itemName: e.title,
                                    id: e._id
                                }
                            )
                        }
                    }
                    )
                    resolve(docs);
                } else {
                    docs = res.docs.map((e: any) => {
                        return {
                            itemName: e.title,
                            id: e._id,
                            item: JSON.stringify(
                                {
                                    itemName: e.title,
                                    id: e._id
                                }
                            )
                        }
                    });
                }

                resolve(docs);
            }, err => {
                resolve([]);
            });
        })
    }

    getListBanner(page: number, limit: number, text: string) {
        return this.getData(`banner?page=${page}&limit=${limit}&search=${text}`);
    }

    createBanner(body: any) {
        return this.postData(`banner`, body);
    }

    updateBanner(body: any, id: any) {
        return this.putData(`banner/${id}`, body);
    }

    deleteBanner(id: string) {
        return this.delete(`banner/${id}`);
    }


    getListNotice(page: number, limit: number, text: string) {
        return this.getData(`new?page=${page}&limit=${limit}&text=${text}`);
    }

    createNotice(body: any) {
        return this.postData(`new`, body);
    }

    getDetailNotice(id: any) {
        return this.getData(`new/${id}`);
    }

    updateNotice(body: any, id: any) {
        return this.putData(`new/${id}`, body);
    }

    deleteNotice(id: string) {
        return this.delete(`new/${id}`);

    }

    // portal code
    getAddressFromZipcode(zip_code: string) {
        return this.getData(`list/location/${zip_code}`);
    }
    
    getPrefectures() {
        return this.getData(`list/prefectures/jp`);
    }
}
