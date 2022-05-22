import { Browser, remote } from 'webdriverio';
import { config } from '../wdio.local.chrome.conf';

let browser: Browser<'async'>;

beforeAll(async () => {
  browser = await remote(config);
});

afterAll(async () => {
  await browser.deleteSession();
});

test('todomvc: add todo | raw wdio version |', async () => {
  await browser.url('https://todomvc.com/examples/emberjs/');

  const newTodo = await browser.$('#new-todo');
  await newTodo.setValue('a');
  await newTodo.keys('Enter');
  await newTodo.setValue('b');
  await newTodo.keys('Enter');
  await newTodo.setValue('c');
  await newTodo.keys('Enter');

  const todos = await browser.$$('#todo-list>li');
  expect(todos).toHaveLength(3);
});
