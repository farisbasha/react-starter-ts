import * as React from 'react';
import { Head } from '../seo';
import BottomNavBar from '../bottom-nav-bar';



type MainLayoutProps = {
    children: React.ReactNode;
    title: string;
};

export const MainLayout = ({ children, title }: MainLayoutProps) => {
    return (
        <>
            <Head title={title} />
            <div className="py-6">
                {children}
            </div>
            <div className="w-full fixed bottom-0 z-50">

                <BottomNavBar />
            </div>

        </>
    );
};
