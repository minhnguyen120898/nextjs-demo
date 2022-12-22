import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/helpers/base.service';

@Injectable()

export class TopService extends BaseService {
    constructor(public httpClient: HttpClient
    ) {
        super(httpClient);
    }
    // USER

    getListWorkByCategory(id: any, page: number, limit: number) {
        return this.getData(`work?category_id=${id}&page=${page}&limit=${limit}`);
    }

    getListBanner(page: number, limit: number) {
        return this.getData(`banner?page=${page}&limit=${limit}`);
    }

    getCategory() {
        return new Promise((resolve, reject) => {
            return this.getData('category').subscribe(res => {
                let docs = res.docs.filter((e: any) => {
                    return e.parent.length == 0;
                });

                for (let index = 0; index < docs.length; index++) {
                    const element = docs[index];
                    element.childs = res.docs.filter((e: any) => {
                        let find = e.parent.find((c: any) => {
                            return c._id == element._id;
                        });
                        return e.parent.length && find;
                    });
                }

                resolve(docs);
            }, err => {
                resolve([]);
            })
        });
    }


    getListNotice(page: number, limit: number) {
        return this.getData(`new?page=${page}&limit=${limit}`);
    }


}