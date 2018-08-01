import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

declare module 'rxjs/Observable' {
    interface Observable<T> {
        debug: (...any) => Observable<T>;
    }
}

Observable.prototype.debug = function (msg: string) {
    return this.do(
        (next) => {
            if (!environment.production) {
                console.log(msg, next);
            }
        },
        (err) => {
            if (!environment.production) {
                console.error('Error>>:', msg, err);
            }
        },
        () => {
            if (!environment.production) {
                console.log('Completed!');
            }
        }
    );
};
