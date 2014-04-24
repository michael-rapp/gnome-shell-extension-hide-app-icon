#!/bin/bash

echo 'Press enter to start the installation of the Gnome Shell Extension "Hide App Icon"...';
read -n 1 -s;

if [ -d ~/.local/share/gnome-shell/extensions/hide-app-icon@mrapp.sourceforge.com/ ]; then
    echo 'Deleting old files...';
    rm -r ~/.local/share/gnome-shell/extensions/hide-app-icon@mrapp.sourceforge.com/;
fi

echo 'Copying files...';
cp -r hide-app-icon@mrapp.sourceforge.com ~/.local/share/gnome-shell/extensions/