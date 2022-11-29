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

    getListPage(page: number, limit: number) {
        return this.getData(`profile?status=1&page=${page}&limit=${limit}`);
    }

}