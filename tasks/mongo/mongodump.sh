#!/bin/bash

echo "username:";
read username;

echo "password:";
read password;

mongodump --host 185.65.244.51:27017 --db test --username $username --password $password --authenticationDatabase admin