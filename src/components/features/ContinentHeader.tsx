'use client';

interface ContinentHeaderProps {
    displayName: string;
    description?: string;
}

export function ContinentHeader({ displayName, description }: ContinentHeaderProps) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold">{displayName}</h1>
            <p className="text-muted-foreground mt-2">
                {description || `${displayName}で日本語が通じる医療機関を掲載しています`}
            </p>
        </div>
    );
}
