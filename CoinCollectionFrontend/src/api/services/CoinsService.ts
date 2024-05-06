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
     * @param coinId
     * @returns CoinDto Success
     * @throws ApiError
     */
    public static deleteCoinsById(
        coinId: number,
    ): CancelablePromise<CoinDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
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
    /**
     * @param requestBody
     * @returns CoinDto Success
     * @throws ApiError
     */
    public static postCoins(
        requestBody?: CoinDto,
    ): CancelablePromise<CoinDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Coins',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CoinDto Success
     * @throws ApiError
     */
    public static putCoins(
        requestBody?: CoinDto,
    ): CancelablePromise<CoinDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/Coins',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param coinId
     * @returns any Success
     * @throws ApiError
     */
    public static getCoinsByIdFront(
        coinId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Coins/by-id/{coinId}/front',
            path: {
                'coinId': coinId,
            },
        });
    }
    /**
     * @param coinId
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static postCoinsByIdFront(
        coinId: number,
        requestBody?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Coins/by-id/{coinId}/front',
            path: {
                'coinId': coinId,
            },
            body: requestBody,
            mediaType: 'image/png',
        });
    }
    /**
     * @param coinId
     * @returns any Success
     * @throws ApiError
     */
    public static getCoinsByIdBack(
        coinId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Coins/by-id/{coinId}/back',
            path: {
                'coinId': coinId,
            },
        });
    }
    /**
     * @param coinId
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static postCoinsByIdBack(
        coinId: number,
        requestBody?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Coins/by-id/{coinId}/back',
            path: {
                'coinId': coinId,
            },
            body: requestBody,
            mediaType: 'image/png',
        });
    }
}
