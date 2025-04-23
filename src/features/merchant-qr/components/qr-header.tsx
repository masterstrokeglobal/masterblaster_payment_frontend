"use client";

import { QrCode } from 'lucide-react';

interface QRHeaderProps {
  title: string;
  description: string;
}

export const QRHeader = ({ title, description }: QRHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-1">
        <QrCode className="w-6 h-6 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight text-primary">{title}</h1>
      </div>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};