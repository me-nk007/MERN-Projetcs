console.log('We are going to make a postman clone');
// Note : Jquery is important to learn, you should learn it.

// Utility Functions :
// 1) Utiltiy function to create DOM Element from string
function getElementFromString(str) {
    let div = document.createElement('div');
    div.innerHTML = str;
    return div.firstElementChild;
}


// Initialize number of paramters
let addParamsCount = 0;


// Hiding the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = "none";

// If the user clicks on Custom Parameters then hide the JSON box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';           // "none" hides the element
    document.getElementById('parametersBox').style.display = 'block';           // "block" shows the element
})

// If the user clicks on JSON then hide the Custom Parameters box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})


// If the user clicks on + button, add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let str = `  <div class="form-row my-2">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${addParamsCount + 2} : </label>
                <div class=" col-md-4">
                <input type="text" class="form-control" id="parameterKey${addParamsCount + 2}" placeholder="Enter Parameter ${addParamsCount + 2} Key">
                </div>
                <div class=" col-md-4">
                <!-- <label for="inputPassword4">Password</label> -->
                <input type="text" class="form-control" id="parameterValue${addParamsCount + 2}" placeholder="Enter Parameter ${addParamsCount + 2} Value">
                </div>
                <button class="btn btn-primary deleteParam" > - </button>
                </div>`;
    // Convert the Element str to DOM node.
    let paramElement = getElementFromString(str);
    // console.log(paramElement);
    params.appendChild(paramElement);

    // Adding an eventListener  for Deleting the element when minus(-) is clicked
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // alert(("Are you sure want to delete")? e.target.parentElement.remove() : "" )
            // confirm(("Are you sure want to delete ") ? e.target.parentElement.remove() : "")
            if (confirm("Are you sure ?")) {
                e.target.parentElement.remove()
            }
            else {
                console.log('Deleting terminated');

            }
        })
    }
    addParamsCount++;
})


// If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the reponse box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please Wait... Fetching Response !!!"
    document.getElementById('responsePrism').innerHTML  = "Please Wait... Fetching Response !!!"

    // Fetch all the value user has intered;
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name = 'contentType']:checked").value;

    

    // If user has used params option instead of json, collect all the parameters and put them in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the values in the console for debugging
    console.log('URL is ', url);
    console.log('requestType is ', requestType);
    console.log('contentType is ', contentType);
    console.log('data is ', data);

    // Fetch API invoke
    // If the requestType is GET, invoke a fetch api to create a post request
    if (requestType == 'GET'){
        fetch (url,{
            method : 'GET',
        })
        .then(response => response.text())
        .then((text) => {
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();

        })
    }

    else{
        fetch (url,{
            method : 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response => response.text())
        .then((text) => {
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        })
    }


})


    


