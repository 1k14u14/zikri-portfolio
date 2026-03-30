import { getProject } from '@/sanity/sanity-utils';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

/**
 * Project Detail Page (Server Component)
 * * Dynamically unwraps the URL parameters to fetch and render 
 * a specific project document from the Sanity CMS database.
 */
type Props = {
  // Next.js 15 strict requirement: params must be awaited as a Promise
  params: Promise<{ slug: string }>;
};

export default async function Project({ params }: Props) {
  // 1. Extract the dynamic slug from the URL
  const { slug } = await params;

  const t = await getTranslations('Projects'); // Optional: Fetch translations for this page if needed
  
  // 2. Fetch the specific project data from Sanity
  const project = await getProject(slug);
  
  return (
    <div className="min-h-screen pt-20">
      <header className="flex items-center justify-between">
        <h1 className="flex-1 text-2xl font-extrabold py-2">{project.name}</h1>
        
        {/* External outbound link to the live project */}
        <a 
          href={project.url} 
          title="View Project" 
          target="_blank" 
          rel="noopener noreferrer"
          className="outline outline-slate-800 p-2 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {t('projectBtn')}
        </a>
      </header>

      {/* Cover Image Container
        Requires a strict relative height so the Next.js 'fill' property works.
      */}
      <figure className="relative sm:h-[400px] h-[160px] w-full mt-10 overflow-hidden rounded-lg border border-border">
        <Image
          src={project.coverImage}
          alt={project.name}
          fill
          className="object-contain hover:scale-125 hover:rotate-3 transition duration-500"
        />
      </figure>

      {/* Parse and render the Sanity rich text block safely */}
      <div className="text-lg mt-5">
        <PortableText value={project.content} />
      </div>

      {/* Iterate through the tech stack array and render individual badges */}
      <div className="overflow-x-auto py-3 mt-6">
        <h3 className="font-bold mb-3">Tech Stack:</h3>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((stack, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-lg text-sm font-medium" 
            >
              {stack}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}