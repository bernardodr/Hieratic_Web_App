const fs = require("fs");
const { finished } = require("stream");
let JSON_FILE = fs.readFileSync("TEST.json","utf-8");
let tabinDataset = JSON.parse(JSON_FILE)
let usersjson = fs.readFileSync("TEST.json","utf-8");
let users = JSON.parse(usersjson);
//console.log(tabinDataset)

///////////////////////////////////////////
////////// Counter Files for IDm //////////
///////////////////////////////////////////

let count = 0

//////////////////////////////////////////
////////// Get Every Image Name //////////
//////////////////////////////////////////

fs.readdirSync("/Users/danielbernardo/Desktop/Dissteration Code/Hieratic_Web_App/database/Thesis Dataset Whole/").forEach(file => {
    
    ////////////////////////////////////////////////
    ////////// Dynamically get Image data //////////
    ////////////////////////////////////////////////
    
    //Counter
    count++

    // id to ensure no duplicates
    var id = count;

    //Image name
    var Image_Name = file;

    // Absolute Image Path
    var Absolute_Image_Path = "/Users/danielbernardo/Desktop/Dissteration Code/Hieratic_Web_App/database/Thesis Dataset Whole/" + file.toString()
    
    // Relative Image Path
    var Relative_Image_Path ="database/Thesis Dataset Whole/" + file.toString();
    
    //Gardiner Sign
    var Gardiner_Sign = file.split('_')[0]

    //Instance in Facsimile
    
    var Instance_In_Facsimile = file.split('_');
    Instance_In_Facsimile = Instance_In_Facsimile[1]
    
    //Facsimile Maker
    
    var Facsimile_Maker = file.split('_');
    Facsimile_Maker_Number = Facsimile_Maker[2]

    if(Facsimile_Maker_Number == 1){
        Facsimile_Maker = 'Möller'
    }
    else if (Facsimile_Maker_Number == 2){
        Facsimile_Maker = 'Poe'
    }
    else if (Facsimile_Maker_Number == 3){
        Facsimile_Maker = 'Tabin'
    }
    else{
        Facsimile_Maker = 'Unknown'
    };


    //Provenance
    var Provenance = file.split('_');
    Provenance_Number = Provenance[3]

    if(Provenance_Number == 1){
        Provenance = 'Thebes'
    }
    else if (Provenance_Number == 2){
        Provenance = 'Lahun'
    }
    else if (Provenance_Number == 3){
        Provenance = 'Hatnub'
    }
    else if (Provenance_Number == 4){
        Provenance = 'Unknown'
    }
    else{
        Provenance = 'Unknown'
    };

    //Text
    var text = file.split('_');
    text_png = text[4] // printed looks like 4.png
    text_png = text_png.split('.')
    text_number = text_png[0] // printed looks like 4

    if(text_number == 1){
        text = 'Shipwrecked Sailor'
    }
    else if (text_number == 2){
        text = 'Eloquent Peasant B1'
    }
    else if (text_number == 3){
        text = 'Eloquent Peasant R'
    }
    else if (text_number == 4){
        text = 'Sinuhe B'
    }
    else if (text_number == 5){
        text = 'Sinuhe R'
    }
    else if (text_number == 6){
        text = 'Papyrus Prisse'
    }
    else if (text_number == 7){
        text = 'Hymn to Senwosret III'
    }
    else if (text_number == 8){
        text = 'Lahun Temple Files'
    }
    else if (text_number == 9){
        text = 'Will of Wah'
    }
    else if (text_number == 10){
        text = 'Texte aus Hatnub'
    }
    else if (text_number == 11){
        text = 'Papyrus Ebers'
    }
    else if (text_number == 12){
        text = 'Rhind Papyrus'
    }
    else if (text_number == 13){
        text = 'Papyrus Westcar'
    }
    else{
        text = 'Unknown'
    };

    // infer time period from text 

    var Time_Period_number = text_number

    if(Time_Period_number == '1' || Time_Period_number == '2' || Time_Period_number == '3' || Time_Period_number == '6'|| Time_Period_number == '7' || Time_Period_number == '12' || Time_Period_number == '13'){
        Time_Period = 'Middle Kingdom'
    }
    else if(Time_Period_number == '4' || Time_Period_number == '5' || Time_Period_number == '11' ){
        Time_Period = 'New Kingdom'
    }
    else if(Time_Period_number == '10'){
        Time_Period = 'Old Kingdom'
    }
    else{
        Time_Period = 'Unknown'
    }


    // infer Author from text



    // push information into Object 
    var object = 
    
    {
        id: id,
        Image_Name: Image_Name,
        Image_Path_Absolute: Absolute_Image_Path,
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
    //console.log(object)

    // push Objects into Json file

    users.push(object);

    usersjson = JSON.stringify(users, null, 2);
    
    fs.writeFileSync("TEST.json",usersjson,"utf-8");

    // var data = JSON.stringify(object, null, 2);

    // fs.appendFile('Test.json', data, finished);
    // function finished(err){
    //     console.log('Loading')
    // }
    

   
})













