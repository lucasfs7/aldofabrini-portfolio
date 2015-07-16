#!/bin/bash

printf "Running Vagrant Provisioning..."

printf "Updating Box..."
# make sure the box is fully up to date
apt-get -y update

printf "Installing a few necessary packages..."
# install required packages
apt-get install -y git nodejs npm

printf "Installing nvm..."
# download package and switch to latest version
git clone --quiet https://github.com/creationix/nvm.git /home/vagrant/.nvm && cd /home/vagrant/.nvm
git checkout --quiet `git describe --abbrev=0 --tags`

# backup .bashrc since we're going to change it
cp /home/vagrant/.bashrc /home/vagrant/.bashrc.backup

# automatically source nvm from the .bashrc file on login
echo "source ~/.nvm/nvm.sh" >> /home/vagrant/.bashrc

# set the source of nvm for this session
source /home/vagrant/.nvm/nvm.sh

# install iojs with nvm
nvm install iojs

# make iojs default
nvm alias default iojs

# make sure npm is up to date
npm install -g npm

# remove old hash for npm so bash will find the new version
hash -d npm

# Needed for docs generation.
update-locale LANG=en_US.UTF-8 LANGUAGE=en_US.UTF-8 LC_ALL=en_US.UTF-8

printf "Making sure ownership rights are correct in vagrant user directory..."
# make sure everything in the vagrant directory is owned by vagrant
chown -R vagrant:vagrant /home/vagrant --quiet
