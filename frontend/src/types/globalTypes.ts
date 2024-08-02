export interface TransactionProps{
    id?: string;
    _id?: string;
    label: string;
    date: string;
    transactionType: string;
    value: number;
    description: string;
    isImportant: boolean;
    bank: string;
    recurring: boolean;
    transactions: TransactionProps[]
}