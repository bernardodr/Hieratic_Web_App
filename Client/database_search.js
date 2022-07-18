async function searchGlyphs() {

    data = {
        gardiner: document.getElementById('Gardiner_search').value,
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
    console.log(jsonData)
    
    
    

}