import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
@Injectable({
    providedIn: 'root'
})
export class SwalService {
    constructor() { }
    Swal(
        text?: string,
        title?: string,
        icon?: SweetAlertIcon,
        confirmButtonText?: string,
        target?: any,
        cancelButtonText?: string,
        showCancelButton?: boolean,
    ): Promise<SweetAlertResult> {
        const options: SweetAlertOptions = {
            text,
            title,
            icon,
            confirmButtonText,
            target,
            cancelButtonText,
            showCancelButton
        };
        return Swal.fire(options);
    }
}