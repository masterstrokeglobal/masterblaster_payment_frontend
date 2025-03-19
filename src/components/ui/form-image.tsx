"use client";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useUploadQrImage } from "@/features/merchant-qr/api/merchant-qr-query";
import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Control, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { toast } from "sonner";

interface FormImageProps<
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
}

const FormImage = <
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
}: FormImageProps<TFieldValues, TName>) => {
    const { setValue, watch } = useFormContext();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const uploadImageMutation = useUploadQrImage();
    // Watch the field value to sync with form state
    const fieldValue = watch(name);
    // Reset preview when field value is empty
    useEffect(() => {
        if (!fieldValue) {
            setPreviewUrl(null);
        }
    }, [fieldValue]);

    // if field value is not null, set the preview url
    useEffect(() => {
        if (fieldValue) {
            setPreviewUrl(fieldValue);
        }
    },[]);

    const handleUpload = useCallback((file: File) => {
        const formData = new FormData();
        formData.append("image", file);
        uploadImageMutation.mutate(formData, {
            onSuccess: (response) => {
                const uploadedFileUrl = response.data.fileUrl;
                setValue(name, uploadedFileUrl);
                setPreviewUrl(uploadedFileUrl);
            },
            onError: () => {
                setPreviewUrl(null);
                setValue(name, "" as unknown as TFieldValues[TName]);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadImageMutation]);

    const handleRemove = useCallback(() => {
        setPreviewUrl(null);
        setValue(name, "" as unknown as TFieldValues[TName]);
        toast.info('Image removed');
    }, [setValue, name]);


    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { onChange } }) => (
                <FormItem className={className}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <div className="relative">
                            {previewUrl ? (
                                <div className="relative bg-gray-100 rounded-xl pr-12 ">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        width={160}
                                        height={160}
                                        className="w-auto h-40 rounded-lg object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemove}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ) : (
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
                                                    Drop a file here or
                                                    {" "}
                                                    <span className="text-blue-600 hover:underline">browse</span>
                                                    {" "}to upload an image
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
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        handleUpload(file);
                                        onChange(file);
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

export default FormImage;