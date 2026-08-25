'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Tiny client island: scrolls to ?highlight= without forcing the clinic list
 * into a CSR bailout / dynamic route.
 */
export function HighlightScroller() {
    const searchParams = useSearchParams();
    const highlightId = searchParams.get('highlight');

    useEffect(() => {
        if (!highlightId) return;
        const run = () => {
            const element = document.getElementById(`clinic-${highlightId}`);
            if (!element) return;
            const headerOffset = 150;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            element.classList.add('ring-4', 'ring-primary', 'bg-primary/5');
        };
        const timer = window.setTimeout(run, 120);
        return () => window.clearTimeout(timer);
    }, [highlightId]);

    return null;
}
