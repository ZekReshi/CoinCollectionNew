/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CoinDto } from '../models/CoinDto';
import type { CoinGroupByCurrencyDto } from '../models/CoinGroupByCurrencyDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CoinsService {
    /**
     * @returns CoinDto Success
     * @throws ApiError
     */
    public static getCoinsAll(): CancelablePromise<Array<CoinDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Coins/all',
        });
    }
    /**
     * @param coinId
     * @returns CoinDto Success
     * @throws ApiError
     */
    public static getCoinsById(
        coinId: number,
    ): CancelablePromise<CoinDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Coins/by-id/{coinId}',
            path: {
                'coinId': coinId,
            },
        });
    }
    /**
     * @param currencyId
     * @returns CoinDto Success
     * @throws ApiError
     */
    public static getCoinsByCurrency(
        currencyId: number,
    ): CancelablePromise<Array<CoinDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Coins/by-currency/{currencyId}',
            path: {
                'currencyId': currencyId,
            },
        });
    }
    /**
     * @returns CoinGroupByCurrencyDto Success
     * @throws ApiError
     */
    public static getCoinsByCurrencies(): CancelablePromise<Array<CoinGroupByCurrencyDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Coins/by-currencies',
        });
    }
}
