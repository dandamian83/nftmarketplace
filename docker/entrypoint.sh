#!/bin/sh

# Change to the correct directory
cd /usr/src/app;

# Run hardhat
#yarn start:local &

# Deploy Smart Contracts
#yarn deploy:local

# Run next client
#yarn client:dev

# Set environment variable


# Keep node alive
set -e
if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ]; then
  set -- node "$@"
fi
exec "$@"