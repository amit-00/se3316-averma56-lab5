import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private snackBar:MatSnackBar) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error:HttpErrorResponse) => {
                let errorMessage = 'An unkown error occured'
                if(error.error.errors[0].msg){
                    errorMessage = error.error.errors[0].msg
                }
                console.log(error);
                this.snackBar.open(errorMessage, 'Dismiss', { duration: 3000 });
                return throwError(error);
            })
        );
    }

    openSnackBar(message) {
        this.snackBar.open(message, 'Dismiss', { duration: 2000 });
      }
}