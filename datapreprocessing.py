import numpy as np
from astropy.io import fits
import matplotlib.pyplot as plt
import pandas as pd

def normalize(arr):
    """
    Linear normalization
    http://en.wikipedia.org/wiki/Normalization_%28image_processing%29
    """
    # arr = arr.astype('float')
    # minval = arr.min()
    # maxval = arr.max()
    # if minval != maxval:
    #     arr -= minval
    #     arr *= (1.0 / (maxval - minval))
    return arr

def create_rgb_image(fits_file, out_fn):
    # Open the FITS image
    hdu = fits.open(fits_file)
    data = hdu[0].data

    # Assuming data is a 2D array (grayscale)
    # Duplicate the grayscale data for red, green, and blue channels
    rgb_array = np.stack((data, data, data), axis=-1)

    # Normalize the data
    normalized_rgb_array = normalize(rgb_array)

    # Ensure data is within the valid range for imshow with RGB data
    #normalized_rgb_array = np.clip(normalized_rgb_array, 0.0, 255.0)
    ## output_array = (normalized_rgb_array - normalized_rgb_array.min()) / (normalized_rgb_array.max() - normalized_rgb_array.min())
    #adding log to array
    # mean = np.mean(normalized_rgb_array, axis=(1, 2), keepdims=True)
    # std_dev = np.std(normalized_rgb_array, axis=(1, 2), keepdims=True)
    # output_array = (normalized_rgb_array - mean) / std_dev
    output_array = np.interp(normalized_rgb_array, (normalized_rgb_array.min(), normalized_rgb_array.max()), (0, 255))
    #for w3
    # output_array +=50
    #for w4
    output_array *= 0.03
    # output_array = np.log(output_array)/ np.log(1.5)
    # Create a figure
    #
    fig, ax = plt.subplots(figsize=(3.4, 3.4))

    # Plot the RGB image
    ax.imshow(output_array, cmap='gray', interpolation='nearest', origin='lower')

    # Configure the plot
    ax.axis('off')
    output_array = data.astype(np.int8)
    # print(output_array)
    # img = Image.fromarray(output_array)
    # img.save('testrgb.png')
    # Save the figure
    fig.savefig(out_fn, dpi=300, bbox_inches='tight', pad_inches=0)
    #print(normalized_rgb_array)
    print(pd.DataFrame(output_array[350]).describe())
    print(output_array.max())
    print(f"RGB image saved at: {out_fn}")



# Replace 'your_fits_file.fits' with the actual path to your .fits file
# Replace 'output_image.png' with the desired output image file name
# image_arr = ['0017p333_ab41-w1-int-3_ra2.198833333_dec33.43333333_asec500.000.fits',
#              '0017p333_ab41-w2-int-3_ra2.198833333_dec33.43333333_asec500.000.fits',
#              '0017p333_ab41-w3-int-3_ra2.198833333_dec33.43333333_asec500.000.fits',
#              '0017p333_ab41-w4-int-3_ra2.198833333_dec33.43333333_asec500.000.fits']

# for i in range(0 , 3):
# create_rgb_image("0098p408_ab41-w4-int-3_ra10.68479292_dec41.269065_asec5000.000.fits", '0098_output_image_4-1.png')
other_pics("rice_2215nm.png", 'rice4.png')

