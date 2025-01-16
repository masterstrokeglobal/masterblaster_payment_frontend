import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function useParamsFilter<T extends Record<string, any>>() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname(); // Get current pathname from Next.js
    const [values, setValues] = useState<Partial<T>>({});

    // Initialize from URL on mount
    useEffect(() => {
        const initialValues: Partial<T> = {};
        searchParams.forEach((value, key) => {
            if (value) {
                initialValues[key as keyof T] = value as T[keyof T];
            }
        });
        setValues(initialValues);
    }, [searchParams]);

    // Update single filter
    const set = useCallback((field: keyof T, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value.trim()) {
            params.set(String(field), value);
        } else {
            params.delete(String(field));
        }

        router.replace(`${pathname}${params.toString() ? `?${params}` : ''}`, {
            scroll: false
        });

        setValues(prev => ({
            ...prev,
            [field]: value.trim() || undefined
        }));
    }, [router, searchParams, pathname]);

    // Clear all filters
    const clear = useCallback(() => {
        router.replace(pathname, { scroll: false });
        setValues({});
    }, [router, pathname]);

    return { set, clear, values, searchParams };
}
