import AdminLayout from '@/components/admin/admin-layout';
import PortfolioDataTable from '@/components/admin/portfolio-data-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminDashboardPage() {
    return (
        <AdminLayout>
            <div className="flex flex-col min-h-screen">
                <header className="sticky top-0 z-40 border-b bg-background">
                    <div className="container flex h-16 items-center justify-between">
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        <Button asChild variant="ghost">
                            <Link href="/">← Back to Site</Link>
                        </Button>
                    </div>
                </header>
                <main className="flex-1 p-4 md:p-8">
                    <PortfolioDataTable />
                </main>
            </div>
        </AdminLayout>
    );
}
