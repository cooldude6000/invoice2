'use client'

import React, { useState } from 'react'
import {
    Modal, ModalDialog, ModalClose, Typography, Button, Autocomplete, Input,
    Textarea, Sheet
} from '@mui/joy'

interface Customer {
    id: string;
    name: string;
}

interface Product {
    id: string;
    name: string;
    price: number;
}

interface Item {
    productName: string;
    unitPrice: number;
}

interface Props {
    open: boolean;
    onClose: () => void;
    customers: Customer[];
    products: Product[];
}

export default function CreateInvoiceModal({ open, onClose, customers, products }: Props) {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
    const [invoiceNumber, setInvoiceNumber] = useState(`INV-69`)
    const [issueDate, setIssueDate] = useState('2025-04-21')
    const [dueDate, setDueDate] = useState('2025-05-21')
    const [items, setItems] = useState<Item[]>([])
    const [notes, setNotes] = useState('')
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const addItem = () => {
        if (selectedProduct) {
            setItems([
                ...items,
                {
                    productName: selectedProduct.name,
                    unitPrice: selectedProduct.price
                }
            ])
            setSelectedProduct(null)
        }
    }

    let subtotal = 0
    for (let i = 0; i < items.length; i++) {
        subtotal += items[i].unitPrice
    }
    const tax = 0 //tax logic
    const total = subtotal + tax //ignoring tax , later will do here

    const createInvoice = () => {
        const invoice = {
            customer: selectedCustomer,
            invoiceNumber,
            issueDate,
            dueDate,
            items,
            notes,
            subtotal,
            total
        }

        console.log('Invoice:', invoice)
        //will be sending this data to backend
        onClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog size="lg" sx={{ maxWidth: '1100px', maxHeight: '90vh', overflow: 'auto', p: 3 }}>
                <ModalClose />
                <Typography level="h4" className="mb-3">Create New Invoice</Typography>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 pr-3 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-3">
                            <Autocomplete
                                size="sm"
                                options={customers}
                                getOptionLabel={(option) => option.name} //from mui
                                value={selectedCustomer}
                                onChange={(e, val) => setSelectedCustomer(val)}
                                placeholder="Select customer"
                            />
                            <Input
                                size="sm"
                                value={invoiceNumber}
                                onChange={(e) => setInvoiceNumber(e.target.value)}
                                placeholder="Invoice Number"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Input size="sm" type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
                            <Input size="sm" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                        </div>

                        <div>
                            <Typography className="text-sm font-medium mb-2">Add Product</Typography>
                            <div className="flex gap-2">
                                <Autocomplete
                                    size="sm"
                                    options={products}
                                    getOptionLabel={(option) => option.name}
                                    value={selectedProduct}
                                    onChange={(e, val) => setSelectedProduct(val)}
                                    placeholder="Select product"
                                    sx={{ flex: 1 }}
                                />
                                <Button variant="soft" onClick={addItem} size="sm">+ Add</Button>
                            </div>
                        </div>

                        <div>
                            {items.map((item, i) => (
                                <div key={i} className="grid grid-cols-4 gap-2 text-sm mb-2">
                                    <Input size="sm" value={item.productName} readOnly />
                                    <Input size="sm" value={1} readOnly />  {/* To do: cust be able to choose quantity*/}
                                    <Input size="sm" value={`$${item.unitPrice}`} readOnly />
                                    <Input size="sm" value={`$${item.unitPrice}`} readOnly />
                                </div>
                            ))}
                        </div>


                        <Textarea
                            size="sm"
                            minRows={3}
                            placeholder="Notes or payment instructions"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />

                        <div className="flex justify-end gap-3">
                            <Button size="sm" variant="plain" onClick={onClose}>Cancel</Button>
                            <Button size="sm" color="primary" onClick={createInvoice}>Create Invoice</Button>
                        </div>
                    </div>

                    <Sheet className="border p-5 rounded shadow-sm overflow-y-auto" sx={{ bgcolor: 'white' }}>
                        <div className="flex justify-between mb-3">
                            <Typography level="title-lg">INVOICE</Typography>
                            <Typography level="body-sm" fontWeight="bold">{invoiceNumber}</Typography>
                        </div>

                        <div>
                            <Typography level="body-sm" fontWeight="bold">Digital Solutions Inc.</Typography>
                            <Typography level="body-xs">789 Tech Street, Digital City</Typography>
                            <Typography level="body-xs">billing@digitalsolutions.com</Typography>
                        </div>

                        <div className="flex justify-between mt-4">
                            <div>
                                <Typography level="body-xs" fontWeight="bold">BILL TO:</Typography>
                                <Typography level="body-sm">{selectedCustomer?.name || 'Customer'}</Typography>
                            </div>
                            <div className="text-right">
                                <Typography level="body-xs">Issue: {issueDate}</Typography>
                                <Typography level="body-xs">Due: {dueDate}</Typography>
                            </div>
                        </div>

                        <div className="mt-4">
                            <table className="w-full border-collapse text-xs">
                                <thead className="border-b border-gray-300 text-left">
                                    <tr>
                                        <th className="py-1">Item</th>
                                        <th>Qty</th>
                                        <th>Rate</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, i) => (
                                        <tr key={i}>
                                            <td className="py-1">{item.productName}</td>
                                            <td>{1}</td>
                                            <td>${item.unitPrice}</td>
                                            <td>${item.unitPrice}</td>
                                        </tr>
                                    ))}
                                    {items.length === 0 && (
                                        <tr><td colSpan={4} className="text-center py-2">No items added</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 text-right">
                            <Typography level="body-xs">Subtotal: ${subtotal}</Typography>
                            <Typography level="body-sm" fontWeight="bold">Total: ${total}</Typography>
                        </div>

                        <div className="mt-5 text-xs text-gray-600">
                            <Typography level="body-xs">Thank you for your business!</Typography>
                            <Typography level="body-xs" className="mt-1">
                                Please pay: Digital Bank – Acc: 1234-5678-9012
                            </Typography>
                        </div>
                    </Sheet>
                </div>
            </ModalDialog>
        </Modal>
    )
}
