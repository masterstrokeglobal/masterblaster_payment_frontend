import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  User,
  BadgeCheck,
  Calendar,
  Building2,
  MapPin,
  Mail,
  Phone,
  Percent,
  Image as ImageIcon
} from 'lucide-react';
import Merchant from '@/models/merchant';

const MerchantProfileCard = ({ merchant }: { merchant: Merchant }) => {
  const formatDate = (date: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const InfoItem = ({ icon: Icon, label, value, className = "" }:any) => (
    <div className={`p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5 text-blue-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-500">{label}</p>
          <p className="text-sm font-semibold text-gray-900 truncate">{value || 'N/A'}</p>
        </div>
      </div>
    </div>
  );

  const Section = ({ title, children }:any) => (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-gray-900 border-l-4 border-blue-500 pl-3">{title}</h3>
      <div className="grid gap-3">{children}</div>
    </div>
  );

  return (
    <Card className="w-full ">
      <CardHeader className="border-b bg-gray-50">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xl">Merchant Profile</span>
            {merchant.isVerified && (
              <BadgeCheck className="h-6 w-6 text-green-500" />
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            
            <Section title="Basic Information">
              <InfoItem icon={User} label="Full Name" value={merchant.name} />
              <InfoItem icon={Mail} label="Email Address" value={merchant.email} />
              {merchant.wallet?.amount!=undefined && (<InfoItem icon={Percent} label="Wallet Balance" value={`Rs. ${merchant.wallet?.getFormattedAmount()}`} />)}
            </Section>

            <Section title="Company Details">
              <InfoItem
                icon={Building2}
                label="Company Name"
                value={merchant.companyName}
                className="bg-blue-50 hover:bg-blue-100"
              />
              <InfoItem icon={MapPin} label="Company Address" value={merchant.companyAddress} />
              <InfoItem
                icon={Percent}
                label="Platform Fee"
                value={merchant.platformFeePercentage ? `${merchant.platformFeePercentage}%` : 'N/A'}
              />
            </Section>
          </div>

          <div className="space-y-6">
            <Section title="Additional Information">
            
              <InfoItem
                icon={Calendar}
                label="Account Created"
                value={formatDate(merchant.createdAt ?? new Date())}
              />
              <InfoItem
                icon={Calendar}
                label="Last Updated"
                value={formatDate(merchant.updatedAt ?? new Date())}
              />
            </Section>

            <Section title="Status Information">
              <InfoItem
                icon={BadgeCheck}
                label="Verification Status"
                value={merchant.isVerified ? 'Verified' : 'Not Verified'}
                className={merchant.isVerified ? 'bg-green-50 hover:bg-green-100' : 'bg-gray-50 hover:bg-gray-100'}
              />
              {merchant.deletedAt && (
                <InfoItem
                  icon={Calendar}
                  label="Deletion Date"
                  value={formatDate(merchant.deletedAt)}
                  className="bg-red-50 hover:bg-red-100"
                />
              )}
            </Section>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MerchantProfileCard;