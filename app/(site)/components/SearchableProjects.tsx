'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
// If you have a types folder, import your Project type here. Otherwise, you can use 'any[]'.

/**
 * Searchable Projects Grid (Client Component)
 * * Receives the pre-fetched dataset from the Server Component.
 * * Manages local state to instantly filter the grid based on user input.
 */
export default function SearchableProjects({ 
    initialProjects, 
    currentLocale 
}: { 
    initialProjects: any[], 
    currentLocale: string 
}) {
    // 1. Initialize state to track the user's keystrokes
    const [searchTerm, setSearchTerm] = useState('');

    const t = useTranslations('Projects'); // For any localized text within this component

    // 2. Real-time Filtering Logic
    // This runs instantly every time the user types a letter.
    const filteredProjects = initialProjects.filter((project) => {
        // We use .toLowerCase() to ensure 'React' matches 'react' (case-insensitive)
        const matchesName = project.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Bonus: Allow users to search by Tech Stack as well!
        const matchesTech = project.techStack?.some((tech: string) => 
            tech.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return matchesName || matchesTech;
    });

    return (
        <div className="min-h-screen">
            {/* HEADER & SEARCH BAR */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-20 gap-4">
                <h2 className="text-2xl font-bold">{t('allProjects')}</h2>
                
                {/* The value is tied directly to React State.
                  onChange captures every keystroke and updates the UI.
                */}
                <input 
                    type="text" 
                    placeholder={t('searchPlaceholder')} 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-border rounded-md px-3 py-2 bg-transparent text-foreground w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                />
            </div>

            {/* EMPTY STATE (If they search for something that doesn't exist) */}
            {filteredProjects.length === 0 ? (
                <div className="text-center mt-20 p-10 border border-dashed border-border rounded-lg text-slate-500">
                    No projects found for "{searchTerm}"
                </div>
            ) : (
                
                /* RESPONSIVE GRID */
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6 mt-10 pb-20">
                    {filteredProjects.map((project) => (
                        <Link
                            href={`/${currentLocale}/projects/${project.slug}`}
                            key={project._id}
                            className="border border-border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:-translate-y-1 transition-all overflow-hidden flex flex-col"
                        >
                            <figure className="relative w-full h-[180px] border-b border-border bg-slate-50 dark:bg-slate-900 shrink-0">
                                {project.coverImage && (
                                    <Image
                                        src={project.coverImage}
                                        alt={project.name}
                                        fill
                                        className="object-cover" 
                                    />
                                )}
                            </figure>
                            
                            <div className="px-4 py-4 flex-1 flex flex-col justify-between">
                                <h2 className="font-semibold text-lg line-clamp-1 mb-3">{project.name}</h2>
                                
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack?.map((stack: string, index: number) => (
                                        <span 
                                            key={index}
                                            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-2 py-1 rounded-md font-medium" 
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
        </div>
    );
}