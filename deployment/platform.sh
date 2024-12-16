#!/bin/bash

# Used in Docker build to set platform dependent variables

case $TARGETARCH in

    "amd64")
	echo "x86_64-unknown-linux-gnu" > /app/.platform
	echo "" > /app/.compiler
	;;
    "arm64")
	echo "aarch64-unknown-linux-gnu" > /app/.platform
	echo "gcc-aarch64-linux-gnu" > /app/.compiler
	;;
    "arm")
	echo "armv7-unknown-linux-gnueabihf" > /app/.platform
	echo "gcc-arm-linux-gnueabihf" > /app/.compiler
	;;
esac