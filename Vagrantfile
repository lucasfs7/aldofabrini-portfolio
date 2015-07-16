# Vim
# # vim: set filetype=ruby:
# # vim: set ft=ruby:
# #
# # Emacs
# # -*- mode: ruby; -*-

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"
  config.vm.provision :shell, path: "./scripts/provisioner.sh"
  config.vm.network :forwarded_port, guest: 8080, host: 8080
  config.vm.synced_folder ".", "/vagrant"
  config.ssh.forward_agent = true
  config.vm.network :private_network, ip: "33.33.33.10"
  config.vm.network :public_network
end
