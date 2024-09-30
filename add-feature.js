#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

// Check if the feature name is provided
const [,, featureName] = process.argv;

if (!featureName) {
  console.error('Usage: add-feature <feature-name>');
  process.exit(1);
}

// Define paths
const BASE_PATH = join(process.cwd(), 'src/features');
const ASSETS_PATH = join(process.cwd(), 'src/assets', featureName);
const TYPES_PATH = join(process.cwd(), 'src/types', featureName);
const STORE_PATH = join(process.cwd(), 'src/store', featureName);

// Feature directory paths
const FEATURE_DIR = join(BASE_PATH, featureName);
const COMPONENTS_DIR = join(FEATURE_DIR, 'components');
const ICONS_DIR = join(FEATURE_DIR, 'icons');
const PAGES_DIR = join(FEATURE_DIR, 'pages');
const ROUTES_DIR = join(FEATURE_DIR, 'routes');

// Create directories for the feature
mkdirSync(COMPONENTS_DIR, { recursive: true });
mkdirSync(ICONS_DIR, { recursive: true });
mkdirSync(PAGES_DIR, { recursive: true });
mkdirSync(ROUTES_DIR, { recursive: true });

// Create index.ts in routes
const ROUTES_FILE_PATH = join(ROUTES_DIR, 'index.ts');
const routeFileContent = `
import { RouteObject } from 'react-router-dom';

const ${featureName}Routes: RouteObject[] = [];

export { ${featureName}Routes };
`;
writeFileSync(ROUTES_FILE_PATH, routeFileContent);

// Create directories for global assets, types, and store
mkdirSync(ASSETS_PATH, { recursive: true });
mkdirSync(TYPES_PATH, { recursive: true });
mkdirSync(join(STORE_PATH, 'api'), { recursive: true });
mkdirSync(join(STORE_PATH, 'slice'), { recursive: true });

// Add .gitkeep to empty directories (including assets and types)
const dirsToGitkeep = [
  ICONS_DIR, 
  COMPONENTS_DIR, 
  PAGES_DIR, 
  ASSETS_PATH, 
  TYPES_PATH
];
dirsToGitkeep.forEach(dir => writeFileSync(join(dir, '.gitkeep'), ''));

// Create index.ts in store
writeFileSync(join(STORE_PATH, 'index.ts'), `const ${featureName}Reducers = {};\n\nexport { ${featureName}Reducers };\n`);

// Add .gitkeep to store directories
const storeDirsToGitkeep = [join(STORE_PATH, 'api'), join(STORE_PATH, 'slice')];
storeDirsToGitkeep.forEach(dir => writeFileSync(join(dir, '.gitkeep'), ''));

console.log(`Folder structure for feature '${featureName}' has been created:
- Assets: ${ASSETS_PATH}
- Types: ${TYPES_PATH}
- Store: ${STORE_PATH}
- Feature: ${FEATURE_DIR}
`);

// Update the routes in src/app/router.tsx
const APP_ROUTES_PATH = join(process.cwd(), 'src/app/router.tsx');

if (existsSync(APP_ROUTES_PATH)) {
  let appRoutesContent = readFileSync(APP_ROUTES_PATH, 'utf-8');

  // Check if the feature routes are already added
  if (!appRoutesContent.includes(`...${featureName}Routes`)) {
    const routesExport = `import { ${featureName}Routes } from '@/features/${featureName}/routes';`;

    // Add the import and spread operator
    appRoutesContent = appRoutesContent.replace(
      'const appRoutes: RouteObject[] = [',
      `const appRoutes: RouteObject[] = [\n  ...${featureName}Routes,`
    );

    if (!appRoutesContent.includes(routesExport)) {
      appRoutesContent = `${routesExport}\n\n${appRoutesContent}`;
    }

    writeFileSync(APP_ROUTES_PATH, appRoutesContent, 'utf-8');
    console.log(`Added ${featureName}Routes to appRoutes in '${APP_ROUTES_PATH}'.`);
  } else {
    console.log(`${featureName}Routes already exist in '${APP_ROUTES_PATH}'.`);
  }
} else {
  console.error(`Error: Could not find '${APP_ROUTES_PATH}' to add the routes.`);
}

// Update store/index.ts to add feature reducers
const STORE_INDEX_PATH = join(process.cwd(), 'src/store/index.ts');

if (existsSync(STORE_INDEX_PATH)) {
  let storeIndexContent = readFileSync(STORE_INDEX_PATH, 'utf-8');

  // Check if the feature reducers are already added
  if (!storeIndexContent.includes(`...${featureName}Reducers`)) {
    const reducersExport = `import { ${featureName}Reducers } from './${featureName}';`;

    // Add the import and spread operator to the reducers
    storeIndexContent = storeIndexContent.replace(
      'const reducers = {',
      `const reducers = {\n  ...${featureName}Reducers,`
    );

    if (!storeIndexContent.includes(reducersExport)) {
      storeIndexContent = `${reducersExport}\n\n${storeIndexContent}`;
    }

    writeFileSync(STORE_INDEX_PATH, storeIndexContent, 'utf-8');
    console.log(`Added ${featureName}Reducers to reducers in '${STORE_INDEX_PATH}'.`);
  } else {
    console.log(`${featureName}Reducers already exist in '${STORE_INDEX_PATH}'.`);
  }
} else {
  console.error(`Error: Could not find '${STORE_INDEX_PATH}' to add the reducers.`);
}

console.log(`Feature setup complete for '${featureName}'.`);
