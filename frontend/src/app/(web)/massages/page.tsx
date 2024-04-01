// Page.tsx

import MassageList from '@/components/MassageList';

function Page() {
    return (
        <div className="bg-emerald-100">
            <div className='container mx-auto lg:w-1/2 min-h-screen px-10 lg:px-0'>
                <MassageList />
            </div>
        </div>
    );
}

export default Page;
