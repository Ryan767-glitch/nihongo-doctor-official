'use client';

import { Globe } from 'lucide-react';

interface ContinentHeaderProps {
    displayName: string;
}

export function ContinentHeader({ displayName }: ContinentHeaderProps) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
                <Globe className="w-8 h-8 text-primary" />
                {displayName}
            </h1>
            <p className="text-muted-foreground mt-2">{displayName}の日本人向け医療情報</p>
        </div>
    );
}
