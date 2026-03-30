import { getServices } from '@/sanity/sanity-utils';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

/**
 * Services Section (Server Component)
 * * Displays a localized grid of freelance services offered by the developer.
 * * Uses a responsive grid and interactive card UI.
 */
export default async function Service({ locale }: { locale: string }) {
    // Fetch services data and translations concurrently
    const services = await getServices(locale);
    const t = await getTranslations('Service');

    // Fallback UI if the Sanity query fails
    if (!services) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-xl font-bold">Please publish this page in Sanity Studio first.</p>
            </div>
        );
    }

    return (
        <section id="service" className="pt-20 pb-14 min-h-screen flex flex-col justify-center">
            
            {/* Section Header */}
            <h1 className="text-2xl font-extrabold text-center mb-4">{t('title')}</h1>
            <p className="mb-10 text-center text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                {t('description')}
            </p>
            
            {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {services.map((service) => (
                    <div 
                        key={service._id}
                        // Polished card styling: Removed the hardcoded white background for dark mode
                        className="border border-border rounded-lg p-6 bg-white dark:bg-slate-950/50 flex flex-col items-center text-center gap-4 hover:shadow-lg dark:hover:shadow-slate-800 hover:-translate-y-1 transition-all" 
                    >
                        {/* Icon/Image Container: Added a subtle background circle behind the logo */}
                        {/* THE FIX: Changed dark:bg-slate-900 to dark:bg-slate-200 */}
                        <div className="relative h-[70px] w-[70px] bg-slate-50 dark:bg-slate-200 rounded-full flex items-center justify-center border border-border shrink-0 overflow-hidden">
                            <Image
                                src={service.image}
                                alt={service.name}
                                fill
                                className="object-contain p-3"
                            />
                        </div>
                        
                        <h3 className="font-bold text-lg">{service.name}</h3>
                        
                        {/* THE FIX: Restored the description for better UX! */}
                        {service.description && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                                {service.description}
                            </p>
                        )}
                    </div>
                ))}
                
            </div>
        </section>
    );
}