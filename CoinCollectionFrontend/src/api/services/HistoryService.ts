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
     * @param coinId
     * @returns HistoryEntryByCoinDto Success
     * @throws ApiError
     */
    public static getHistoryById(
        coinId: number,
    ): CancelablePromise<HistoryEntryByCoinDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/History/by-id/{coinId}',
            path: {
                'coinId': coinId,
            },
        });
    }
    /**
     * @param coinId
     * @returns any Success
     * @throws ApiError
     */
    public static getHistoryByIdUpdates(
        coinId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/History/by-id/{coinId}/updates',
            path: {
                'coinId': coinId,
            },
        });
    }
}
