# TractNotes
A land trust property monitoring mobile application: 2015-2016 Senior Design project at the University of Connecticut sponsored by David Dickson of the UConn Extension program and advised by Professor Chun-Hsi Huang.

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
@TODO

## Documentation

###### Application Structure

```
app/
    app.js
    google/
        drive.controller.js
        drive.html
        form.controller.js
        form.html
        gauth.controller.js
        login.html
    layers/
        layer.view.controller.js
        layer.view.html
        layers.controller.js
        layers.html
    map/
        map.controller.js
        map.html
        modal.marker.edit.html
        modal.track.save.html
    menu/
        menu.controller.js
        menu.html
    services/
        control.factory.js
        cteco.data.factory.js
        cteco.view.factory.js
        drawnItems.factory.js
        drive.js
        import.factory.js
        layer.view.factory.js
        layerControl.factory.js
        location.factory.js
        popup.factory.js
        settings.factory.js
        track.factory.js
        track.view.factory.js
        wms.factory.js
    settings/
        settings.controller.js
        settings.html
    tracks/
        track.view.controller.js
        track.view.html
        tracks.controller.js
        tracks.html
    wms/
        cteco.layers.controller.js
        cteco.layers.html
        wms.list.controller.js
        wms.list.html
        wms.url.controller.js
        wms.url.html
```

@TODO - This will soon be available in the wiki.

## License

@TODO
