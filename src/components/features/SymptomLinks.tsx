import Link from 'next/link';
import { getSymptomLinksForCity } from '@/lib/symptoms';

export function SymptomLinks({ citySlug, cityName }: { citySlug: string; cityName: string }) {
    const links = getSymptomLinksForCity(citySlug);
    if (links.length === 0) return null;
    return (
        <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">{cityName}の症状別ページ</p>
            <div className="flex flex-wrap gap-2">
                {links.map((item) => (
                    <Link
                        key={item.def.key}
                        href={item.href}
                        className="rounded-full border bg-white px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
                    >
                        {item.def.shortTitle}
                        <span className="text-muted-foreground ml-1">{item.count}件</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
