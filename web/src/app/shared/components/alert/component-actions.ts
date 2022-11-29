import { Injectable, ComponentFactoryResolver, ComponentRef, ApplicationRef, Injector, EmbeddedViewRef, ViewChild } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { AlertConfirmComponent } from './alert-confirm/alert-confirm.component';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComponentActions {
    loadingComponent: ComponentRef<LoadingComponent> | any;
    alertComponent: ComponentRef<AlertConfirmComponent> | any;

    subject_save = new Subject();
    subject_text = new Subject();
    subject_success = new Subject();
    subject_close = new Subject();

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector) { }
    // LOADING
    showLoading() {
        if(this.loadingComponent){
            this.removeLoadingComponentFromBody();
        }
        this.appendLoadingComponentToBody();
    }
    hideLoading() {
       
        this.removeLoadingComponentFromBody();
    }

    appendLoadingComponentToBody() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
        const componentRef = componentFactory.create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);
        this.loadingComponent = componentRef;
    }

    removeLoadingComponentFromBody() {
        this.appRef.detachView(this.loadingComponent.hostView);
        this.loadingComponent.destroy();
    }
    // POPUP

    showPopup(alert : object, inputShow? : boolean) {
        if(this.alertComponent){
            this.hidePopup();
        }
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertConfirmComponent);
        const componentRef = componentFactory.create(this.injector);
        componentRef.instance.alert = alert;
        componentRef.instance.show_input = inputShow || false;
        componentRef.instance.handleClose.subscribe(
            res => {
                this.hidePopup();
                this.subject_close.next(res);
            }
        );
        componentRef.instance.handleSave.subscribe(
            res => {
                this.subject_save.next(res);
                this.hidePopup();
            }
        );
        componentRef.instance.handleKeyup.subscribe(
            res => {
                this.subject_text.next(true);
            }
        );
        componentRef.instance.handleSuccess.subscribe(
            res => {
                this.subject_success.next(res);
                this.hidePopup();
            }
        );
        this.appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);
        this.alertComponent = componentRef;
    }

    hidePopup() {
        this.appRef.detachView(this.alertComponent.hostView);
        this.alertComponent.destroy();
    }
    /*
    // loading
        Showloading : showLoading();
        hideLoading : hideLoading();
    // alert
        showPopup({title : '', message: '', mode : number, ?id}, option?: true);
        // event
        SAVE: .subject_save.subscribe();
        INPUT_TEXT: .subject_text.subscribe();
        COLSE, CANCEL: auto close
    */

}
