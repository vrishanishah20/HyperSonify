'''
Sonifies 4 layers of image files into a single audio mp3 file
Input is taken as 4 command line arguments each of which are paths to the 4 layers of images

Execute this command on the terminal with the path to ffmpeg bin folder before executing the program:

$env:PATH+=";<path to ffmpeg bin folder>"

Example:
$env:PATH+=";C:\\Users\\USER\\Desktop\\L3a\\0835m061_ac51\\ffmpeg-master-latest-win64-gpl-shared\\bin"
'''

from PIL import Image
from astropy.table import Table
from matplotlib import pyplot as plt
from astronify.series import SoniSeries
from pydub import AudioSegment
import numpy as np
import sys
import os
from scipy import signal


#Folder to save temporary audio files and audio files of each layer image
# NOTE: Please create the respective folders in the same folder as the script

TMP_PATH="tmp"
LAYER_AUDIO_PATH="sounds"

#paths of 4 images are taken as command line arguments input
#we are using four layers as default
if len(sys.argv)!=5:
    print("Error")
    exit(1)


audio_files=[]

#run for each of the four images
for i in range(1,5):

    #open and convert image into a matrix
    img_name=sys.argv[i]
    img_data = Image.open(img_name)
    img_data=img_data.rotate(-90,resample=Image.BICUBIC, expand=True)
    #img_data.show()
    img_arr = np.array(img_data)

    print("converted to array ",img_name)

    #decompose 3d image RGB matrix into 1d array using mean of values
    orig_data=[]
    for i in img_arr:
        row=[]
        for j in i:
            row.append(np.mean(j))
        orig_data.append(np.mean(row))

    print("length of image array is ",len(orig_data))

    #create audio file of two arrays
    # 1) First array takes values as is and detects larger objects in the input and is less sensitive to smaller objects giving a smoother sound
    # 2) Second array difference of consecutive values and detects smaller objects in the input and is more sensitive to smaller objects giving 
    #    a noise like sound for complex images
    audio_files=[]
    for curr in range(2):

        print("Iteration ",curr)
        new_data=[*orig_data]
        new_data[0]=0
        
        #only runs for the second array, find difference of values and apply a smoothening filter to filter out the harsh frequency changes while retaining
        #the noise
        if curr==1:    
            for i in range(1,len(orig_data)):
                new_data[i]=abs(orig_data[i]-orig_data[i-1])
            
            new_data=signal.savgol_filter(new_data,window_length=25,polyorder=3,mode="nearest")

        #create an astropy table to sonify the sounds
        data=Table({"time":range(len(new_data)),"flux":new_data})


        #for displaying the plotted graphs of the dataif needed

        # plt.plot(data["time"], data["flux"])
        # plt.ylabel('flux')
        # plt.xlabel('time')
        # plt.show()

        #converts array of values into frequencies

        data_table = data
        data_soni = SoniSeries(data_table)

        #noise array is given a smaller gain so we can better hear the smooth frequencies of bigger objects
        if curr==1:
            data_soni.gain=0.04
        else:
            data_soni.gain=0.06

        #note spacing controls the duration of the audio
        data_soni.note_spacing = 0.084

        #pitch range defines min and max frequency
        data_soni.pitch_mapper.pitch_map_args["pitch_range"]=[100,5000]
        
        #sonify the data and create audio files
        data_soni.sonify()
        audio_files.append(os.path.join(TMP_PATH,img_name+str(curr)+".wav"))
        data_soni.write(os.path.join(TMP_PATH,img_name+str(curr)+".wav"))


    #overlay the noisy and smooth audio files to form a single wav file
    output = AudioSegment.from_mp3(audio_files[0])

    for i in range(1,len(audio_files)):
        output=output.overlay(AudioSegment.from_mp3(audio_files[i]))

    output.export(os.path.join(LAYER_AUDIO_PATH,img_name+"_output_sound.mp3"),format="mp3")
    audio_files.append(os.path.join(LAYER_AUDIO_PATH,img_name+"_output_sound.mp3"))


#overlays the audio files of each layer into one final audio file
output = AudioSegment.from_mp3(audio_files[0])

for i in range(1,len(audio_files)):
    output=output.overlay(AudioSegment.from_mp3(audio_files[i]))

output.export("final_sound.mp3",format="mp3")