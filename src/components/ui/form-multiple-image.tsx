"use client";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useUploadQrImage } from "@/features/merchant-qr/api/merchant-qr-query";
import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Control, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { toast } from "sonner";

interface FormMultiImageProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
    control: Control<TFieldValues>;
    name: TName;
    label?: string;
    description?: string;
    className?: string;
    inputClassName?: string;
    accept?: string;
    maxImages?: number;
}

const FormMultiImage = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>({
    control,
    name,
    label,
    description,
    className,
    inputClassName,
    accept = "image/*",
    maxImages = 5, // Default max images
}: FormMultiImageProps<TFieldValues, TName>) => {
    const { setValue, watch } = useFormContext();
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const uploadImageMutation = useUploadQrImage();

    // Watch the field value to sync with form state
    const fieldValue = watch(name) as string[] | undefined;

    // Reset preview when field value is empty
    useEffect(() => {
        if (!fieldValue || fieldValue.length === 0 || fieldValue.every(url => !url)) {
            setPreviewUrls([]);
        }
    }, [fieldValue]);

    // Initialize preview URLs if field value exists and is not empty
    useEffect(() => {
        if (fieldValue && fieldValue.length > 0 && fieldValue.some(url => url)) {
            const validUrls = fieldValue.filter(url => url);
            setPreviewUrls(validUrls);
        }
    }, []);

    const handleUpload = useCallback((file: File) => {
        // Check if max images limit is reached
        if (previewUrls.length >= maxImages) {
            toast.error(`Maximum ${maxImages} images allowed`);
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        
        uploadImageMutation.mutate(formData, {
            onSuccess: (response) => {
                const uploadedFileUrl = response.data.fileUrl;
                const newUrls = [...previewUrls, uploadedFileUrl];
                
                setPreviewUrls(newUrls);
                setValue(name, newUrls as unknown as TFieldValues[TName]);
            },
            onError: () => {
                toast.error('Image upload failed');
            }
        });
    }, [previewUrls, maxImages, uploadImageMutation, setValue, name]);

    const handleRemove = useCallback((indexToRemove: number) => {
        const newUrls = previewUrls.filter((_, index) => index !== indexToRemove);
        
        setPreviewUrls(newUrls);
        setValue(name, newUrls as unknown as TFieldValues[TName]);
        toast.info('Image removed');
    }, [previewUrls, setValue, name]);

    // Ensure only valid (non-empty) URLs are rendered
    const validPreviewUrls = previewUrls.filter(url => url && url.trim() !== '');

    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { onChange } }) => (
                <FormItem className={className}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <div className="space-y-4">
                            {/* Image Preview Grid */}
                            {validPreviewUrls.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {validPreviewUrls.map((url, index) => (
                                        <div 
                                            key={index} 
                                            className="relative bg-gray-100 rounded-xl"
                                        >
                                            <img
                                                src={url}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-40 rounded-lg object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemove(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Upload Area */}
                            {validPreviewUrls.length < maxImages && (
                                <div
                                    className={`
                                        border-2 border-dashed bg-[#FAFAFA] 
                                        border-[#E2E2E2] rounded-lg p-6 
                                        cursor-pointer hover:border-gray-400 
                                        transition-colors ${inputClassName}
                                    `}
                                    onClick={() => document.getElementById(`file-${name}`)?.click()}
                                >
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Image
                                            width={32}
                                            height={32}
                                            alt="file"
                                            src="/images/file.svg"
                                            className="w-8 h-8"
                                        />

                                        {uploadImageMutation.isPending ? (
                                            <div className="flex items-center gap-2">
                                                <span>Uploading...</span>
                                            </div>
                                        ) : (
                                            <div className="flex text-sm text-gray-600">
                                                <p className="relative">
                                                    Drop files here or{" "}
                                                    <span className="text-blue-600 hover:underline">
                                                        browse
                                                    </span>{" "}
                                                    to upload ({validPreviewUrls.length}/{maxImages})
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <input
                                id={`file-${name}`}
                                type="file"
                                className="hidden"
                                multiple
                                onChange={(e) => {
                                    const files = e.target.files;
                                    if (files) {
                                        Array.from(files).forEach(file => {
                                            handleUpload(file);
                                        });
                                        onChange(files);
                                    }
                                }}
                                accept={accept}
                            />
                        </div>
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default FormMultiImage;