import { FormBuilder, FormGroup, ValidatorFn } from "@angular/forms";
import { Validators } from '@angular/forms';

export class RegisterPageForm {
    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm() : FormGroup {
        let form = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            repeatPassword: [''],
            phone: ['', [Validators.required]],
            address: this.formBuilder.group({
                street: ['', [Validators.required]],
                city: ['', [Validators.required]],
                state: ['', [Validators.required]],
                zipCode: ['', [Validators.required]],
                number: ['', [Validators.required]]
            })
        });

        form.get('repeatPassword').setValidators(matchPasswordAndRepeatPassword(form));

        return form;
    }

    getForm() : FormGroup {
        return this.form;
    }
}

function matchPasswordAndRepeatPassword(form: FormGroup) : ValidatorFn {
    const password = form.get('password');
    const repeatPassword =  form.get('repeatPassword');

    const validator = () => {
        return password.value == repeatPassword.value ? null : {isntMatching: true}
    };

    return validator;
}
