import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('pwd').value; // to get value in input tag
        const confirmPassword = AC.get('cpwd').value; // to get value in input tag
        if (password !== confirmPassword) {
            AC.get('cpwd').setErrors({ MatchPassword: true });
        } else {

            return null;
        }
    }
}
