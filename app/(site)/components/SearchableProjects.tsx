'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function SearchableProjects({ 
    initialProjects, 
    currentLocale 
}: { 
    initialProjects: any[], 
    currentLocale: string 
}) {
    const t = useTranslations('Projects'); // For translating static text in the component

    // 1. State for text search and category selection
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // 2. Dynamic Category Generation
    // Extracts all categories, removes duplicates using 'Set', and adds 'All' to the front
    const categories = ['All', ...Array.from(new Set(initialProjects.map((p) => p.category).filter(Boolean)))];

    // 3. Compound Filtering Logic
    // Filters the array by checking BOTH the search text AND the selected category
    const filteredProjects = initialProjects.filter((project) => {
        // Check Text Search (Name or Tech Stack)
        const matchesSearch = 
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.techStack?.some((tech: string) => tech.toLowerCase().includes(searchTerm.toLowerCase()));
        
        // Check Category Match
        const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;

        // The project must pass BOTH tests to be shown
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen">
            {/* HEADER, FILTERS, & SEARCH BAR */}
            <div className="flex flex-col gap-6 pt-20">
                <h2 className="text-3xl font-bold">{t('allProjects')}</h2>
                
                {/* Controls Container: Dropdown on left, Search on right */}
                <div className="flex flex-row-reverse justify-between items-center gap-4 w-full">
                    
                    {/* Category Dropdown (Native Select) */}
                    <div className="relative w-full sm:w-auto">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full sm:w-auto appearance-none border border-border rounded-lg px-5 py-2 pr-10 bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm cursor-pointer font-medium"
                        >
                            {categories.map((category) => (
                                /* We style the options so they are readable in dark mode! */
                                <option 
                                    key={category as string} 
                                    value={category as string}
                                    className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                                >
                                    {category === 'All' ? t('allCategories') : category as string}
                                </option>
                            ))}
                        </select>
                        
                        {/* Custom Dropdown Arrow for better UI */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>

                    {/* Search Input */}
                    <input 
                        type="text" 
                        placeholder={t('searchPlaceholder')} 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-border rounded-lg px-5 py-2 bg-transparent text-foreground w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm" 
                    />
                </div>
            </div>

            {/* EMPTY STATE */}
            {filteredProjects.length === 0 ? (
                <div className="text-center mt-20 p-10 border border-dashed border-border rounded-lg text-slate-500">
                    No projects found matching your criteria.
                </div>
            ) : (
                
                /* RESPONSIVE GRID */
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-10 pb-20">
                    {filteredProjects.map((project) => (
                        <Link
                            href={`/${currentLocale}/projects/${project.slug}`}
                            key={project._id}
                            className="border border-border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:-translate-y-1 transition-all overflow-hidden flex flex-col shadow-sm hover:shadow-md"
                        >
                            <figure className="relative w-full h-[220px] border-b border-border bg-slate-50 dark:bg-slate-900 shrink-0">
                                {project.coverImage && (
                                    <Image
                                        src={project.coverImage}
                                        alt={project.name}
                                        fill
                                        className="object-cover" 
                                    />
                                )}
                            </figure>
                            
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
                                    {project.techStack?.slice(0, 3)?.map((stack: string, index: number) => (
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