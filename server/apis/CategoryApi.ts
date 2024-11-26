/* tslint:disable */
/* eslint-disable */
/**
 * ExpenseManagement.API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  TransactionType,
} from '../models/index';
import {
    TransactionTypeFromJSON,
    TransactionTypeToJSON,
} from '../models/index';

export interface ApiCategoryGetAllCategoryByTypeTypeGetRequest {
    type: TransactionType;
    fields?: string;
}

/**
 * 
 */
export class CategoryApi extends runtime.BaseAPI {

    /**
     */
    async apiCategoryGetAllCategoryByTypeTypeGetRaw(requestParameters: ApiCategoryGetAllCategoryByTypeTypeGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['type'] == null) {
            throw new runtime.RequiredError(
                'type',
                'Required parameter "type" was null or undefined when calling apiCategoryGetAllCategoryByTypeTypeGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['fields'] != null) {
            queryParameters['fields'] = requestParameters['fields'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/Category/getAllCategoryByType/{type}`.replace(`{${"type"}}`, encodeURIComponent(String(requestParameters['type']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async apiCategoryGetAllCategoryByTypeTypeGet(requestParameters: ApiCategoryGetAllCategoryByTypeTypeGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiCategoryGetAllCategoryByTypeTypeGetRaw(requestParameters, initOverrides);
    }

}
