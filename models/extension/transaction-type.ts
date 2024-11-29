export const TransactionType = {
    Income: 1,
    Expense: 2,
    Debt: 3
} as const;
export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export const TransactionTypeDisplay: Record<TransactionType, string> = {
    [TransactionType.Income]: "Income",
    [TransactionType.Expense]: "Expense",
    [TransactionType.Debt]: "Debt"
};
