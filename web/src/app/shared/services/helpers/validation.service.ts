import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public only_number = '^[0-9]*$';
  // public pattern_email = '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$';
  public pattern_email = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,6}$';
  public number_include_full_size = '^([0-9]|[０-９])*$';
  public number_only_full_size = '^[０-９]*$';
  public only_japan_language = '^[一-龯]*$';
  public only_japan_language_hiragana_katacana = '^[ぁ-んァ-ン]*$';
  public only_japan_language_hiragana = '^[ぁ-ん]*$';
  public only_japan_language_Katakana_fullwidth = '^[ァ-ン]*$';
  public only_japan_language_Katakana_haftwidth = '^[ｧ-ﾝﾞﾟ]*$';
  public only_japan_fullsize_alpha = '^[Ａ-ｚ]*$';
  public japan_postal_code = '^[0-9]{3}\-[0-9]{4}*$';
  public japan_postal_code1 = '^[0-9]{3}$';
  public japan_postal_code2 = '^[0-9]{4}$';
  public alpa = '^[a-zA-Z0-9]*$';

  public japan_phone = '^[0-9]{3}\-[0-9]{4}\-[0-9]{4}*$';
  public pattern_expiration = '^[0-9]{2}\/[0-9]{2}$';
  public pattern_number_card = '^[0-9]{12,20}$';
  public pattern_number_securitycode = '^[0-9]{3,4}$';
  public pattern_number_float = '^([0-9]+[\.]?[0-9]*){1}$';


  public pattern_tw = '^(https:\/\/twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))$';
  public pattern_fb = '^(https:\/\/facebook.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))$';
  public pattern_instagram = '^(https:\/\/instagram.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))$';
  public pattern_yt = '^(https:\/\/youtube.com\/(channel\/|c\/)(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))$';


  constructor() { }


  /*
  formErrors = {
    last_name_kana: '',
    zipcode: {
      zipcode2: '',
      zipcode1: ''
    }};
  
  validationMessages = {
    last_name_kana: {
      required: 'text',
      pattern: 'text',
      maxlength: 'text'
    },
    zipcode: {
      zipcode2: {
        required: 'text',
        pattern: 'text'
      },
      zipcode1: {
        required: 'text',
        pattern: 'text'
      }
    }};
  */
  public getValidate(form: FormGroup, formErrors: any, validationMessages: any) {
    if (!form) {
      return formErrors;
    }
    // clear previous error message (if any)
    this.resetFormErrors(formErrors);
    for (const field in formErrors) {
      const control = form.get(field);
      if (typeof formErrors[field] == 'object') {
        this.getValidate(control as FormGroup, formErrors[field], validationMessages[field])
      }
      if (typeof formErrors[field] == 'string') {
        if (control && control.dirty && !control.valid && !formErrors[field]) {
          const messages = validationMessages[field];
          // tslint:disable-next-line:forin
          for (const key in control.errors) {
            if (!formErrors[field] && messages[key]) {
              formErrors[field] += messages[key] + '';
            }
          }
        }
      }
    }
    return formErrors;
  }


  checkErorrNotDiry(form: FormGroup, formErrors: any, validationMessages: any) {
    if (!form) {
      return formErrors;
    };
    // clear previous error message (if any)
    this.resetFormErrors(formErrors);
    for (const field in formErrors) {
      
      const control = form.get(field) as any;

      if (control) {
        if (control.controls && control.controls.length) {
          for (let index = 0; index < control.controls.length; index++) {
            const element = control.controls[index] as FormGroup;
            element.markAsDirty();
          }
        }

        if (typeof formErrors[field] == 'object') {
          this.checkErorrNotDiry(control as FormGroup, formErrors[field], validationMessages[field])
        }

        if (typeof formErrors[field] == 'string') {
          (control as FormControl).markAsDirty();
          if (control && control.invalid && !formErrors[field]) {
            const messages = validationMessages[field];
            // tslint:disable-next-line:forin
            for (const key in control.errors) {
              if (!formErrors[field] && messages[key]) {
                formErrors[field] += messages[key] + '';
              }
            }
          }
        }
      }
    }
    return formErrors;
  }
  //no contetn validater
  public noWhitespaceValidator(control: FormControl) {
    let isWhitespace = null;
    if (control.value) {
      if (String(control.value).trim().length == 0) {
        isWhitespace = true;
      } else {
        isWhitespace = null;
      }
    } else {
      isWhitespace = null;
    }

    return isWhitespace ? { 'whitespace': true } : null;
  }



  public fullWidthNumConvert(fullWidthNum: string) {
    return fullWidthNum.replace(/[\uFF10-\uFF19]/g, function (m: string) {
      return String.fromCharCode(m.charCodeAt(0) - 0xfee0);
    });
  }

  matchPassword(control: AbstractControl) {
    let parent: any = control.parent;
    if (parent) {
      let password = parent.get('password').value;
      let confirmPassword = control.value;

      if (password != confirmPassword) {
        return { isMatching: true };
      } else {
        return null
      }
    } else {
      return null;
    }
  }

  matchEmail(control: AbstractControl) {
    let parent: any = control.parent;
    if (parent) {
      let password = parent.get('email').value;
      let confirmPassword = control.value;

      if (password != confirmPassword) {
        return { isMatching: true };
      } else {
        return null
      }
    } else {
      return null;
    }
  }


  resetFormErrors(ferrors: any) {
    for (let prop in ferrors) {
      if (typeof ferrors[prop] == 'object') {
        this.resetFormErrors(ferrors[prop]);
      } else {
        ferrors[prop] = '';
      }
    }
  }
}
