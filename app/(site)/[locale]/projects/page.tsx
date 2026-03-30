import { getProjects } from '@/sanity/sanity-utils';
import SearchableProjects from './../../components/SearchableProjects'; // Check your import path!

/**
 * Projects Page (Server Component)
 * * Responsible purely for fetching data from Sanity CMS securely.
 * * Passes the retrieved dataset down to the interactive Client Component.
 */
export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
    const resolvedParams = await params;
    const currentLocale = resolvedParams.locale;

    // Fetch the data on the server
    const projects = await getProjects(currentLocale);

    if (!projects) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-xl font-bold">Please publish this page in Sanity Studio first.</p>
            </div>
        );
    }

    // Pass the data down to the interactive component
    return (
        <SearchableProjects 
            initialProjects={projects} 
            currentLocale={currentLocale} 
        />
    );
}