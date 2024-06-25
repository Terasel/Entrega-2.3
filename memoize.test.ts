import { createCacheKeyFromArgs, memoize } from './memoize';
import { describe, expect, afterEach, jest } from '@jest/globals';

const mocks = {
    add: jest.fn((x:number, y:number) => x + y)
};

const addMemoize = memoize(mocks.add);

afterEach(() => {
    mocks.add.mockClear();
});

const asyncAddMemoize = memoize(function (x: number, y: number) {
    let promise = new Promise(resolve => {
        setTimeout(() => {
            resolve(mocks.add(x, y));
        }, 500);
    });

    return promise;
});

describe('funció memoize', () => {
    it('la funció memoize hauria de crear una cacheKey a partir de dos arguments determinats', () => {
        const args = [2, 5];
        const cacheKey = createCacheKeyFromArgs(args);

        expect(cacheKey).toEqual('_2__5_');
    });

    it('la funció memoize hauria de donar el resultat correcte de la funció addMemoize', () => {
        const result = addMemoize(2, 5);

        expect(result).toEqual(7);
    });

    it('la funció memoize hauria de guardar el resultat de la funció addMemoize i cridar-la només una vegada', () => {
        expect.assertions(4);
        const addSpy = jest.spyOn(mocks, 'add');
        const resultOne = addMemoize(5, 5);
        const resultTwo = addMemoize(5, 5);
        const resultThree = addMemoize(5, 5);

        expect(resultOne).toEqual(10);
        expect(resultTwo).toEqual(10);
        expect(resultThree).toEqual(10);
        expect(addSpy).toBeCalledTimes(1);
    });

    it('la funció memoize hauria de donar el resultat correcte de la funció asyncAddMemoize', async () => {
        const result = await asyncAddMemoize(6, 12);

        expect(result).toEqual(18);
    });

    it('la funció memoize hauria de guardar el resultat de la funció asyncAddMemoize i cridar-la només una vegada', async () => {
        expect.assertions(4);
        const addSpy = jest.spyOn(mocks, 'add');
        const [resultOne, resultTwo, resultThree] = await Promise.all([
            asyncAddMemoize(8, 8),
            asyncAddMemoize(8, 8),
            asyncAddMemoize(8, 8)
        ]);

        expect(resultOne).toEqual(16);
        expect(resultTwo).toEqual(16);
        expect(resultThree).toEqual(16);
        expect(addSpy).toBeCalledTimes(1);
    });
});