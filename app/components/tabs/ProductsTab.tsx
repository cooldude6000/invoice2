'use client'

import React, { useState } from 'react'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Table from '@mui/joy/Table'
import Input from '@mui/joy/Input'
import IconButton from '@mui/joy/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { Pencil, Trash2, Search } from 'lucide-react'
import { productData } from '../../mock/productData'
import AddProductModal from '../modals/AddProductModal'

export default function ProductTab() {
    const [search, setSearch] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    const filteredProducts = productData.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="p-4">
            <Card sx={{ bgcolor: 'white' }}>
                <div className="flex items-center gap-3 p-4 bg-white border-b">
                    <div className="flex-grow">
                        <Input
                            fullWidth
                            placeholder="Search products..."
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
                        <AddIcon fontSize="small" /> Add Product
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
                                <th>Description</th>
                                <th>Price</th>
                                <th>Unit</th>
                                <th>Billing Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td><b>{product.name}</b></td>
                                    <td>{product.description}</td>
                                    <td><b>${product.price}</b></td>
                                    <td>{product.unit}</td>
                                    <td>
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                            {product.billingType}
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
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </CardContent>
            </Card>

            <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    )
}