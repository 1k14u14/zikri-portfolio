import { Hero } from '@/types/Hero';
import { Project } from '@/types/Project';
import { About } from '@/types/About';
import { Service } from '@/types/Service';
import { createClient, groq } from 'next-sanity';
import clientConfig from './config/client-config';
import imageUrlBuilder from '@sanity/image-url';

// ============================================================================
// SANITY IMAGE BUILDER
// ============================================================================

// Initialize the Sanity image builder with our client configuration
const builder = imageUrlBuilder(createClient(clientConfig));

/**
 * Utility function to generate usable image URLs from Sanity image assets.
 * Allows for chaining methods like .width(), .height(), or .url() in components.
 * * @param source - The raw image object returned from a Sanity GROQ query.
 * @returns An image builder object to generate the final URL.
 */
export function urlFor(source: any) {
  return builder.image(source);
}

// ============================================================================
// DATA FETCHING FUNCTIONS (Server-Side)
// ============================================================================

/**
 * Fetches the Hero section data based on the active locale.
 * * @param lang - The current active language (defaults to 'en').
 * @returns A single Hero object (fixed TypeScript return type from array to single object).
 */
export async function getHero(lang: string = 'en'): Promise<Hero> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "hero" && language == $lang][0]{
      _id,
      _createdAt,
      title,
      description,
      coverImage
    }`,
    { lang }
  );
}

/**
 * Fetches a limited preview of the most recent projects for the Home page.
 * Uses GROQ slice syntax [0...4] to limit the response to 4 items for performance.
 * * @param lang - The current active language (defaults to 'en').
 * @returns An array of up to 4 Project objects.
 */
export async function getLatestProjects(lang: string = 'en'): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && language == $lang][0...4]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      category,
      "coverImage": coverImage.asset->url,
      techStack,
      url,
      content
    }`,
    { lang }
  );
}

/**
 * Fetches all available projects based on the active locale.
 * Intended for the main /projects listing page.
 * * @param lang - The current active language (defaults to 'en').
 * @returns An array of all matching Project objects.
 */
export async function getProjects(lang: string = 'en'): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && language == $lang]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      category,
      "coverImage": coverImage.asset->url,
      techStack,
      url,
      content
    }`,
    { lang }
  );
}

/**
 * Fetches a single project by its globally unique slug.
 * NOTE: This purposely omits the language parameter because our architecture
 * uses unique slugs (e.g., 'project-name' vs 'project-name-id') to determine language.
 * * @param slug - The URL-friendly identifier for the project.
 * @returns A single Project object matching the slug.
 */
export async function getProject(slug: string): Promise<Project> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      category,
      "coverImage": coverImage.asset->url,
      techStack,
      url,
      content
    }`,
    { slug }
  );
}

/**
 * Fetches the comprehensive About/Resume profile data.
 * * @param lang - The current active language (defaults to 'en').
 * @returns A single About profile object.
 */
export async function getAbout(lang: string = 'en'): Promise<About> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "about" && language == $lang][0]{
      _id,
      _createdAt,
      title,
      "avatar": avatar.asset->url,
      resume,
      hardSkills,
      softSkills,
      certification,
      experience,
      educations
    }`,
    { lang }
  );
}

/**
 * Fetches the list of freelance services offered.
 * * @param lang - The current active language (defaults to 'en').
 * @returns An array of Service objects.
 */
export async function getServices(lang: string = 'en'): Promise<Service[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "service" && language == $lang]{
      _id,
      _createdAt,
      name,
      "image": image.asset->url,
      description,
    }`,
    { lang }
  );
}