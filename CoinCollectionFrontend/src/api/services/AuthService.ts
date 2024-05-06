/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginDto } from '../models/LoginDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static postAuth(
        requestBody?: LoginDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Auth',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns string Success
     * @throws ApiError
     */
    public static getAuth(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Auth',
        });
    }
}
