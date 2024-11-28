export const TransactionType = {
    Income: 1,
    Expense: 2,
    Debt: 3
} as const;
export type TransactionType = typeof TransactionType[keyof typeof TransactionType];
