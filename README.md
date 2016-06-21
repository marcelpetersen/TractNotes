# TractNotes
A land trust property monitoring mobile application.

2015-2016 Senior Design project at the University of Connecticut sponsored by David Dickson of the UConn Extension program and advised by Professor Chun-Hsi Huang.

## The Team

- Steven Demurjian Jr.

- William Stewart III

- Andrew Schaffer

## Motivation

There are 137 land trust organizations in Connecticut whose mission is to preserve open space properties and easements. The annual monitoring of these properties has typically been done on paper, but recently land trusts have been expressing a strong interest in digitizing the process. Volunteers require the ability to create and verify property boundaries, record data in a webform, and save all data associated with a monitoring session to the cloud. Until now, this process would necessitate the use of multiple applications. TractNotes integrates resources from disparate applications and presents a simple, responsive map-based interface designed to simplify this process.

## Technologies

TractNotes is a cross-platform Android/iOS application created with the Ionic mobile development framework, AngularJS, and Mapbox.js. The application also utilizes various ngCordova and Leaflet.js plugins, the full list of which can be found in the [wiki references page](https://github.com/water42/TractNotes/wiki/References).

## Development Environment

The development environment for this project consists of the Node.js runtime environment, Ionic, JSHint, and Sublime Text. The Ionic cli was used to build and test the application in browser and run the application on mobile devices. JSHint was used with an AngularJS [options file](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y230). 

We used Sublime Text with [snippets for AngularJS](https://github.com/johnpapa/angular-styleguide#file-templates-and-snippets), [JSBeautify](https://github.com/enginespot/js-beautify-sublime), and [DocBlockr](https://github.com/spadgos/sublime-jsdocs) to standarize code between team members.

The application architecture was designed using the model-view-controller (MVC) pattern following the suggestions of the [Angular 1 Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md). 

## Features
###### Map View
<img src="https://i.imgur.com/5KTWLXr.png" width="200"> <img src="https://i.imgur.com/UFOO3Qv.png" width="200"> <img src="https://i.imgur.com/9iXcIon.jpg" width="200">

This is the application’s home page. The view consists of a side menu for navigation and a customizable web map centered on the user’s initial GPS location. The basemap can be toggled between streets and satellite maps using the layer control in the top right of the map. Additionally, as users create tracks or add more overlays, the layers are added to corresponding groups in the layer control.

###### Track Creation
<img src="https://i.imgur.com/na8yINn.jpg" width="200"> <img src="https://i.imgur.com/pmKpZ47.png" width="200">  <img src="http://i.imgur.com/7UCW1Q9.png" width="200">

Pressing the record button begins creation of a track based on the change in the user’s current GPS location. The user can create waypoints on the track at any point during during the recording session. Pressing a waypoint allows the user to associate images, video, or audio from their device, Drive, or the web with the point. Later, when the track is exported this information becomes available in GPX or KML files. The user can pause or stop the track at any time. Saved tracks are available in the Tracks view.

###### Forms View
<img src="https://i.imgur.com/yZCT1xV.png" width="200"> <img src="https://i.imgur.com/kodAxsv.png" width="200">  <img src="https://i.imgur.com/Kg6Wp21.png" width="200">

Once the user authenticates their Google Drive account, they can search for and select a form to use to record various types of property data during a property monitoring session. Once a form is selected, it is embedded as a web view on the mobile device and the user can return back to it at any time.

###### Tracks View
 <img src="https://i.imgur.com/Iv1ybSv.jpg" width="200"> <img src="https://i.imgur.com/IOLR3ta.jpg" width="200"> <img src="https://i.imgur.com/M2zgHmz.jpg" width="200">
 
 In this view users can import new tracks to the map or manage current tracks. When importing a new track, the user can import GPX or KML files from their device, Drive, or the web. The imported layers are displayed on the map, added to the list of current tracks, and saved to persistent storage on the device. Users can also edit, delete, or export imported or created tracks to Google Drive.

###### Layers View
 <img src="https://i.imgur.com/8Hy59TU.jpg" width="200"> <img src="https://i.imgur.com/bOWkN0G.png" width="200"> <img src="https://i.imgur.com/whlH87C.png" width="200">

This view manages and applies web map services from the Connecticut Environmental Conditions Online website, as well as from the Leaflet Providers extension. These layers can be toggled onto the base map to give data like topology and erosion susceptibility. Other layers that are not provided can be added from a URL. Finally, users can see and edit a list of all layers and their details in this view.

## Documentation

@TODO - This will soon be available in the wiki.

## License

@TODO
