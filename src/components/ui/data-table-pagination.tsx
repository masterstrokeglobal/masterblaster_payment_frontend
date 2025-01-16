import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    className?: string;
    pageSize: number;
    onPageChange: (page: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    className,
    onPageChange
}) => {
    // Calculate current range
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
        <div className={cn("flex items-center  justify-between", className)}>
            <div className="text-sm mr-2 md:block hidden text-[#6B7280]">
                Show
                <span className='font-semibold text-black-heading'>
                    {" "}
                    {startItem}-{endItem}
                    {" "}
                </span>
                of
                <span className='font-semibold text-black-heading'>
                    {" "}
                    {totalItems}
                    {" "}
                </span>
                clients
            </div>
            <div className="flex items-center">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mr-1"
                >
                    <ChevronLeft size={16} />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight size={16} />
                </Button>
            </div>
        </div>
    );
};

export default TablePagination;