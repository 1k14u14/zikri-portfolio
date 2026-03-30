import { defineConfig } from 'sanity';
// THE FIX: Changed 'deskTool' from 'sanity/desk' to 'structureTool' from 'sanity/structure'
import { structureTool } from 'sanity/structure'; 
import { documentInternationalization } from '@sanity/document-internationalization';
import schemaTypes from './sanity/schemaTypes';

/**
 * Sanity Studio Configuration
 * * Defines the core settings, plugins, and schema types for the CMS backend.
 * * Accessible locally or in production via the '/admin' base path.
 */
const config = defineConfig({
  // Project identifiers (It is safe to expose these as they are public APIs)
  projectId: 'e2yiulo8',
  dataset: 'production',
  apiVersion: '2023-10-01',
  
  title: 'Zikri Aulia Portfolio', // Updated to look professional in the Studio tab
  basePath: '/admin',

  // --- PLUGINS ---
  plugins: [
    // 1. Core Structure: Provides the default UI for managing documents
    structureTool(),
    
    // 2. Internationalization (i18n): Enables document-level translations
    documentInternationalization({
      // Define the supported locales (Must match Next-Intl frontend settings)
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'id', title: 'Indonesian' }
      ],
      // Define strictly which schemas are allowed to be translated
      schemaTypes: ['about', 'hero', 'service', 'project'], 
    }),
  ],

  // --- SCHEMAS ---
  schema: {
    // Import the compiled array of all document and object types
    types: schemaTypes
  },
});

export default config;