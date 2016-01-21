#!/bin/bash
if [ ! -e $HOME/Videos/Records ]
then
mkdir -p $HOME/Videos/Records
fi

dir="$HOME/Videos/Records"
name=$( date +'%F->%H:%M:%S%#p' )
video="$dir/Record_from_$name"

recordmydesktop --no-frame $1 --display :0.0 -o $video
