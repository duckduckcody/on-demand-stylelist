import { ClotheItem } from '../../../types/ClotheItem';
import { ClotheSortOption } from '../../../types/ClotheSort';
import { GetClothesOptions } from '../../../types/GetClothesOptions';
import { recursiveGetClothes } from '../../../api/common/recursiveGetClothes';

const requestOptions: GetClothesOptions = {
  limit: 10,
  page: 1,
  sort: ClotheSortOption.BEST_SELLING,
};

const clotheItem: Partial<ClotheItem> = { name: 'my name jeff', price: 60 };

const makeClothes = (amount: number): Partial<ClotheItem>[] =>
  [...Array(amount).keys()].map(() => clotheItem);

type s = (
  key: string,
  requestOptions: GetClothesOptions,
  makeUrlFunction: (key: string, requestOptions: GetClothesOptions) => string
) => Promise<Partial<ClotheItem>[]>;

const requestData = jest.fn() as jest.MockedFunction<s>;

test('10 clothes needed when 10 is returned should recurse once', async () => {
  const numberOfClothesNeeded = 10;
  const numberOfClothesReturnedByRequest = 10;

  requestData.mockImplementation(() =>
    Promise.resolve(makeClothes(numberOfClothesReturnedByRequest))
  );

  const responseClothes = await recursiveGetClothes(
    [],
    'test-uri',
    requestOptions,
    (key: string) => key,
    requestData,
    numberOfClothesReturnedByRequest,
    numberOfClothesNeeded
  );

  expect(responseClothes.length).toBeGreaterThanOrEqual(numberOfClothesNeeded);
  expect(requestData).toBeCalledTimes(1);
});

test('10 clothes needed when 5 is returned should recurse twice', async () => {
  const numberOfClothesNeeded = 10;
  const numberOfClothesReturnedByRequest = 5;

  requestData.mockImplementation(() =>
    Promise.resolve(makeClothes(numberOfClothesReturnedByRequest))
  );

  const responseClothes = await recursiveGetClothes(
    [],
    'test-uri',
    requestOptions,
    (key: string) => key,
    requestData,
    numberOfClothesReturnedByRequest,
    numberOfClothesNeeded
  );

  expect(responseClothes.length).toBeGreaterThanOrEqual(numberOfClothesNeeded);
  expect(requestData).toBeCalledTimes(2);
});

test('should recurse 10 times', async () => {
  const numberOfClothesNeeded = 100;
  const numberOfClothesReturnedByRequest = 10;

  requestData.mockImplementation(() =>
    Promise.resolve(makeClothes(numberOfClothesReturnedByRequest))
  );

  const responseClothes = await recursiveGetClothes(
    [],
    'test-uri',
    requestOptions,
    (key: string) => key,
    requestData,
    numberOfClothesReturnedByRequest,
    numberOfClothesNeeded
  );

  expect(responseClothes.length).toBeGreaterThanOrEqual(numberOfClothesNeeded);
  expect(requestData).toBeCalledTimes(10);
});

test('should recurse 4 times', async () => {
  const numberOfClothesNeeded = 33;
  const numberOfClothesReturnedByRequest = 9;

  requestData.mockImplementation(() =>
    Promise.resolve(makeClothes(numberOfClothesReturnedByRequest))
  );

  const responseClothes = await recursiveGetClothes(
    [],
    'test-uri',
    requestOptions,
    (key: string) => key,
    requestData,
    numberOfClothesReturnedByRequest,
    numberOfClothesNeeded
  );

  expect(responseClothes.length).toBeGreaterThanOrEqual(numberOfClothesNeeded);
  expect(requestData).toBeCalledTimes(4);
});

test('stop recursing if less than expected is returned from request', async () => {
  const numberOfClothesNeeded = 33;
  const numberOfClothesReturnedByRequest = 9;

  requestData
    .mockImplementationOnce(() =>
      Promise.resolve(makeClothes(numberOfClothesReturnedByRequest))
    )
    .mockImplementationOnce(() => Promise.resolve(makeClothes(2)));

  const responseClothes = await recursiveGetClothes(
    [],
    'test-uri',
    requestOptions,
    (key: string) => key,
    requestData,
    numberOfClothesReturnedByRequest,
    numberOfClothesNeeded
  );

  expect(responseClothes.length).toBe(11);
  expect(requestData).toBeCalledTimes(2);
});

test('stop recursing if zero is returned from request', async () => {
  const numberOfClothesNeeded = 40;
  const numberOfClothesReturnedByRequest = 10;

  requestData
    .mockImplementationOnce(() => Promise.resolve(makeClothes(10)))
    .mockImplementationOnce(() => Promise.resolve(makeClothes(10)))
    .mockImplementationOnce(() => Promise.resolve(makeClothes(0)));

  const responseClothes = await recursiveGetClothes(
    [],
    'test-uri',
    requestOptions,
    (key: string) => key,
    requestData,
    numberOfClothesReturnedByRequest,
    numberOfClothesNeeded
  );

  expect(responseClothes.length).toBe(20);
  expect(requestData).toBeCalledTimes(3);
});
