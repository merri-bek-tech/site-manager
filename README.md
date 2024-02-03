# Pibasho

Manage the Raspberri Pi that powers your household using Local First tech.

# Development

## Tech Stack

### Backend

The backend is a rust app, using the [Rocket framework](https://rocket.rs/). The rust package management tool "cargo" is used. To fetch what you need and start the server, run `cargo run`.

## Frontend

The frontend (web interface) is built using React, using the [Vite](https://vitejs.dev/) as the tooling to build and run. Packages are managed using npm. It's also heavily dependent on several other library choices:

- [Chakra UI](https://chakra-ui.com/) For the component library and styling

Running the frontend us done with `npm run dev`

### Generating a release

We use [Release it](https://github.com/release-it/release-it). To run it, use `npm run release`

# Installation

## Part 1: Initial Pi Setup

1. Get a Raspberry Pi (version 4 or 5), and a blank SD card
2. Use the Raspberri Pi Imager program to flash the SD Card with an image. Use the Advanced options and set the following:
   - Ubuntu Server 23.10 (64-bit)
   - Set hostname, eg `mycroft`
   - Setup a SSH user named pi
   - Setup Wifi details
3. Put the card into the pi on your local network, give it time to boot, and you should be able to ssh into it using `ssh@mycroft.local`.
4. When you log in, you will probably see security updates that need appling, eg `85 updates can be applied immediately`. Install them with `sudo apt update` then `sudo apt upgrade`.
5. If your security updates installed new linux firmware, it may need a restart. If so, do this with `sudo reboot`, then wait for it to boot up again and ssh back in.

## Part 2: Setup Docker

Based on [these official instructions](https://docs.docker.com/engine/install/ubuntu/).

1. Install docker's apt repository using the following commands:

```
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

2. Install docker

```
sudo apt-get install docker-ce docker-ce-cli docker-compose-plugin
```

3. Test installation. You can test that docker is working by running `sudo docker run hello-world`
