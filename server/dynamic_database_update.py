import csv
from csv import writer
import pandas as pd

#############################################
###### Dynamically Update Datasetstats ######
#############################################


#Taking in the varibles image name, sign code, aspect ratio 
index = '0'
Image = 'DB7_0001_1_1_4.png'
SignCode = 'DB5'
AspectRatio = '5.5'

#Structure of csv file
data_for_datasetstats = [index,Image,SignCode,AspectRatio]

with open('server/database/Precalculated_Data_Set_Stats/datasetstats.csv', 'a', newline='') as f_object:  
    # Pass the CSV  file object to the writer() function
    writer_object = writer(f_object)
    # Result - a writer object

    # Pass the data in the list as an argument into the writerow() function
    writer_object.writerow(data_for_datasetstats)  

    # Close the file object
    f_object.close()

#############################################
###### Dynamically Update pxls-20 ######
#############################################

#399 pixel values 
#Taking in the varibles image name, sign code, aspect ratio 

index = 'New Upload'
Image = 'DB7_0001_1_1_4.png'
Pixel_Values = [1,2,3,4,5,6,7,8,9,10,399]


#Structure of csv file
data_for_pxls_20 = [index,Image,1,2,3,4,5,6,7,8,9,10,399]

with open('server/database/Precalculated_Data_Set_Stats/pxls_20.csv', 'a', newline='') as f_object:  
    # Pass the CSV  file object to the writer() function
    writer_object = writer(f_object)
    # Result - a writer object

    # Pass the data in the list as an argument into the writerow() function
    writer_object.writerow(data_for_pxls_20)  
    
    # Close the file object
    f_object.close()