'use client'

import React, { useState } from 'react'
import {
    Modal, ModalDialog, ModalClose, Typography, Input, Textarea,
    Radio, RadioGroup, FormControl, FormLabel, Button
} from '@mui/joy'


interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
}

export default function AddProductModal({ open, onClose }: AddProductModalProps) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [unit, setUnit] = useState('')
    const [billingType, setBillingType] = useState('One-time')

    const handleSubmit = () => {
        const product = {
            name,
            description,
            price: parseFloat(price) || 0,
            unit,
            billingType
        }

        console.log('Saving product:', product)
        //will be sending this data to backend
        onClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog size="lg">
                <ModalClose />
                <Typography level="h4" className="mb-4">Add New Product</Typography>

                <Input
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4"
                />

                <Textarea
                    minRows={3}
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mb-4"
                />

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <Input
                        placeholder="Unit"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    />
                </div>

                <FormControl className="mb-4">
                    <FormLabel>Billing Type</FormLabel>
                    <RadioGroup
                        orientation="horizontal"
                        value={billingType}
                        onChange={(e) => setBillingType(e.target.value)}
                    >
                        <Radio value="One-time" label="One-time" />
                        <Radio value="Recurring" label="Recurring" />
                    </RadioGroup>
                </FormControl>

                <div className="flex justify-end gap-3">
                    <Button variant="plain" onClick={onClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSubmit}>Save Product</Button>
                </div>
            </ModalDialog>
        </Modal>
    )
}