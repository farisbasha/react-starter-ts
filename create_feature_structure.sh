#!/bin/bash

# Check if feature name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <feature-name>"
  exit 1
fi

# Define the feature name and base paths
FEATURE_NAME=$1
BASE_PATH="$(pwd)/src/features"  # Relative to the eatiko_pwa directory
ASSETS_PATH="$(pwd)/src/assets/$FEATURE_NAME"
TYPES_PATH="$(pwd)/src/types/$FEATURE_NAME"
STORE_PATH="$(pwd)/src/store/$FEATURE_NAME"

# Feature directory path
FEATURE_DIR="$BASE_PATH/$FEATURE_NAME"

# Create feature directory structure
mkdir -p "$FEATURE_DIR/components"
mkdir -p "$FEATURE_DIR/icons"
mkdir -p "$FEATURE_DIR/pages"
mkdir -p "$FEATURE_DIR/routes"

# Create index.ts in routes
touch "$FEATURE_DIR/routes/index.ts"

# Add .gitkeep to empty directories
for dir in "$FEATURE_DIR/icons" "$FEATURE_DIR/components" "$FEATURE_DIR/pages"; do
  touch "$dir/.gitkeep"
done

# Create directories for global assets, types, and store
mkdir -p "$ASSETS_PATH"
mkdir -p "$TYPES_PATH"
mkdir -p "$STORE_PATH/api"
mkdir -p "$STORE_PATH/slice"

# Create index.tsx in store
touch "$STORE_PATH/index.tsx"

# Add .gitkeep to store directories
for dir in "$STORE_PATH/api" "$STORE_PATH/slice"; do
  touch "$dir/.gitkeep"
done

echo "Folder structure for feature '$FEATURE_NAME' has been created:
- Assets: $ASSETS_PATH
- Types: $TYPES_PATH
- Store: $STORE_PATH
- Feature: $FEATURE_DIR"
