#!/bin/bash

pushd ../../../db
git add -A
git commit -am"dump"
git push dump master
popd


