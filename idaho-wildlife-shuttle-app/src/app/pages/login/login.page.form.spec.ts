import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginPageForm } from "./login.page.form";

describe('LoginPageForm', () => {
    let loginPageForm: LoginPageForm;
    let form: FormGroup;

    beforeEach(() => {
        loginPageForm = new LoginPageForm(new FormBuilder());
        form = loginPageForm.createForm();
    });

    it('should create an empty login form', () => {
        expect(form).not.toBeNull();
        expect(form.get('email')).not.toBeNull();
        expect(form.get('email').value).toEqual("");
        expect(form.get('email').valid).toBeFalsy();
        expect(form.get('password')).not.toBeNull();
        expect(form.get('password').value).toEqual("");
        expect(form.get('password').valid).toBeFalsy();
    });

    it('should state that the email address is invalid if it the email entered is invalid', () => {
        form.get('email').setValue('invalid email');

        expect(form.get('email').valid).toBeFalsy();
    });

    it('should state that the email address is valid if the email entered is valid', () => {
        form.get('email').setValue('valid@email.com');

        expect(form.get('email').valid).toBeTruthy();
    });

    it('should have a valid form', () => {
        form.get('email').setValue('valid@email.com');
        form.get('password').setValue("anyPassword");

        expect(form.valid).toBeTruthy();
    });
});
