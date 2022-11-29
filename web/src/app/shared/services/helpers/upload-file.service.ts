import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class UploadFileService {
    extension = {
        image: ['jpg', 'jpeg', 'png'],
        pdf: ['pdf'],
        excel: ['csv', 'xlsx', 'xls']
    }
    constructor(
    ) { }

    getBase64Default(file: any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.result) {
                    const base64 = reader.result.slice(reader.result.toString().indexOf('64,') + 3, reader.result.toString().length);
                    const base64_default = reader.result
                    resolve(
                        {
                            base64: base64,
                            base64_default: base64_default
                        }
                    )
                }
            }
            reader.onerror = error => reject(error);
        });
    }


    validate_file(file: any, extensions: string[]) {
        let result = {
            status: false,
            error: '',
            file: null,
            extension: '',
            fileName: ''
        }
        if (!file) {
            return result;
        }
        const name = file.name.toLowerCase();
        const extension = name.substring(name.lastIndexOf('.') + 1);
        const allowedExtensions = extensions;
        const maxSizeMegabyte = 2;
        const maxSizeByte = maxSizeMegabyte * 1048576;

        if (allowedExtensions.indexOf(extension) === -1) {
            result = {
                error: 'Only these file types are accepted: ' + allowedExtensions.join(', '),
                status: false,
                file: null,
                extension: extension,
                fileName: name
            }
        } else if (file.size > maxSizeByte) {
            result = {
                error: 'File must be select < ' + maxSizeMegabyte + ' MB!',
                status: false,
                file: null,
                extension: extension,
                fileName: name
            }
        } else {
            result = {
                error: '',
                status: true,
                file: file,
                extension: extension,
                fileName: name
            }
        }
        return result;
    }
}
