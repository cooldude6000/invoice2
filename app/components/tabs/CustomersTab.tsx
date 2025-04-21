'use client'

import React, { useState } from 'react'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Table from '@mui/joy/Table'
import Input from '@mui/joy/Input'
import IconButton from '@mui/joy/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { Pencil, Trash2, Search } from 'lucide-react'

import { customerData } from '../../mock/customerData'
import AddCustomerModal from '../modals/AddCustomerModal'

export default function CustomerTab() {
    const [search, setSearch] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    const filteredCustomers = customerData.filter((customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="p-4">
            <Card sx={{ bgcolor: 'white' }}>
                <div className="flex items-center gap-3 p-4 bg-white border-b">
                    <div className="flex-grow">
                        <Input
                            fullWidth
                            placeholder="Search customers..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            size="sm"
                            startDecorator={<Search size={18} />}
                            sx={{ bgcolor: 'white' }}
                        />
                    </div>
                    <button
                        className="bg-blue-600 text-white px-3 py-2 rounded hover:cursor-pointer hover:bg-blue-500"
                        onClick={() => setModalOpen(true)}
                    >
                        <AddIcon fontSize="small" /> Add Customer
                    </button>
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
                                <th>Name</th>
                                <th>Type</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Payment Method</th>
                                <th>VAT Applicable</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((cust) => (
                                <tr key={cust.id}>
                                    <td><b>{cust.name}</b></td>
                                    <td>{cust.type}</td>
                                    <td>{cust.email}</td>
                                    <td>{cust.phone}</td>
                                    <td>{cust.paymentMethod}</td>
                                    <td>
                                        <span className={
                                            cust.vatApplicable
                                                ? 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs'
                                                : 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs'
                                        }>
                                            {cust.vatApplicable ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <IconButton
                                            size="sm"
                                            variant="soft"
                                            color="primary"
                                            sx={{ marginRight: 1 }}
                                        >
                                            <Pencil size={16} />
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
                            {filteredCustomers.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-gray-500">
                                        No customers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </CardContent>
            </Card>

            <AddCustomerModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    )
}