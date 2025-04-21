export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    unit: string;
    billingType: 'One-time' | 'Recurring';
};

export const productData: Product[] = [
    {
        id: '1',
        name: 'SEO Package',
        description: 'SEO optimization',
        price: 500,
        unit: 'month',
        billingType: 'One-time',
    },
    {
        id: '2',
        name: 'Web Development',
        description: 'Website development',
        price: 2000,
        unit: 'project',
        billingType: 'One-time',
    },
    {
        id: '3',
        name: 'Consulting',
        description: 'Business consulting',
        price: 150,
        unit: 'hour',
        billingType: 'One-time',
    },
];
