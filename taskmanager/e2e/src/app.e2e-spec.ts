import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';
import { toBase64String } from '@angular/compiler/src/output/source_map';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should accept and save input values for Project', () => {
    page.navigateToAddProject();
    browser.element(by.id('projectName')).sendKeys('testproject');
    browser.element(by.id('checkboxselect')).sendKeys('true');
    expect(element(by.cssContainingText('th','Project')).getText()).toEqual('Project');
    expect(element(by.cssContainingText('th','No Of Tasks')).getText()).toEqual('No Of Tasks');
    expect(element(by.cssContainingText('th','Completed')).getText()).toEqual('Completed');
    expect(element(by.cssContainingText('th','Start Date')).getText()).toEqual('Start Date');
    expect(element(by.cssContainingText('th','End Date')).getText()).toEqual('End Date');
    expect(element(by.cssContainingText('th','Priority')).getText()).toEqual('Priority');
    element(by.id('addBtn')).click(); 
  });

  it('should accept and save input values for User', () => {
    page.navigateToAddUser();
    browser.element(by.id('firstName')).sendKeys('testfirstname');
    browser.element(by.id('lastName')).sendKeys('testlastname');
    browser.element(by.id('employeeId')).sendKeys('123');
    expect(element(by.id('firstName')).getAttribute("value")).toBe('testfirstname');
    expect(element(by.id('lastName')).getAttribute("value")).toBe('testlastname');
    expect(element(by.id('employeeId')).getAttribute("value")).toBe('123');
    expect(element(by.cssContainingText('th','First Name')).getText()).toEqual('First Name');
    expect(element(by.cssContainingText('th','Last Name')).getText()).toEqual('Last Name');
    expect(element(by.cssContainingText('th','Employee ID')).getText()).toEqual('Employee ID');
    expect(element(by.cssContainingText('th','Action')).getText()).toEqual('Action');
    element(by.id('addBtn')).click(); 
  });

 it('should accept and save input values for Add Task', () => {
    page.navigateToAddTask();
    browser.element(by.id('taskName')).sendKeys('testtask');
    browser.element(by.id('priority')).sendKeys('15');
    browser.element(by.id('startDate')).sendKeys('11-01-2018');
    browser.element(by.id('endDate')).sendKeys('11-03-2018'); 
    expect(element(by.id('taskName')).getAttribute("value")).toBe('testtask');
    expect(element(by.id('priority')).getAttribute("value")).toBe('15');
    expect(element(by.id('startDate')).getAttribute("value")).toBe('2018-11-01');
    expect(element(by.id('endDate')).getAttribute("value")).toBe('2018-11-03');
    element(by.id('addBtn')).click();
  });

  it('should display input fields and submit button for view Task', () => {
    page.navigateToViewTask();
    expect(element(by.cssContainingText('th','Task')).getText()).toEqual('Task');
    expect(element(by.cssContainingText('th','Priority Range (1-30)')).getText()).toEqual('Priority Range (1-30)');
    expect(element(by.cssContainingText('th','Parent')).getText()).toEqual('Parent');
    expect(element(by.cssContainingText('th','Start')).getText()).toEqual('Start');
    expect(element(by.cssContainingText('th','End')).getText()).toEqual('End');
  });  
 
});
