'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Next.js Root Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Something went wrong</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {error.message || 'An unexpected error occurred. Please try again or refresh the page.'}
                    </p>
                    {error.digest && (
                        <p className="text-xs text-gray-400 font-mono mt-2">Error ID: {error.digest}</p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={() => reset()}
                        className="w-full sm:w-auto"
                    >
                        Try again
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => window.location.href = '/'}
                        className="w-full sm:w-auto"
                    >
                        Go to Home
                    </Button>
                </div>
            </div>
        </div>
    );
}
