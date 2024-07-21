import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly dashboardLink: Locator;
    readonly logoutLink: Locator;
    readonly categoryTypesLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.dashboardLink = page.getByRole('link', { name: 'Dashboard' })
        this.logoutLink = page.locator('#sidenav-collapse-main').getByText('Salir')
        this.categoryTypesLink = page.getByRole('link', { name: 'Tipos de Categorias' });
    }

    async validateHomePageVisibility(){
        await expect(this.dashboardLink).toBeVisible();
        await expect(this.logoutLink).toBeVisible();
    }

    async goToCategoryTypes() {
        await this.categoryTypesLink.click();
    }
}

export default HomePage;