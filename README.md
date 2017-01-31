# farmers-market-app
Where are the closest farmers' markets?!?!?


## Team
* Product Owner: Rishi Shah
* Scrum Master: Nino Rekhviashvili
* Development Team Members: Nino Rekhviashvili, Rishi Shah, Tony Xu


## Table of Contents
1. Usage
2. Requirements
3. Development
  * installing dependencies
4. Roadmap
5. Contributing
6. Notes
7. License


## Usage
Welcome to [City Sprouts](http://citysprouts.herokuapp.com)! A website where you can enter an address and a radius and it will give you the location to all the farmer's markets and the products and schedule provided at that market in the area!


## Requirements
* Node 6.x.x
* MongoDB 3.x
  * mlabs account (free tier)
* google developers console
  * google maps API
  * google autocomplete


## Development
Create `API_KEYS.js` file with `google API key` and `mongoURI`.

### Installing Dependencies
```
$ npm install
$ gulp start
```

## Roadmap

### Features
- Improved product filtering functionality
  * Better visualization
- Filter by schedule
- Calendar view of farmers markets schedules from search results
- Google Maps Marker Features
  * Label markers with corresponding result index
  * Ability to select results from list and highlight associated marker on map
  * Improved autocentering and zooming functionality
    * When a new set of results is populated the map should auto center and zoom as closely in on the results as possible
-

### Performance
- Improved autocomplete reliability
- Move product category parsing to the server side

### Data
- Update data using more recent 2016 government data
- Increase database size to include farmers markets from other major cities
  * Examples
    * Los Angeles
    * Portland
    * Chicago
    * Boston
    * San Francisco
    * Washington D.C.
    * etc.

## Contributing
View the [contribution document](./CONTRIBUTING.md)


## Notes
If you would like to create your own mongoDB, please visit the [README](./Database_Data/README.md) in Database_Data directory for instructions on how you can populate your own mongoDB.


## License
[The MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2017 Nino R, Rishi S, Tony X
