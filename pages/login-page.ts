import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly authenticateButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.emailField = page.getByPlaceholder('Usuario o correo electrónico');
        this.passwordField = page.getByPlaceholder('Contraseña');
        this.authenticateButton = page.getByRole('button', { name: 'Autenticar' });
    }

    async fillFields(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
    }

    async clickAuthenticate() {
        await this.authenticateButton.click();
    }
}

export default LoginPage;