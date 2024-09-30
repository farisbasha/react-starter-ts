#!/bin/bash

# List of features to create
features=("auth" "restaurant" "cart" "orders" "deals" "search" "reviews" "favorites" "checkout" "shared")

# Loop through each feature and call the npm script
for feature in "${features[@]}"
do
  echo "Creating structure for feature: $feature"
  npm run add-feature -- "$feature"
done

echo "All features have been created."
