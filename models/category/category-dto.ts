import { TransactionType } from "../extension/transaction-type";

/**
 *
 * @export
 * @interface CategoryDto
 */
export interface CategoryDto {
    /**
     *
     * @type {string}
     * @memberof CategoryDto
     */
    id: string;
    /**
     *
     * @type {string}
     * @memberof CategoryDto
     */
    name: string | null;
    /**
     *
     * @type {TransactionType}
     * @memberof CategoryDto
     */
    type: TransactionType;
    /**
     *
     * @type {string}
     * @memberof CategoryDto
     */
    icon: string | null;
}
