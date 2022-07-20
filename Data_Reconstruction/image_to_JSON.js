/////////////////////
////// WARNING //////
/////////////////////

// Please delete .DS store before running if you are on a mac, command for this can be seen below
// Open a terminal in the folder where Thesis_Dataset_Whole is stored and input the command below
// find . -name '.DS_Store' -type f -delete


const fs = require("fs");
const { exit } = require("process");
const { finished } = require("stream");

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
    var Relative_Image_Path = "server/database/Thesis_Dataset_Whole/" + file.toString();

    //Gardiner Sign
    var split1 = file.split('_0')
    var Gardiner_Sign = split1[0]
    var split2 = split1[1]
    
    //Instance in Facsimile - split2 enables separation of gardiner sign from instance 

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
    text_png = text[3] 
    text_png = text_png.split('.')
    text_number = text_png[0] 

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

    //if data object is empty, push entire object
    if (data.length == 0) {
        data.push(object)
    }

    else {
        counter = 0
        //iterates through data to check whether fac maker and text name already exists. 
        for (i = 0; i < data.length; i++) {

            if (data[i].Facsimile_Maker == Facsimile_Maker && data[i].Text_Name == text) {
               //pushes sign info in correct place
                signs = data[i].Signs
                signs.push(sign_info)
                counter++
            }
        }
        //if fac maker and text name not found in data object (counter = 0), push entire object
        if (counter == 0) {
            data.push(object)

        }
    }





    json = JSON.stringify(data, null, 2);

    fs.writeFileSync("newJSON.json", json, "utf-8");


})







