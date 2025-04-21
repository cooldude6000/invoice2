export type Invoice = {
    invoiceNumber: string
    customer: string
    status: 'Paid' | 'Unpaid'
    createdDate: string
    dueDate: string
    amount: number
}

export const invoiceData: Invoice[] = [
    {
        invoiceNumber: 'INV-001',
        customer: 'Leo Messi',
        status: 'Paid',
        dueDate: '2025-05-21',
        createdDate: '2025-04-21',
        amount: 150,
    },
    {
        invoiceNumber: 'INV-002',
        customer: 'Cristiano Ronaldo',
        status: 'Unpaid',
        dueDate: '2025-05-22',
        createdDate: '2025-04-22',
        amount: 200,
    },
    {
        invoiceNumber: 'INV-003',
        customer: 'Cristiano Ronaldo',
        status: 'Paid',
        dueDate: '2025-05-22',
        createdDate: '2025-04-22',
        amount: 300,
    },
    {
        invoiceNumber: 'INV-004',
        customer: 'Leo Messi',
        status: 'Unpaid',
        dueDate: '2025-05-23',
        createdDate: '2025-04-23',
        amount: 100,
    },
    {
        invoiceNumber: 'INV-005',
        customer: 'Leo Messi',
        status: 'Unpaid',
        dueDate: '2025-05-23',
        createdDate: '2025-04-23',
        amount: 100,
    }
]
