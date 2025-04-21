'use client'

import * as React from 'react'
import { useState } from 'react'
import {
    Modal, ModalDialog, ModalClose, Typography, Input, Textarea, Button,
    Select, Option, Switch, FormControl, FormLabel, Radio, RadioGroup,
} from '@mui/joy'

interface AddCustomerModalProps {
    open: boolean;
    onClose: () => void;
}

export default function AddCustomerModal({ open, onClose }: AddCustomerModalProps) {
    const [name, setName] = useState('')
    const [type, setType] = useState('Individual')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [currency, setCurrency] = useState('USD')
    const [applyVAT, setApplyVAT] = useState(false)

    const handleSubmit = () => {
        const customer = {
            name,
            type,
            email,
            phone,
            address,
            paymentMethod,
            currency,
            applyVAT
        }
        console.log('Saving customer:', customer)
        //will be sending this data to backend
        onClose()
    }



    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog size="lg">
                <ModalClose />
                <Typography level="h4" className="mb-4">Add New Customer</Typography>

                <Input
                    placeholder="Customer Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4"
                />

                <FormControl className="mb-4">
                    <FormLabel>Customer Type</FormLabel>
                    <RadioGroup
                        orientation="horizontal"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <Radio value="Individual" label="Individual" />
                        <Radio value="Company" label="Company" />
                    </RadioGroup>
                </FormControl>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <Textarea
                    minRows={3}
                    placeholder="Business or Billing Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mb-4"
                />

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <Select
                        placeholder="Preferred Payment Method"
                        value={paymentMethod}
                        onChange={(e, val) => setPaymentMethod(val || '')}
                    >
                        <Option value="Credit Card">Credit Card</Option>
                        <Option value="Bank Transfer">Bank Transfer</Option>
                        <Option value="Cash">Cash</Option>
                        <Option value="Other">Other</Option>
                    </Select>

                    <Select
                        placeholder="Currency"
                        value={currency}
                        onChange={(e, val) => setCurrency(val || 'USD')}
                    >
                        <Option value="USD">USD ($)</Option>
                        <Option value="EUR">EUR (€)</Option>
                        <Option value="GBP">GBP (£)</Option>
                        <Option value="ILS">ILS (₪)</Option>
                    </Select>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <Typography>Apply VAT to this customer</Typography>
                    <Switch
                        checked={applyVAT}
                        onChange={(e) => setApplyVAT(e.target.checked)}
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="plain" onClick={onClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSubmit}>Save Customer</Button>
                </div>
            </ModalDialog>
        </Modal>
    )
}
