"use client";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthStore } from '@/context/auth-context';
import { useCreateAPIServiceRequest, useGetAllAPIRequests, useGetAllAPIServices } from '@/features/api-service/api/api-service-query';
import { appName } from '@/lib/utils';
import { ApiRequestStatus } from '@/models/api-request';
import APIRequest from '@/models/api-request';
import APIService from '@/models/api-service';
import { TransactionType } from '@/models/transaction';
import { Search } from 'lucide-react';
import React, { useMemo, useState } from 'react';

const ApiMarketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState<string>("all");
  const { data: servicesData, isLoading, error } = useGetAllAPIServices({
    active: true,
    search: searchQuery,
    page: 1,
    limit: 100,
  });

  const { data: apiRequestsData } = useGetAllAPIRequests({
    page: 1,
    limit: 100,
    status: type === "all" ? undefined : type,
  });

  const apiRequests = useMemo(() => {
    return apiRequestsData?.data?.apiRequests ?? [];
  }, [apiRequestsData]);

  const services = useMemo(() => {
    return servicesData?.data?.apiLists ?? [];
  }, [servicesData]);

  const showAll = type === "all";

  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-between items-center p-6 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">API Marketplace</h2>
          <p className="text-sm mt-1 text-gray-400">Integrate powerful services into your applications</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white text-sm bg-blue-500 px-3 py-1 rounded-full font-medium">{appName}</span>
        </div>
      </div>

      <div className="flex justify-between ">
        <div className="mb-6 relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <Input
            type="text"
            placeholder="Search APIs..."
            className='pl-10'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* ShadCN Select for Type Filter */}
        <Select value={type} onValueChange={(val) => {
          setType(val as TransactionType)
        }} >
          <SelectTrigger className='w-40'>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Types</SelectLabel>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value={ApiRequestStatus.APPROVED}>
                Approved
              </SelectItem>
              <SelectItem value={ApiRequestStatus.REJECTED}>
                Rejected
              </SelectItem>
              <SelectItem value={ApiRequestStatus.PENDING}>
                Pending
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-slate-500">Loading services...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            <p className="text-red-500">Error loading services. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {showAll ? services.map((service: APIService) => (
                <ServiceCard key={service.id} service={service} />
              )) : apiRequests.map((request: APIRequest) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
            {showAll && services.length === 0 ||
              !showAll && apiRequests.length === 0 && (
                <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                  <p className="text-slate-500">No Search Result Found.</p>
                </div>
              )}
          </>
        )}
      </div>
    </div>
  );
};

interface ServiceCardProps {
  service: APIService;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {

  const { mutate: createApiService, isPending } = useCreateAPIServiceRequest();
  const { userDetails } = useAuthStore();

  const handleBuyNow = () => {
    createApiService({
      apiServiceId: service.id,
      apiList: service.id,
    });
  }
  return (
    <Card className="overflow-hidden shadow-none transition-all duration-300  border-slate-200 rounded-lg bg-white">
      <div className="relative">
        <img
          src={service.imageUrl ?? ""}
          alt={service.name ?? ""}
          className="w-full h-48 object-cover bg-gray-200"
        />
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{service.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p>{service.description}</p>
      </CardContent>
      <CardFooter>
        <Button className='w-full'
          disabled={isPending}
          onClick={handleBuyNow}>
          {isPending ? "Processing..." : "Buy Now"}</Button>
      </CardFooter>
    </Card>
  );
};

type RequestCardProps = {
  request: APIRequest;
}


const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
  return (
    <Card className="overflow-hidden shadow-none transition-all duration-300  border-slate-200 rounded-lg bg-white">
      <div className="relative">
        <img
          src={request.apiList?.imageUrl ?? ""}
          alt={request.apiList?.name ?? ""}
          className="w-full h-48 object-cover bg-gray-200"
        />
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{request.apiList?.name}</CardTitle>
          <Badge variant="outline" >
            {request.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p>{request.apiList?.description}</p>
      </CardContent>
    </Card>
  );
};
export default ApiMarketplace;
