#!/usr/bin/env bash

## deploy.sh: run during a Travis CI build to deploy _site directory to the gh-pages branch on GitHub.
## References
## - https://github.com/manubot/catalog/blob/0d9732904eccf04d2a2e95777190169650c8dde4/deploy.sh

# Set options for extra caution & debugging
set -o errexit \
    -o nounset \
    -o pipefail

eval "$(ssh-agent -s)"
# Ensure command traces are disabled while dealing with the private key
set +o xtrace
echo -e $TRAVIS_SSH_PRIVATE_KEY | ssh-add -
set -o xtrace

# Configure git
git config --global push.default simple
git config --global user.name "Travis CI"
git config --global user.email "travis@travis-ci.com"
git checkout "$TRAVIS_BRANCH"
git remote set-url origin "git@github.com:$TRAVIS_REPO_SLUG.git"

# Fetch and create gh-pages branch
# Travis does a shallow and single branch git clone
git remote set-branches --add origin gh-pages
git fetch origin gh-pages:gh-pages

commit_message="\
Build site on $(date --iso --utc)

built by $TRAVIS_JOB_WEB_URL
based on https://github.com/$TRAVIS_REPO_SLUG/commit/$TRAVIS_COMMIT

[skip ci]
"
# echo >&2 "$commit_message"
#pip install --user $(whoami) --upgrade ghp-import
pip install --upgrade ghp-import
ghp-import \
  --push --no-jekyll \
  --message="$commit_message" \
  _site
