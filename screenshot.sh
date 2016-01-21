#!/bin/bash
if [ ! -e $HOME/Pictures/Screenshots ]
then
mkdir -p $HOME/Pictures/Screenshots
fi
dir="$HOME/Pictures/Screenshots"
name=$( date +'%F->%H:%M:%S%#p' )
photo="$dir/Screenshot_from_$name.jpg"
gnome-screenshot $1 -f $photo
