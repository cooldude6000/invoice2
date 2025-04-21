'use client'

import React, { useState } from 'react'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/joy/Typography'
import Input from '@mui/joy/Input'
import Textarea from '@mui/joy/Textarea'
import Switch from '@mui/joy/Switch'
import Button from '@mui/joy/Button'

export default function SettingsTab() {
    const [companyName, setCompanyName] = useState('Digital Solutions Inc.')
    const [businessAddress, setBusinessAddress] = useState('789 Tech Street, Digital City, DC 12345')
    const [phoneNumber, setPhoneNumber] = useState('+1-555-0123')
    const [emailAddress, setEmailAddress] = useState('billing@digitalsolutions.com')
    const [taxId, setTaxId] = useState('12-3456789')
    const [bankDetails, setBankDetails] = useState(
        'Bank: Digital Bank Account: 1234-5678-9012 Swift: DIGBNK12'
    )

    const [isVatRegistered, setIsVatRegistered] = useState(false)
    const [paymentTerms, setPaymentTerms] = useState('30')
    const [reminderFrequency, setReminderFrequency] = useState('7')

    const handleSaveSettings = () => {
        const settings = {
            companyName,
            businessAddress,
            phoneNumber,
            emailAddress,
            taxId,
            bankDetails,
            isVatRegistered,
            paymentTerms,
            reminderFrequency
        }

        console.log('Saving settings:', settings)
    }

    return (
        <div className="p-4">
            <Card
                variant="outlined"
                sx={{
                    bgcolor: 'white',
                    borderColor: 'lightgray'
                }}
            >
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                        <Card
                            variant="outlined"
                            sx={{
                                bgcolor: 'white',
                                flex: 2,
                                borderColor: 'lightgray'
                            }}
                        >
                            <CardContent>
                                <Typography level="h4" className="mb-4">Company Information</Typography>
                                <Typography level="body-sm" className="mb-4">This information will appear on your invoices</Typography>

                                <div className="grid grid-cols-1 gap-4">
                                    <Input
                                        placeholder="Company Name"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        sx={{ bgcolor: 'white' }}
                                    />

                                    <Input
                                        placeholder="Business Address"
                                        value={businessAddress}
                                        onChange={(e) => setBusinessAddress(e.target.value)}
                                        sx={{ bgcolor: 'white' }}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            placeholder="Phone Number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            sx={{ bgcolor: 'white' }}
                                        />
                                        <Input
                                            placeholder="Email Address"
                                            value={emailAddress}
                                            onChange={(e) => setEmailAddress(e.target.value)}
                                            sx={{ bgcolor: 'white' }}
                                        />
                                    </div>

                                    <Input
                                        placeholder="Tax ID / Business Number"
                                        value={taxId}
                                        onChange={(e) => setTaxId(e.target.value)}
                                        sx={{ bgcolor: 'white' }}
                                    />

                                    <Textarea
                                        placeholder="Bank Details"
                                        value={bankDetails}
                                        onChange={(e) => setBankDetails(e.target.value)}
                                        minRows={4}
                                        sx={{ bgcolor: 'white' }}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex flex-col gap-4 md:w-1/3">
                            <Card
                                variant="outlined"
                                sx={{
                                    bgcolor: 'white',
                                    borderColor: 'lightgray'
                                }}
                            >
                                <CardContent>
                                    <Typography level="h4" className="mb-4">Invoice Settings</Typography>
                                    <Typography level="body-sm" className="mb-4">Configure tax and invoice settings</Typography>

                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={isVatRegistered}
                                                onChange={(e) => setIsVatRegistered(e.target.checked)}
                                            />
                                            <span>Business is VAT registered</span>
                                        </div>

                                        <Input
                                            placeholder="Default Payment Terms (days)"
                                            value={paymentTerms}
                                            onChange={(e) => setPaymentTerms(e.target.value)}
                                            type="number"
                                            sx={{ bgcolor: 'white' }}
                                        />

                                        <Input
                                            placeholder="Reminder Frequency (days)"
                                            value={reminderFrequency}
                                            onChange={(e) => setReminderFrequency(e.target.value)}
                                            type="number"
                                            sx={{ bgcolor: 'white' }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card
                                variant="outlined"
                                sx={{
                                    bgcolor: 'white',
                                    borderColor: 'lightgray'
                                }}
                            >
                                <CardContent>
                                    <Typography level="h4" className="mb-4">System Information</Typography>
                                    <Typography level="body-sm">Any changes to these settings will be applied to all new invoices.</Typography>
                                </CardContent>
                            </Card>

                            <Button
                                fullWidth
                                color="primary"
                                onClick={handleSaveSettings}
                            >
                                Save Settings
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}