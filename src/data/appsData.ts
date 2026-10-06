export interface AppItem {
  slug: string;
  name: string;
  subdomainUrl: string;
  thumbnailUrl: string;
  shortDescription: string;
  projectSlug?: string;
}

// Scope Note (per PDR v6): Dedicated to self-hosted web apps only.
// Starts empty for v1-v2 MVP; will be populated in v6.
export const appsData: AppItem[] = [];