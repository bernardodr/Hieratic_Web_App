import csv
from csv import writer

#read in datasetstats & pxls_20

#Taking in the varibles image name, sign code, aspect ratio 
index = '0'
Image = 'DB7_0001_1_1_4.png'
SignCode = 'DB5'
AspectRatio = '5.5'

data_for_datasetstats = [index,Image,SignCode,AspectRatio]

with open('server/database/Precalculated_Data_Set_Stats/datasetstats.csv', 'a', newline='') as f_object:  
    # Pass the CSV  file object to the writer() function
    writer_object = writer(f_object)
    # Result - a writer object
    # Pass the data in the list as an argument into the writerow() function
    writer_object.writerow(data_for_datasetstats)  
    # Close the file object
    f_object.close()