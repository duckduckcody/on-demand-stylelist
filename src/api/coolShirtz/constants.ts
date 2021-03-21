export const COOL_SHIRTZ_BASE_URL = 'https://shirtz.cool';

interface CidMapValue {
  uri: string;
}

export const coolShirtzCidMap = new Map<string, CidMapValue>()
  .set('3000', { uri: 'jumpers' })
  .set('3001', { uri: 'jackets' })
  .set('3002', { uri: 'jumpers' })
  .set('3003', { uri: 'pants-1' })
  .set('3004', { uri: 'basic-tees' })
  .set('3006', { uri: 'crop-tops' });
