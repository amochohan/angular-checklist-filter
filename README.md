# Angular Checklist Filter Directive

Clickable filters will display a dropdown containing a list of checkboxes that can be selected, which can be very useful for building filters.

![The checklist filter menu](https://raw.githubusercontent.com/drawmyattention/angular-checklist-filter/master/screenshot.png "The checklist filter menu")

## Online demo

A basic example which shows how this directive could be used is available via [JSFiddle](http://jsfiddle.net/gh/get/angular/1.1/drawmyattention/angular-checklist-filter/tree/master/demo/). Note: the code 
for the demo is far from optimal because of the limitations of JSFiddle. For a proper demonstration which has production quality code, see the ```example``` directory.

## Installation

Include Angular and the Checklist-filter (checklist-filter.js) in your application.

    <script type="application/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.16/angular.js"></script>
    <script type="application/javascript" src="../src/checklist-filter.js"></script>
    
## Usage

The directive relies on two data arrays.

1) An array of objects containing all options that can be selected.
2) An array of objects containing which of those options have been selected.

## Example - Building the Users checklist

First, define an object called ```users``` on the ```scope```:

   $scope.users = [
       {
           id: 1,
           name: "Amo"
       },
       {
           id: 2,
           name: "Ben"
       },
       {
           id: 3,
           name: "Joe"
       }
       // additional users here, ideally resolved from a service
   ];

Next, define an object which will store which ```users``` (and other filters) have been selected:

    $scope.searchFilter = {
        // Setting an id, will select the corresponding user 
        // selected by default (in this case, Ben).
        users: [2], 
        products: [],
        status: []
    };

Now the directive can be used in your application:

    <checklist
        menu="userList"
        data="searchFilter.users"
        source="users"
        sourcekey="id"
        sourcevalue="name"
        model="user"
        id="userList"
        ></checklist>
        
## Parameters

    menu
    
The name of the menu that is displayed. 

    data
    
The object that tracks which items have been selected.

    source
    
The object that returns all possible options for the checklist.

    sourcekey

The value for the options that is stored in the ```data``` object. Usually an id number, or a uuid.

    sourcevalue
    
The value of the object that will be displayed as a label. In the example of users, the ```sourcevalue``` is
```name``` (so a user is tracked by their ```id``` but their ```name``` is displayed in the application).

    model

The type of object being filtered. In the current example, we're building a list of users, so ```user``` 
is appropriate. This value is used when no options have been selected to output ```any model``` (```any user```).

## Licence

This package is open-sourced software licensed under the MIT license. For support or improvements, please submit 
a pull request or log an issue. Amo Chohan <amo.chohan@gmail.com>