import { type Locator, type Page, expect } from '@playwright/test';

export class CategoryTypesPage {
    readonly page: Page;
    readonly addButton: Locator;
    readonly categoryNameField: Locator;
    readonly acceptButton: Locator;
    readonly lastPageBtn: Locator;
    readonly lastEntryName: Locator;
    readonly lastEntryParentName: Locator;
    readonly subcategoryCheckbox: Locator;
    readonly parentCombo: Locator;
    readonly parentInput: Locator;
    readonly parentOption: Locator;
    readonly modal: Locator;

    constructor(page: Page){
        this.page = page;
        this.addButton = page.getByRole('button', { name: 'Adicionar' });
        this.categoryNameField = page.locator('#input-username');
        this.acceptButton = page.getByRole('button', { name: 'Aceptar' });
        this.lastPageBtn = page.locator('ul.pagination .page-item:nth-last-of-type(2)');
        this.lastEntryName = page.locator('tbody tr:last-of-type td:first-of-type');
        this.lastEntryParentName = page.locator('tbody tr:last-of-type td:nth-of-type(2)');
        this.subcategoryCheckbox = page.getByRole('checkbox');
        this.parentCombo = page.getByRole('combobox');
        this.parentInput = page.getByRole('combobox').locator('input');
        this.parentOption = page.getByRole('option', { name: 'CategoryTestName1!'}).first();
        this.modal = page.getByLabel('Adicionar tipo de categoría');
    }

    async clickAddCategory() {
        await this.addButton.click();
    }

    async assertModalIsVisible(){
        await expect(this.modal).toBeVisible();
    }

    async assertModalIsHidden(){
        await expect(this.modal).toBeHidden();
    }

    async addCategoryName(categoryName: string) {
        await this.categoryNameField.fill(categoryName);
    }

    async clickAcceptButton(){
        await this.acceptButton.click();
    }

    async validateLastCategory(categoryName: string, parentName: string){
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');
        await this.lastPageBtn.click();
        await expect(this.lastEntryName).toHaveText(categoryName);
        await expect(this.lastEntryParentName).toHaveText(parentName);
    }

    async addParentCategory(parentName: string){
        await this.subcategoryCheckbox.check({ force: true });
        await expect(this.parentCombo).toBeVisible();
        await this.parentInput.fill(parentName);
        await this.parentOption.click();``
    }
}

export default CategoryTypesPage;