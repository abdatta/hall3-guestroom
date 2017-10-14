import { Hall3GuestroomPage } from './app.po';

describe('hall3-guestroom App', () => {
  let page: Hall3GuestroomPage;

  beforeEach(() => {
    page = new Hall3GuestroomPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
