import { useEffect, useRef } from 'react';


function useDebounce(callback: any, delay: number) {
    const timer = useRef<any>(null);

    const debouncedFunction = (...args: any) => {
        // Clear previous timeout if it exists
        if (timer.current) {
            clearTimeout(timer.current);
        }

        // Set a new timeout to execute the callback after the delay
        timer.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    // Clear timeout if the component unmounts
    useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, []);

    return debouncedFunction;
}

export default useDebounce;
