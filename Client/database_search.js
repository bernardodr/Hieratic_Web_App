window.onload = function() {
    var reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        searchGlyphs();
    }
}

function reloadP() {
    sessionStorage.setItem("reloading", "true");
    document.location.reload();
}

async function searchGlyphs() {

    data = {
        gardiner: document.getElementById('Gardiner_search').value.toUpperCase(),
        facsimile: document.getElementById('Facsimile_search').value,
        text: document.getElementById('Text_search').value,
    }


    options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    const res = await fetch('/search', options)
    const jsonData = await res.json()
    //assigns an html image tag value to image path relative to dynamically print images in table
    for (x=0; x <jsonData.length;x++) {
    jsonData[x].Image_Path_Relative=`<img width="200" height="200" src="data:image/png;base64, ${jsonData[x].Image_Path_Relative}" />`
    
    }
    tableFromJson(jsonData)


}

function deleteGlyph(){
    //retrieves ID of glyph to be deleted
    data={
        id:document.getElementById('id_to_delete').value
    }
    
    options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    fetch('/delete_sign_object', options)

    searchGlyphs()
}


function tableFromJson(jsonData) {
    // the json data. (you can change the values for output.)
    

    // Extract value from table header. 
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < jsonData.length; i++) {
        for (var key in jsonData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // Create a table.
    var table = document.createElement("table");

    // Create table header row using the extracted headers above.

    // Table Rows
    var tr = table.insertRow(-1);   
    
    
    //Table Headers
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // add json data to the table as rows.
    for (var i = 0; i < jsonData.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jsonData[i][col[j]];
        }
    }

    // Now, add the newly created table with json data, to a container.
    var divShowData = document.getElementById('showData');
    divShowData.innerHTML = "";
    divShowData.appendChild(table);

    
    
    
   
}

