'use client'

import React, { useState } from 'react'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/joy/Typography'
import Table from '@mui/joy/Table'
import Input from '@mui/joy/Input'
import Autocomplete from '@mui/joy/Autocomplete'
import IconButton from '@mui/joy/IconButton'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import AddIcon from '@mui/icons-material/Add'
import { TextField } from '@mui/material'
import { invoiceData } from '../../mock/invoiceData'
import { customerData } from '../../mock/customerData'
import { productData } from '../../mock/productData'
import { DownloadIcon, FileText, Trash2, Search } from 'lucide-react'
import CreateInvoiceModal from '../modals/CreateInvoiceModal'

export default function InvoiceTab() {
    const [statusFilter, setStatusFilter] = useState('')
    const [customerFilter, setCustomerFilter] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [openCreateModal, setOpenCreateModal] = useState(false)

    const uniqueCustomers = [...new Set(invoiceData.map((inv) => inv.customer))]

    const filteredInvoices = invoiceData.filter((invoice) => {
        const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter ? invoice.status === statusFilter : true
        const matchesCustomer = customerFilter ? invoice.customer === customerFilter : true
        const matchesStart = startDate ? new Date(invoice.createdDate) >= new Date(startDate) : true
        const matchesEnd = endDate ? new Date(invoice.createdDate) <= new Date(endDate) : true
        return matchesSearch && matchesStatus && matchesCustomer && matchesStart && matchesEnd
    })

    return (
        <div className="p-4">
            <Card sx={{ bgcolor: 'white' }}>
                <div className="flex justify-between items-center p-2">
                    <Typography level="h2">Invoices</Typography>
                    <button
                        className="bg-blue-600 text-white px-3 py-2 rounded hover:cursor-pointer hover:bg-blue-500"
                        onClick={() => setOpenCreateModal(true)}
                    >
                        <AddIcon fontSize="small" /> Create Invoice
                    </button>
                </div>

                <div className="p-4 bg-white border-b">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        <Input
                            placeholder="Search invoice #"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            size="sm"
                            startDecorator={<Search size={18} />}
                            sx={{ bgcolor: 'white' }}
                        />

                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            displayEmpty
                            size="small"
                            sx={{ bgcolor: 'white', height: '40px' }}
                        >
                            <MenuItem value="">All Statuses</MenuItem>
                            <MenuItem value="Paid">Paid</MenuItem>
                            <MenuItem value="Unpaid">Unpaid</MenuItem>
                        </Select>

                        <Autocomplete
                            options={uniqueCustomers}
                            value={customerFilter}
                            onChange={(e, value) => setCustomerFilter(value || '')}
                            placeholder="Select customer"
                            size="sm"
                            sx={{ bgcolor: 'white' }}
                        />

                        <TextField
                            label="Start Date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            size="small"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ bgcolor: 'white' }}
                        />

                        <TextField
                            label="End Date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            size="small"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ bgcolor: 'white' }}
                        />
                    </div>
                </div>

                <CardContent>
                    <Table
                        hoverRow
                        sx={{
                            '& tbody tr:hover': {
                                backgroundColor: '#f5f5f5',
                                cursor: 'pointer',
                            },
                        }}
                    >
                        <thead>
                            <tr>
                                <th>Invoice #</th>
                                <th>Created Date</th>
                                <th>Status</th>
                                <th>Customer</th>
                                <th>Amount ($)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvoices.map((inv) => (
                                <tr key={inv.invoiceNumber}>
                                    <td>
                                        <span className="flex items-center">
                                            <FileText size={16} className="mr-2" />
                                            <b>{inv.invoiceNumber}</b>
                                        </span>
                                    </td>
                                    <td>{inv.createdDate}</td>
                                    <td>
                                        <span className={
                                            inv.status === 'Paid'
                                                ? 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs'
                                                : 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs'
                                        }>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td>{inv.customer}</td>
                                    <td><b>${inv.amount}</b></td>
                                    <td className="text-center">
                                        <IconButton
                                            size="sm"
                                            variant="soft"
                                            color="primary"
                                            sx={{ marginRight: 1 }}
                                        >
                                            <DownloadIcon size={16} />
                                        </IconButton>
                                        <IconButton
                                            size="sm"
                                            variant="soft"
                                            color="danger"
                                        >
                                            <Trash2 size={16} />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                            {filteredInvoices.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-gray-500">
                                        No invoices found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </CardContent>
            </Card>

            <CreateInvoiceModal
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
                customers={customerData}
                products={productData}
            />
        </div>
    )
}