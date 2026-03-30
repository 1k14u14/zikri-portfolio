import { getAbout } from "@/sanity/sanity-utils";
import { PortableText } from 'next-sanity';
import { Image } from "next-sanity/image";
import { formatYearMonth } from "@/lib/formatDate";
import { urlFor } from "@/sanity/sanity-utils";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';

/**
 * About / Resume Section (Server Component)
 * * Fetches localized profile data, including skills, experience, and education.
 * * Formats dates and renders Sanity PortableText for the biography.
 */
export default async function About({ locale }: { locale: string }) {
    // Fetch data and translations concurrently (if possible) for performance
    const data = await getAbout(locale);
    const t = await getTranslations('About');

    // Fallback UI if the Sanity document is missing or unpublished
    if (!data) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-xl font-bold">Please publish this page in Sanity Studio first.</p>
            </div>
        );
    }

    return (
        <section id="about" className="py-14 min-h-screen">
            <h1 className="text-2xl font-extrabold text-center mb-8">{data.title}</h1>
            
            <div className="md:flex md:gap-8">
                
                {/* --- LEFT COLUMN: Profile & Skills --- */}
                <div id="over-view" className="md:w-1/3">
                    <div className="flex flex-col items-center mb-5">
                        <div className="relative h-[150px] w-[150px] border border-border rounded-xl overflow-hidden mb-3">
                            {data.avatar && (
                                <Image
                                    src={data.avatar}
                                    alt={data.title}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                        <h3 className="font-semibold italic text-slate-600 dark:text-slate-400">
                            - Zikri Aulia -
                        </h3>
                    </div>
                    
                    <PortableText className="text-justify mt-3 text-slate-700 dark:text-slate-300" value={data.resume} />
                    
                    {/* Hard Skills Badges */}
                    <h3 className="mt-8 mb-4 font-bold text-lg">{t('hardSkills')}</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.hardSkills.map((skill, index) => (
                            <span className="border border-border rounded-2xl px-3 py-1 text-sm bg-slate-50 dark:bg-slate-900" key={`hard-${index}`}>
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* Soft Skills Badges */}
                    <h3 className="mt-8 mb-4 font-bold text-lg">{t('softSkills')}</h3>
                    <div className="flex flex-wrap gap-2 mb-8 md:mb-0">
                        {data.softSkills.map((skill, index) => (
                            <span className="border border-border rounded-2xl px-3 py-1 text-sm bg-slate-50 dark:bg-slate-900" key={`soft-${index}`}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* --- RIGHT COLUMN: Experience, Education, & Certs --- */}
                <div id="history" className="md:w-2/3">
                    
                    {/* --- CERTIFICATIONS --- */}
                    <h3 className="font-bold mb-5 text-xl">{t('certification')}</h3>
                    <div className="flex flex-col gap-4 mb-10">
                        {data.certification?.map((certificate, index) => {
                            const formattedStart = formatYearMonth(certificate.issueDate);
                            const formattedEnd = certificate.ExpiredDate ? formatYearMonth(certificate.ExpiredDate) : 'Present';

                            return (
                                <div className="border border-border rounded-lg p-4 bg-white dark:bg-slate-950/50" key={`cert-${index}`}>
                                    <div className="flex flex-row sm:items-start justify-between gap-4">
                                        
                                        <div className="flex-1 min-w-0"> {/* min-w-0 prevents flexbox text overflow */}
                                            <h3 className="font-bold text-lg truncate">{certificate.name}</h3>
                                            <p className="text-slate-600 dark:text-slate-400">{certificate.issuingOrganization}</p>
                                            <p className="text-sm text-slate-500">{formattedStart} - {formattedEnd}</p>
                                            
                                            {certificate.credentialId && (
                                                <p className="text-sm mt-2 text-slate-500 truncate">ID: {certificate.credentialId}</p>
                                            )}
                                            
                                            {certificate.credentialUrl && (
                                                <Link 
                                                    href={certificate.credentialUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="inline-block mt-2 text-primary hover:underline text-sm font-medium"
                                                >
                                                    Show Credential &rarr;
                                                </Link>
                                            )}
                                        </div>

                                        <div className="relative h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] rounded-lg bg-slate-50 dark:bg-slate-900 overflow-hidden shrink-0">
                                            {certificate.image && (
                                                <Image
                                                    src={urlFor(certificate.image).url()}
                                                    alt={certificate.name}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* --- WORK EXPERIENCE --- */}
                    <h3 className="font-bold mb-5 text-xl">{t('experience')}</h3>
                    <div className="flex flex-col gap-4 mb-10">
                        {data.experience.map((job, index) => {
                            const formattedStart = formatYearMonth(job.startDate);
                            const formattedEnd = job.endDate ? formatYearMonth(job.endDate) : 'Present';

                            return (
                                <div className="border border-border rounded-lg p-4 bg-white dark:bg-slate-950/50" key={`job-${index}`}>
                                    <div className="flex flex-row sm:items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-lg">{job.position}</h3>
                                            <p className="text-slate-600 dark:text-slate-400 font-medium">{job.company}</p>
                                            <p className="text-sm text-slate-500">{formattedStart} - {formattedEnd}</p>
                                        </div>
                                        
                                        {job.image && (
                                            <div className="relative h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] rounded-lg bg-slate-50 dark:bg-slate-900 overflow-hidden shrink-0">
                                                <Image
                                                    src={urlFor(job.image).url()}
                                                    alt={job.company}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-justify pt-4 text-slate-700 dark:text-slate-300">{job.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* --- EDUCATION --- */}
                    <h3 className="font-bold mb-5 text-xl">{t('education')}</h3>
                    <div className="flex flex-col gap-4">
                        {data.educations.map((edu, index) => {
                            const formattedStart = formatYearMonth(edu.startDate);
                            const formattedEnd = edu.endDate ? formatYearMonth(edu.endDate) : 'Present';

                            return (
                                <div className="border border-border rounded-lg p-4 bg-white dark:bg-slate-950/50" key={`edu-${index}`}>
                                    <div className="flex flex-row sm:items-start justify-between gap-4 mb-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-lg">{edu.institution}</h3>
                                            <p className="text-sm text-slate-500">{formattedStart} - {formattedEnd}</p>
                                        </div>
                                        
                                        <div className="relative h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] rounded-lg bg-slate-50 dark:bg-slate-900 overflow-hidden shrink-0">
                                            {edu.image && (
                                                <Image
                                                    src={urlFor(edu.image).url()}
                                                    alt={edu.institution}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
                                        <div>
                                            <p className="text-sm text-slate-500">{t('major')}</p>
                                            <p className="font-medium">{edu.major}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500">{t('studyProgram')}</p>
                                            <p className="font-medium">{edu.studyProgram}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500">{t('gpa')}</p>
                                            <p className="font-medium">{edu.gpa}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500">{t('title')}</p>
                                            <p className="font-medium">{edu.title}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}