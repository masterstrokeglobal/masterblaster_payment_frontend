import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { useGetAllMerchantQrs } from '../api/merchant-qr-query';
import QRCode from './custom-qr-code';

type Props = {
    merchantId: string;
}

const MerchantQRCarousel = ({ merchantId }: Props) => {
    const { data: merchantQrs, isLoading, error } = useGetAllMerchantQrs({ isActive: true, merchantId: merchantId });

    if (isLoading) return <div className="flex justify-center p-8">Loading merchant QR codes...</div>;

    if (error) return <div className="text-red-500 p-4">Error loading QR codes: {error.message}</div>;

    if (!merchantQrs || merchantQrs.data.length === 0) {
        return <div className="p-4">No active merchant QR codes found.</div>;
    }

    return (
        <div className="w-full max-w-xl mx-auto">
            <Carousel className="w-full">
                <CarouselContent>
                    {merchantQrs.data.map((qr: any) => (
                        <CarouselItem key={qr.id} className="flex justify-center">
                            <QRCode merchantQr={qr} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default MerchantQRCarousel;