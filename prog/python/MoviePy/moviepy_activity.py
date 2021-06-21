from moviepy.editor import *

# We have already imported and assigned the 3 video files to variables for you!
# You don't need to change anything in this section! We have shortened and adjusted the appropriate files for you.
clip1 = VideoFileClip("video1.mp4")
clip2 = VideoFileClip("video2.mp4")
clip2 = clip2.subclip(5,7.5)
clip3 = VideoFileClip("video3.mp4")
clip3 = clip3.subclip(5,7.5)

# Work Section: Write all code below this point
# All the functions required to create the final video are provided below
# Try and fill in the blanks with variable and clip names to get as close to the final video as possible.

____ = ____.fx(vfx.mirror_x)
____ = ____.fx(vfx.time_mirror)
____ = ____.resize(0.75)

# Clips array creates the grid video structure, so try out different combinations to match the final video!
____ = clips_array([[____, ____],
                          [____, ____]])
                          
# The final video is made low resolution for minimal exporting time and to allow you to try out multiple combinations!
final_clip.resize(width=480).write_videofile("final_video.mp4")
