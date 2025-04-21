export type Customer = {
    id: string;
    name: string;
    type: 'Individual' | 'Company';
    email: string;
    phone: string;
    paymentMethod: string;
    vatApplicable: boolean;
};

export const customerData: Customer[] = [
    {
        id: '1',
        name: 'Leo Messi',
        type: 'Individual',
        email: 'messi@fcb.com',
        phone: '+1234567890',
        paymentMethod: 'Credit Card',
        vatApplicable: true,
    },
    {
        id: '2',
        name: 'Cristiano Ronaldo',
        type: 'Company',
        email: 'ronaldo@cr7.com',
        phone: '+1987654321',
        paymentMethod: 'Bank Transfer',
        vatApplicable: false,
    },
];
