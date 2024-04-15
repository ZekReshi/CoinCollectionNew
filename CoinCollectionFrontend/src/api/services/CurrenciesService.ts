/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrencyDto } from '../models/CurrencyDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CurrenciesService {
    /**
     * @returns CurrencyDto Success
     * @throws ApiError
     */
    public static getCurrenciesAll(): CancelablePromise<Array<CurrencyDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Currencies/all',
        });
    }
    /**
     * @param currencyId
     * @returns CurrencyDto Success
     * @throws ApiError
     */
    public static getCurrenciesById(
        currencyId: number,
    ): CancelablePromise<CurrencyDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Currencies/by-id/{currencyId}',
            path: {
                'currencyId': currencyId,
            },
        });
    }
}
