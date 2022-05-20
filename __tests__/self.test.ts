import * as packagejson from '../package.json';

test('project author', () => {
  const { author } = packagejson;

  expect(author.name).toBe('Iakiv Kramarenko');
});

test('project version', () => {
  const { version } = packagejson;

  expect(version).toBe('1.0.0');
});
