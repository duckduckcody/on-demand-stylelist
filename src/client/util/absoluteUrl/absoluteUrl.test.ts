import { absoluteUrl } from './absoluteUrl';

test('null with nothing passed', () => {
  expect(absoluteUrl('')).toBe(null);
});

test('// into https://', () => {
  expect(absoluteUrl('//google.com')).toBe('https://google.com');
});

test('// anywhere else to have no effect', () => {
  expect(absoluteUrl('google.//com')).toBe('google.//com');
});
