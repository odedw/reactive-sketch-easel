D:\Apps\ffmpeg-5.1.2-essentials_build\bin\ffmpeg.exe -framerate 29 -i  frame-%d.png -c:v libx264 -r 29 -pix_fmt yuv420p output.mp4
D:\Apps\ffmpeg-5.1.2-essentials_build\bin\ffmpeg.exe -framerate 60 -i  frame-%d.png -c:v libx264 -r 60 -pix_fmt yuv420p output.mp4          
D:\Apps\gifski-1.8.1\win\gifski.exe -o output.gif --fps 50 frame*.png