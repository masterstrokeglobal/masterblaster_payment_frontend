"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { appName } from '@/lib/utils';

type ApiCategory = 'payment' | 'travel';

interface ApiService {
  id: number;
  name: string;
  price: string;
  benefit: string;
  description: string;
  isNew: boolean;
  imageColor: string;
  category: ApiCategory;
}

const ApiMarketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const apiServices: ApiService[] = [
    {
      id: 1,
      name: "BBPS",
      price: "₹ 10,000",
      benefit: "Get 1% Commission",
      description: "Bharat Bill Payment System for seamless utility payments",
      isNew: true,
      imageColor: "bg-gradient-to-r from-blue-600 to-blue-400",
      category: "payment"
    },
    {
      id: 2,
      name: "FLIGHT BOOKING",
      price: "₹ 10,000",
      benefit: "Get 2% Commission",
      description: "Complete flight booking solution with zero convenience fees",
      isNew: true,
      imageColor: "bg-gradient-to-r from-sky-600 to-indigo-500",
      category: "travel"
    },
    {
      id: 3,
      name: "PAYOUT API",
      price: "₹ 10,000",
      benefit: "Best Transaction Rate",
      description: "Instant wallet to bank settlement with minimal fees",
      isNew: true,
      imageColor: "bg-gradient-to-r from-yellow-100 to-yellow-300",
      category: "payment"
    }
  ];
  
  const filteredApis = apiServices.filter(api => 
    api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    api.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-between items-center  p-6 mb-6 ">
        <div>
          <h2 className="text-2xl font-bold ">API Marketplace</h2>
          <p className="text-sm mt-1">Integrate powerful services into your applications</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white text-sm bg-blue-500 px-3 py-1 rounded-full font-medium">{appName}</span>
        </div>
      </div>
      
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search APIs..."
          className="pl-10 w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-white shadow-sm rounded-lg mb-6 p-1 border border-slate-200">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md">
            All APIs
          </TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md">
            Payment
          </TabsTrigger>
          <TabsTrigger value="travel" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md">
            Travel
          </TabsTrigger>
          <TabsTrigger value="new" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md">
            New
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApis.map((api) => (
              <ApiCard key={api.id} api={api} />
            ))}
          </div>
          {filteredApis.length === 0 && (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <p className="text-slate-500">No APIs found matching your search criteria.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="payment">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApis.filter(api => api.category === 'payment').map((api) => (
              <ApiCard key={api.id} api={api} />
            ))}
          </div>
          {filteredApis.filter(api => api.category === 'payment').length === 0 && (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <p className="text-slate-500">No payment APIs found matching your search criteria.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="travel">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApis.filter(api => api.category === 'travel').map((api) => (
              <ApiCard key={api.id} api={api} />
            ))}
          </div>
          {filteredApis.filter(api => api.category === 'travel').length === 0 && (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <p className="text-slate-500">No travel APIs found matching your search criteria.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="new">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApis.filter(api => api.isNew).map((api) => (
              <ApiCard key={api.id} api={api} />
            ))}
          </div>
          {filteredApis.filter(api => api.isNew).length === 0 && (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <p className="text-slate-500">No new APIs found matching your search criteria.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ApiCardProps {
  api: ApiService;
}

const ApiCard: React.FC<ApiCardProps> = ({ api }) => {
  // Custom component images to match original design more closely
  const getCardImage = (name: string, color: string): React.ReactNode => {
    if (name === "BBPS") {
      return (
        <div className={`${color} h-48 w-full relative overflow-hidden rounded-t-lg shadow-inner`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-60 transform rotate-45 translate-x-8 -translate-y-8"></div>
          <div className="p-5 relative z-10">
            <div className="bg-white p-2 rounded-md inline-block shadow-md">
              <div className="text-blue-600 font-bold">BBPS</div>
            </div>
            <div className="mt-6 text-white">
              <div className="text-2xl font-bold">BBPS</div>
              <div className="text-lg">API</div>
              <div className="mt-2 text-sm backdrop-blur-sm bg-black/10 p-2 rounded-md">
                <p>Simplify bill payments effortlessly</p>
                <p>Elevate your financial services</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 right-2">
            <div className="h-16 w-16 rounded-full bg-yellow-400 shadow-lg"></div>
          </div>
        </div>
      );
    } else if (name === "FLIGHT BOOKING") {
      return (
        <div className={`${color} h-48 w-full relative overflow-hidden rounded-t-lg shadow-inner`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-700 opacity-60 transform rotate-45 translate-x-8 -translate-y-8"></div>
          <div className="p-5 relative z-10">
            <div className="mt-4 text-white">
              <div className="text-lg">Enjoy</div>
              <div className="text-2xl font-bold">FLIGHT</div>
              <div className="text-2xl font-bold">BOOKING</div>
              <div className="text-lg">WITH</div>
              <div className="mt-4 backdrop-blur-sm bg-black/10 p-2 rounded-md inline-block">
                <div className="text-sm">NO</div>
                <div className="text-lg font-bold">Convenience</div>
                <div className="text-lg font-bold">FEES</div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-3 right-3">
            <div className="h-12 w-12 transform rotate-45 border-4 border-white opacity-70"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={`${color} h-48 w-full relative overflow-hidden rounded-t-lg shadow-inner`}>
          <div className="p-5 text-center">
            <div className="mt-2">
              <div className="text-2xl font-bold text-indigo-900">PAYOUT API</div>
              <div className="mt-1 bg-yellow-400 text-indigo-900 text-sm inline-block px-3 py-1 rounded-full shadow-sm">
                Updated & Advanced
              </div>
              <div className="mt-4 bg-white/70 p-2 rounded-md shadow-sm">
                <div className="text-sm text-indigo-900">
                  Make a Real Time Settlement
                </div>
                <div className="text-sm text-indigo-900">
                  From Wallet To Bank
                </div>
                <div className="text-xs text-indigo-900 mt-1">
                  with {appName}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4 space-x-3">
              <div className="h-10 w-10 bg-yellow-400 rounded-full shadow-md"></div>
              <div className="h-10 w-10 bg-indigo-900 rounded-full shadow-md"></div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl border-slate-200 rounded-lg bg-white hover:translate-y-[-4px]">
      <div className="relative">
        {getCardImage(api.name, api.imageColor)}
        {api.isNew && (
          <div className="absolute -right-8 top-6 rotate-45 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-10 py-1 text-xs font-semibold shadow-md">
            NEW API
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{api.name}</CardTitle>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {api.category}
          </Badge>
        </div>
        <p className="text-slate-500 text-sm">{api.description}</p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex justify-between items-center py-3 border-b border-slate-100">
          <span className="text-slate-600 font-medium">Price</span>
          <span className="text-slate-900 font-bold">{api.price}</span>
        </div>
        
        <div className="flex justify-between items-center py-3 border-b border-slate-100">
          <span className="text-slate-600 font-medium">Benefit</span>
          <span className="text-green-600 font-medium">{api.benefit}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-6">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApiMarketplace;