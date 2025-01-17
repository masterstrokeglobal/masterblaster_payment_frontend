"use client";
import LoadingScreen from '@/components/common/loading-screen';
import { useGetMerchantById } from '@/features/merchant/api/merchant-query';
import MerchantProfileCard from '@/features/merchant/merchant-card';
import Merchant from '@/models/merchant';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const MerchantDashboard = () => {
  const { id } = useParams();
  const { isLoading, data, isSuccess } = useGetMerchantById(id!.toString());

  const merchant = useMemo(() => {
    if (isSuccess) {
      const merchant = new Merchant(data?.data);

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
