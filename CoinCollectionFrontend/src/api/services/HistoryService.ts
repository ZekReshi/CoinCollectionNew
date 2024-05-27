/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HistoryEntryByCoinDto } from '../models/HistoryEntryByCoinDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HistoryService {
    /**
     * @param currencyId
     * @param value
     * @param year
     * @returns HistoryEntryByCoinDto Success
     * @throws ApiError
     */
    public static getHistory(
        currencyId?: number,
        value?: number,
        year?: number,
    ): CancelablePromise<Array<HistoryEntryByCoinDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/History',
            query: {
                'currencyId': currencyId,
                'value': value,
                'year': year,
            },
        });
    }
    /**
     * @param currencyId
     * @param value
     * @param year
     * @returns any Success
     * @throws ApiError
     */
    public static getHistoryUpdates(
        currencyId?: number,
        value?: number,
        year?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/History/updates',
            query: {
                'currencyId': currencyId,
                'value': value,
                'year': year,
            },
        });
    }
}
