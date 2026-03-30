'use client';

import { useActionState } from 'react';
import { sendEmail } from '../actions/sendEmail';
import Link from 'next/link';
import { BiLogoGithub, BiLogoLinkedin, BiLogoTiktok, BiLogoInstagram } from 'react-icons/bi';
import { useTranslations } from 'next-intl';

/**
 * Contact Section (Client Component)
 * * Utilizes React 19's useActionState for seamless server-action form submission.
 * * Includes accessible inputs and localized feedback messages.
 */
export default function Contact() {
    const [state, formAction, isPending] = useActionState(sendEmail, null);
    const t = useTranslations('Contact');

    return (
        <section id="contact" className="min-h-screen py-14 flex flex-col justify-center">
            <h1 className="text-2xl font-extrabold text-center mb-10">{t('title')}</h1>
            
            <div className="md:flex md:flex-row-reverse md:gap-10">
                
                {/* --- FORM SECTION --- */}
                {/* Removed <br/> tags and used Flexbox with gap-4 for precise spacing */}
                <form action={formAction} className="flex flex-col gap-4 w-full mt-10 md:mt-0 md:flex-1">
                    
                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            className="border border-border bg-transparent p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                            placeholder={t('namePlaceholder')} 
                            required 
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" // FIXED: Changed ID to 'email' to prevent collisions
                            className="border border-border bg-transparent p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                            // Make sure to add 'emailPlaceholder' to your translation files!
                            placeholder='Email...' 
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="sr-only">Message</label>
                        {/* resize-none prevents users from breaking the layout by dragging the corner */}
                        <textarea 
                            name="message" 
                            id="message" 
                            rows={5} 
                            className="border border-border bg-transparent p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" 
                            placeholder={t('messagePlaceholder')} 
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isPending} 
                        className="mt-2 p-3 bg-primary text-white font-semibold rounded-md hover:opacity-90 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all"
                    >
                        {isPending ? t('loadBtn') : t('sendBtn')}
                    </button>

                    {/* Display feedback to the user */}
                    {state?.success && <p className="text-green-600 dark:text-green-400 font-medium text-center">{state.success}</p>}
                    {state?.error && <p className="text-red-600 dark:text-red-400 font-medium text-center">{state.error}</p>}
                </form>

                {/* --- SOCIAL LINKS SECTION --- */}
                <div className="flex flex-col gap-6 mt-14 md:mt-0 md:flex-1 justify-center">
                    <Link href="https://github.com/1k14u14" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg hover:text-primary transition-colors">
                        <BiLogoGithub size={28} /> 1k14u14
                    </Link>
                    <Link href="https://www.linkedin.com/in/zikri-aulia-0a884b248" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg hover:text-primary transition-colors">
                        <BiLogoLinkedin size={28} /> Zikri Aulia
                    </Link>
                    <Link href="https://www.tiktok.com/@1k14u14" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg hover:text-primary transition-colors">
                        <BiLogoTiktok size={28} /> 1k14u14
                    </Link>
                    <Link href="https://www.instagram.com/1k14u14" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg hover:text-primary transition-colors">
                        <BiLogoInstagram size={28} /> 1k14u14
                    </Link>
                </div>
                
            </div>
        </section>
    );
}