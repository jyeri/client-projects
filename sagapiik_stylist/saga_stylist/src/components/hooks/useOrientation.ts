import { useEffect, useState } from 'react';

export default function useOrientation(src: string): 'landscape' | 'portrait' {
    const [orientation, setOrientation] = useState<'landscape' | 'portrait'>(
        'landscape'
    );

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setOrientation(img.width > img.height ? 'landscape' : 'portrait');
        };
    }, [src]);

    return orientation;
}
