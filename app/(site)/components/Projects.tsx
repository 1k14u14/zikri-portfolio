import { getLatestProjects } from '@/sanity/sanity-utils';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

/**
 * Latest Projects Section (Server Component)
 * * Fetches and displays a localized preview grid of the most recent projects.
 * * Intended for use on the landing/home page.
 */
export default async function Projects({ locale }: { locale: string }) {
    // Concurrently fetch the latest projects and the UI translations
    const projects = await getLatestProjects(locale);
    const t = await getTranslations('Projects');

    // Fallback UI: If Sanity fails to return the query
    if (!projects) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-xl font-bold">Please publish this page in Sanity Studio first.</p>
            </div>
        );
    }

    return (
        <section id="projects" className="pt-20 min-h-screen flex flex-col justify-center">
            
            {/* Section Header */}
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-extrabold">{t('title')}</h1>
                <Link 
                    href={`/${locale}/projects`} 
                    className="border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                    {t('viewBtn')} &rarr;
                </Link>
            </div>
            
            {/* Section Description */}
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
                {t('description')}
            </p>

            {/* Empty State Handling */}
            {projects.length === 0 ? (
                <div className="text-center mt-10 p-10 border border-dashed border-border rounded-lg text-slate-500">
                    No Data Found!!
                </div>
            ) : (
                
                /* Responsive Grid: 1 col on mobile, 2 cols on small screens and up */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <Link
                            href={`/${locale}/projects/${project.slug}`}
                            key={project._id}
                            className="border border-border rounded-lg overflow-hidden hover:shadow-md dark:hover:shadow-slate-800 transition-all hover:-translate-y-1 bg-white dark:bg-slate-950/50 flex flex-col"
                        >
                            {/* Image Container: Fixed the missing 'px' unit */}
                            <figure className="relative w-full h-[160px] border-b border-border bg-slate-50 dark:bg-slate-900">
                                {project.coverImage && (
                                    <Image
                                        src={project.coverImage}
                                        alt={project.name}
                                        fill
                                        className="object-cover" 
                                    />
                                )}
                            </figure>
                            
                            {/* Card Content Area */}
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    {/* Category Badge on the Card */}
                                    {project.category && (
                                        <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">
                                            {project.category}
                                        </span>
                                    )}
                                    <h2 className="font-bold text-xl line-clamp-1 mb-3">{project.name}</h2>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                    {/* Tech Stack Tags: Max 3 displayed, dark-mode ready */}
                                    {project.techStack.slice(0, 3).map((stack, index) => (
                                        <span 
                                            key={`tech-${index}`}
                                            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 text-xs font-medium rounded-md" 
                                        >
                                            {stack}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}