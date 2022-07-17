const fs = require("fs");
const { exit } = require("process");
const { finished } = require("stream");
//let JSON_FILE = fs.readFileSync("TEST.json","utf-8");
//let tabinDataset = JSON.parse(JSON_FILE)
//let usersjson = fs.readFileSync("TEST.json","utf-8");
//let users = JSON.parse(usersjson);
//console.log(tabinDataset)
var data = []
///////////////////////////////////////////
////////// Counter Files for IDm //////////
///////////////////////////////////////////
var xy=''
let count = 0

//////////////////////////////////////////
////////// Get Every Image Name //////////
//////////////////////////////////////////

fs.readdirSync("/Users/benjenkins/Desktop/Dissertation - Hieratic OCR website/Hieratic_Web_App/server/database/Thesis_Dataset_Whole/").forEach(file => {

    ////////////////////////////////////////////////
    ////////// Dynamically get Image data //////////
    ////////////////////////////////////////////////

    //Counter
    count++


    // id to ensure no duplicates
    var id = count;

    //Image name
    var Image_Name = file;


    // Relative Image Path
    var Relative_Image_Path = "database/Thesis Dataset Whole/" + file.toString();

    //Gardiner Sign
    var split1 = file.split('_0')
    var Gardiner_Sign = split1[0]
    var split2 = split1[1]
    
    //Instance in Facsimile

    var Instance_In_Facsimile = split2.split('_');
    Instance_In_Facsimile = Instance_In_Facsimile[0]

    //Facsimile Maker

    var Facsimile_Maker = split2.split('_');
    Facsimile_Maker_Number = Facsimile_Maker[1]

    if (Facsimile_Maker_Number == 1) {
        Facsimile_Maker = 'Möller'
    }
    else if (Facsimile_Maker_Number == 2) {
        Facsimile_Maker = 'Poe'
    }
    else if (Facsimile_Maker_Number == 3) {
        Facsimile_Maker = 'Tabin'
    }
    else {
        Facsimile_Maker = 'Unknown'
    };


    //Provenance
    var Provenance = split2.split('_');
    Provenance_Number = Provenance[2]

    if (Provenance_Number == 1) {
        Provenance = 'Thebes'
    }
    else if (Provenance_Number == 2) {
        Provenance = 'Lahun'
    }
    else if (Provenance_Number == 3) {
        Provenance = 'Hatnub'
    }
    else if (Provenance_Number == 4) {
        Provenance = 'Unknown'
    }
    else {
        Provenance = 'Unknown'
    };

    //Text
    var text = split2.split('_');
    text_png = text[3] // printed looks like '4.png'
    text_png = text_png.split('.')
    text_number = text_png[0] // printed looks like '4'

    if (text_number == 1) {
        text = 'Shipwrecked Sailor'
    }
    else if (text_number == 2) {
        text = 'Eloquent Peasant B1'
    }
    else if (text_number == 3) {
        text = 'Eloquent Peasant R'
    }
    else if (text_number == 4) {
        text = 'Sinuhe B'
    }
    else if (text_number == 5) {
        text = 'Sinuhe R'
    }
    else if (text_number == 6) {
        text = 'Papyrus Prisse'
    }
    else if (text_number == 7) {
        text = 'Hymn to Senwosret III'
    }
    else if (text_number == 8) {
        text = 'Lahun Temple Files'
    }
    else if (text_number == 9) {
        text = 'Will of Wah'
    }
    else if (text_number == 10) {
        text = 'Texte aus Hatnub'
    }
    else if (text_number == 11) {
        text = 'Papyrus Ebers'
    }
    else if (text_number == 12) {
        text = 'Rhind Papyrus'
    }
    else if (text_number == 13) {
        text = 'Papyrus Westcar'
    }
    else {
        text = 'Unknown'
    };

    // infer time period from text 

    var Time_Period_number = text_number

    if (Time_Period_number == '1' || Time_Period_number == '2' || Time_Period_number == '3' || Time_Period_number == '6' || Time_Period_number == '7' || Time_Period_number == '12' || Time_Period_number == '13') {
        Time_Period = 'Middle Kingdom'
    }
    else if (Time_Period_number == '4' || Time_Period_number == '5' || Time_Period_number == '11') {
        Time_Period = 'New Kingdom'
    }
    else if (Time_Period_number == '10') {
        Time_Period = 'Old Kingdom'
    }
    else {
        Time_Period = 'Unknown'
    }

    // Image hash


    // infer Author from text
    //no orignal authors were found

    // push information into Object 
    var object =

    {
        Facsimile_Maker: Facsimile_Maker,
        Text_Name: text,
        Time_Period: Time_Period,
        Provenance: Provenance,
        Signs: [{
            id:id,
            Gardiner_Sign: Gardiner_Sign,
            Instance_In_Facsimile: Instance_In_Facsimile,
            Image_Name: Image_Name,
            Image_Path_Relative: Relative_Image_Path,
            xy_coordinates: xy
        }]


    }
    sign_info = {
        id:id,
        Gardiner_Sign: Gardiner_Sign,
        Instance_In_Facsimile: Instance_In_Facsimile,
        Image_Name: Image_Name,
        Image_Path_Relative: Relative_Image_Path,
        xy_coordinates: xy
    }


    if (data.length == 0) {
        data.push(object)
    }

    else {
        counter = 0
        for (i = 0; i < data.length; i++) {

            if (data[i].Facsimile_Maker == Facsimile_Maker && data[i].Text_Name == text) {
                signs = data[i].Signs
                signs.push(sign_info)
                counter++
            }
        }
        if (counter == 0) {
            data.push(object)

        }
    }





    json = JSON.stringify(data, null, 2);

    fs.writeFileSync("newJSON.json", json, "utf-8");


})









/*
    {
        id: id,
        Image_Name: Image_Name,
        Image_Hash: "1",
        Image_Path_Relative: Relative_Image_Path,
        Gardiner_Sign: Gardiner_Sign,
        Instance_In_Facsimile: Instance_In_Facsimile,
        Facsimile_Maker: Facsimile_Maker,
        Provenance: Provenance,
        Text: [
            {
                Text_Name: text,
                Orignal_Author: "Unknown",
                Time_Period: Time_Period 
            }
        ],
        User_Details: [
            {
                "Username": "Daniel Bernardo",
                "Upload_Date_Time":"27/06/2022"
            }
        ]
    };
    */