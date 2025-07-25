import { useMemo, useRef } from 'react';

export function useDeepCompareMemo<T>(factory: () => T, deps: any[]): T {
    const ref = useRef<any[]>([]);
    
    if (!ref.current || !depsEqual(deps, ref.current)) {
        ref.current = deps;
    }
    
    return useMemo(factory, ref.current);
}

function depsEqual(a: any[], b: any[]): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}