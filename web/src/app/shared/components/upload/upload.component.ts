import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { UUID } from 'angular2-uuid';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Output() changeImage = new EventEmitter();
  @Input() urlImage: string = '';

  fileUpload: string = '';
  text: string;
  background: string;
  formUpload: string;
  error: string;
  constructor() {
    this.fileUpload = UUID.UUID();
    this.text = UUID.UUID();
    this.background = UUID.UUID();
    this.formUpload = UUID.UUID();
    this.error = UUID.UUID();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['urlImage']) {
      setTimeout(() => {
        this.setImageUrl(this.urlImage);
      }, 100);
    }
  }

  setImageUrl(url: string) {
    if (!url) {
      return;
    }
    console.log(1);
    const img = document.createElement('img');
    const background: HTMLElement | any = document.getElementById(this.background);
    this.hide_error();
    img.setAttribute('src', url);
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.maxHeight = '250px';
    background.appendChild(img);
    background.style.display = 'block';
  }

  ngOnInit() {
  }

  upload() {
    this.hide_error();
    const upload: HTMLElement | null = document.getElementById(this.fileUpload);
    if (upload) {
      upload.click();
    }
  }

  on_change(event: any) {
    const file = this.get_file(event);
    console.log(file);
    const text = document.getElementById(this.text);
    if (file) {
      this.setImageFile(file);

      if (text) {
        text.style.display = 'none';
      }
      this.changeImage.emit({ file: file });
    } else {
      this.changeImage.emit({ file: '' });
      if (text) {
        text.style.display = 'block';
      }
    }
  }

  get_file(event: any) {
    const file = event.target.files[0];
    if (file) {
      return this.validate_file(file);
    } else {
      return null;
    }
  }


  validate_file(file: any) {
    const name = file.name.toLowerCase();
    const extension = name.substring(name.lastIndexOf('.') + 1);
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const maxSizeMegabyte = 2;
    const maxSizeByte = maxSizeMegabyte * 1048576;
    if (allowedExtensions.indexOf(extension) === -1) {
      this.show_error('Only these file types are accepted: ' + allowedExtensions.join(', '));
    } else if (file.size > maxSizeByte) {
      this.show_error('File must be select < ' + maxSizeMegabyte + ' MB!');
    } else {
      this.hide_error();
      return file;
    }
    return null;
  }

  hide_error() {
    const errors = <HTMLElement>document.getElementById(this.error);
    const text = <HTMLElement>document.getElementById(this.text);
    errors.innerHTML = '';
    errors.style.display = 'none';
    text.style.display = 'none';

  }
  show_error(message: string) {
    const background: HTMLElement | any = document.getElementById(this.background);
    background.innerHTML = '';
    background.style.display = 'none';
    const errors = <HTMLElement>document.getElementById(this.error);
    errors.style.display = 'block';
    errors.innerHTML = message;
  }


  setImageFile(file: any) {
    const img = document.createElement('img');
    const reader = new FileReader();
    const background: HTMLElement | any = document.getElementById(this.background);

    background.innerHTML = '';
    this.hide_error();
    reader.onloadend = function () {
      img.src = reader.result as string;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.maxHeight = '250px';
    };
    reader.readAsDataURL(file);
    background.appendChild(img);
    background.style.display = 'block';
  }
}
