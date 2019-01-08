import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  navigateToAddTask() {
    return browser.get('/task/add');
  }

  navigateToViewTask() {
    return browser.get('/task');
  }
  navigateToAddProject() {
    return browser.get('/addProject');
  }
  navigateToAddUser() {
    return browser.get('/addUser');
  }
  
  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getViewTask() {
    return element(by.cssContainingText('a','View Task'));
  }
}
