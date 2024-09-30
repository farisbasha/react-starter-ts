#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Check if the feature name and page name are provided
const [,, featureName, pageName] = process.argv;

if (!featureName || !pageName) {
  console.error('Usage: add-page <feature-name> <page-name>');
  process.exit(1);
}

// Kebab-case validation
const isKebabCase = (str) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(str);

if (!isKebabCase(pageName)) {
  console.error('Error: The page name must be in kebab-case (e.g., my-page).');
  process.exit(1);
}

// Convert kebab-case to PascalCase for the component name
const toPascalCase = (str) => str
  .replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase());

// Define paths
const BASE_PATH = join(process.cwd(), 'src/features', featureName);
const PAGE_PATH = join(BASE_PATH, 'pages', `${pageName}.tsx`);
const COMPONENTS_PATH = join(BASE_PATH, 'components', pageName);
const ROUTES_PATH = join(BASE_PATH, 'routes', 'index.ts');

// Get the component name (PascalCase)
const componentName = toPascalCase(pageName);

// Check if feature directory exists
if (!existsSync(BASE_PATH)) {
  console.error(`Error: Feature '${featureName}' does not exist.`);
  process.exit(1);
}

// Create the page file in the pages directory with a dummy component
const componentContent = `
// ${componentName} component

const ${componentName} = () => {
  return (
    <div>
      <h1>${componentName} Page</h1>
    </div>
  );
};

export default ${componentName};
`;

writeFileSync(PAGE_PATH, componentContent, { flag: 'wx' });

// Create the corresponding folder in the components directory
if (!existsSync(COMPONENTS_PATH)) {
  mkdirSync(COMPONENTS_PATH, { recursive: true });
  console.log(`Created folder: ${COMPONENTS_PATH}`);
} else {
  console.log(`Folder already exists: ${COMPONENTS_PATH}`);
}

// Function to add route to routes/index.ts
const addRouteToFile = () => {
  const routesExport = `${featureName}Routes`;
  const routeEntry = `
    {
      path: '/${pageName}',
      lazy: async () => {
        const { default: ${componentName} } = await import('../pages/${pageName}');
        return { Component: ${componentName} };
      },
    },
  `;

  // Read the current content of the routes file
  let fileContent = readFileSync(ROUTES_PATH, 'utf-8');

  
  fileContent = fileContent.replace(
    `const ${routesExport}: RouteObject[] = [`,
    `const ${routesExport}: RouteObject[] = [\n  ${routeEntry.trim()}\n`
  );

  // Write the updated content back to the routes file
  writeFileSync(ROUTES_PATH, fileContent.trim() + '\n', 'utf-8');
  console.log(`Route added for ${pageName} in ${routesExport}`);
};

// Check if routes/index.ts exists and is writable
if (existsSync(ROUTES_PATH)) {
  addRouteToFile();
  console.log(`Route added to '${ROUTES_PATH}'.`);
} else {
  console.error(`Error: Could not find or access '${ROUTES_PATH}' to add the route.`);
}

console.log(`Page '${pageName}.tsx' with component '${componentName}' has been created in feature '${featureName}'.`);
