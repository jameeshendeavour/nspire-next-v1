'use client'; // Error components must be Client Components

export default function UserError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div>
            <h2>Something went wrong in the Admin section! {error.message}</h2>
            <button onClick={() => reset()}>Try again</button>
        </div>
    );
}