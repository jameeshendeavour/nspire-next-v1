import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex  items-center justify-center">
            <div className="h-16 w-16 animate-spin  rounded-full border-b-4 border-t-4 border-secondary"></div>
        </div>
    );
};

export default Loader;