import { FormBuilder, FormGroup, ValidatorFn } from "@angular/forms";
import { Validators } from '@angular/forms';
import { findAddressNumber, findCity, findState, findStreet, findZipCode } from "src/app/utilities/address-utilities";

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
                zipCode: ['', [Validators.required]]
            })
        });

        form.get('repeatPassword').setValidators(matchPasswordAndRepeatPassword(form));

        return form;
    }

    setAddress(place) {
        const addressForm = this.form.get('address');

        addressForm.get('street').setValue(findStreet(place.address_components));
        addressForm.get('city').setValue(findCity(place.address_components));
        addressForm.get('state').setValue(findState(place.address_components));
        addressForm.get('zipCode').setValue(findZipCode(place.address_components));
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
