#!/usr/bin/env bash
set -euo pipefail
cd /home/exedev/giles.io
npm run build
test -f dist/index.html
test -f dist/about/index.html
test -f dist/work/index.html
test -f dist/work/mixo/index.html
test -f dist/work/commbank/index.html
test -f dist/work/eguarantee/index.html
test -f dist/work/lawpath/index.html
test -f dist/contact/index.html
if [ -e dist/blog/index.html ]; then
  echo "FAIL: dist/blog/index.html should not exist" >&2
  exit 1
fi
if [ -e dist/playground/index.html ]; then
  echo "FAIL: dist/playground/index.html should not exist" >&2
  exit 1
fi
grep -q "Giles Butler" dist/index.html
grep -q "Giles Butler" dist/about/index.html
printf 'portfolio build verified\n'
