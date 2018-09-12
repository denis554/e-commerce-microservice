/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import OrderItemComponentsPage from './order-item.page-object';
import OrderItemUpdatePage from './order-item-update.page-object';

const expect = chai.expect;

describe('OrderItem e2e test', () => {
  let navBarPage: NavBarPage;
  let orderItemUpdatePage: OrderItemUpdatePage;
  let orderItemComponentsPage: OrderItemComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load OrderItems', async () => {
    navBarPage.getEntityPage('order-item');
    orderItemComponentsPage = new OrderItemComponentsPage();
    expect(await orderItemComponentsPage.getTitle().getText()).to.match(/Order Items/);
  });

  it('should load create OrderItem page', async () => {
    orderItemComponentsPage.clickOnCreateButton();
    orderItemUpdatePage = new OrderItemUpdatePage();
    expect(await orderItemUpdatePage.getPageTitle().getAttribute('id')).to.match(/storeApp.orderItem.home.createOrEditLabel/);
  });

  /* it('should create and save OrderItems', async () => {
        orderItemUpdatePage.setQuantityInput('5');
        expect(await orderItemUpdatePage.getQuantityInput()).to.eq('5');
        orderItemUpdatePage.setTotalPriceInput('5');
        expect(await orderItemUpdatePage.getTotalPriceInput()).to.eq('5');
        orderItemUpdatePage.statusSelectLastOption();
        orderItemUpdatePage.productSelectLastOption();
        orderItemUpdatePage.orderSelectLastOption();
        await orderItemUpdatePage.save();
        expect(await orderItemUpdatePage.getSaveButton().isPresent()).to.be.false;
    });*/

  after(() => {
    navBarPage.autoSignOut();
  });
});
