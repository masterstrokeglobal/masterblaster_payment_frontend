import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from "date-fns";
import { useUpdateMerchantQr } from '../api/merchant-qr-query';
import { MerchantQr } from '../type';

interface QRDetailsProps {
    merchantQR: MerchantQr;
}

export const QRDetails = ({ merchantQR }: QRDetailsProps) => {
    const updateMutation = useUpdateMerchantQr();
    const {
        accountName,
        accountNumber,
        bankName,
        createdAt,
        id,
        ifscCode,
        isActive,
        upiId
    } = merchantQR;

    const handleActiveToggle = async (checked: boolean) => {
        try {
            await updateMutation.mutateAsync({
                qrId: id.toString(),
                data: { isActive: checked }
            });
        } catch (error) {
            console.error('Error updating QR status:', error);
        }
    };

    const details = [
        { label: 'Created', value: createdAt ? format(new Date(createdAt), 'PPP') : 'N/A' },
        { label: 'Account Name', value: accountName || 'N/A' },
        { label: 'Account Number', value: accountNumber || 'N/A', mono: true },
        { label: 'Bank Name', value: bankName || 'N/A' },
        { label: 'UPI ID', value: upiId || 'N/A', mono: true },
        { label: 'IFSC Code', value: ifscCode || 'N/A', mono: true },
    ];

    return (
        <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg">QR Details</CardTitle>
                <div className="flex items-center gap-4">
                    <Badge variant={isActive ? "default" : "secondary"}>
                        {isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Switch
                        checked={isActive}
                        onCheckedChange={handleActiveToggle}
                        disabled={updateMutation.isPending}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/3">Field</TableHead>
                            <TableHead>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {details.map((detail, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-sm text-gray-500">
                                    {detail.label}
                                </TableCell>
                                <TableCell className={`text-sm ${detail.mono ? 'font-mono' : ''}`}>
                                    {detail.value}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default QRDetails;