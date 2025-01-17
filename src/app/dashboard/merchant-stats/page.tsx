"use client";
import LoadingScreen from '@/components/common/loading-screen';
import { useGetCurrentMerchant } from '@/features/authentication/query/user';
import MerchantProfileCard from '@/features/merchant/merchant-card';
import Merchant from '@/models/merchant';
import { useMemo } from 'react';

const MerchantDashboard = () => {
    const { isLoading, data, isSuccess } = useGetCurrentMerchant();

    const merchant = useMemo(() => {
        if (isSuccess) {
            const merchant = new Merchant(data.data?.user);

            return merchant;
        }
        return null;
    }, [data, isSuccess]);

    if (isLoading && merchant == null) {
        return <LoadingScreen className='min-h-screen' />;
    }

    return merchant && <MerchantProfileCard merchant={merchant} />
};

export default MerchantDashboard;
