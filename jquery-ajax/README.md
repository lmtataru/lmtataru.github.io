We have the following endpoint: http://api.icndb.com/jokes/random

He returns a joke to us randomly every time we make the call.

The structure of this is like the following JSON (we are interested in the "joke" field):

{

"type": "success",

"value": {
 
    "id": 19,
    
    "joke": "In an average living room there are 1,242 objects Chuck Norris could use to kill you, including the room itself.",
    
    "categories": []
    
  }
  
}

Create a web page with a space to put the joke and a button that, using an AJAX call, shows a new joke every time we click on the button.
