import { NgLandingPage } from './app.po';

describe('ng-landing App', () => {
  let page: NgLandingPage;

  beforeEach(() => {
    page = new NgLandingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
