/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

angular.module('TractNotes')
    .constant('apiKey', null)
    .constant('applicationId', '')
    .constant('loadApis', {
        'drive': 'v2'
    })
/**
 * @memberof TractNotes
 * @ngdoc factory
 * @name googleApi
 * @desc Adapter for exposing gapi as an angular service. This registers a promise that will resolve to gapi after all the APIs have been loaded.
 */
.factory('googleApi', ['$rootScope', '$window', '$q', 'apiKey', 'loadApis', '$ionicPlatform',
    function($rootScope, $window, $q, apiKey, loadApis, $ionicPlatform) {

        var googleApi = $q.defer();

        var init_gapi = function() {
            $ionicPlatform.ready(function() {
                ///$rootScope.$apply(function() {
                // gapi.load('picker');
                var apis = [];
                if (apiKey) {
                    $window.gapi.client.setApiKey(apiKey);
                }
                angular.forEach(loadApis, function(value, key) {
                    apis.push($q.when(gapi.client.load(key, value)));
                });
                $q.all(apis).then(function() {
                    googleApi.resolve($window.gapi);
                });
            });
        };
        init_gapi();

        return googleApi.promise;
    }
])

    /**
     * @memberof TractNotes
     * @ngdoc service
     * @name Drive
     * @desc The Drive service handles Google Drive authentication, querying and uploading. 
     */
    .service('Drive', ['$q', '$cacheFactory', 'googleApi', 'applicationId', '$cordovaOauthUtility',
        function($q, $cacheFactory, googleApi, applicationId, $cordovaOauthUtility) {

            /**
             * @memberof Drive
             * @name DEFAULT_FIELDS
             * @member {string}
             * @desc Only fetch relevant fields listed.
             */
            var DEFAULT_FIELDS = 'id,title,mimeType,userPermission,editable,copyable,shared,fileSize';

            /**
             * @memberof Drive
             * @name cache
             * @member {$cacheFactory}
             */
            var cache = $cacheFactory('files');

            /**
             * @memberof Drive
             * @name fileList
             * @member {list}
             * @desc list of files with chosen type shown in drive.html
             */
            var fileList = [];

            /**
             * @memberof Drive
             * @name id_token
             * @member {string}
             * @desc stores the oauth id_token after authentication
             */
            var id_token;

            /**
             * Set fileList
             * @memberof Drive
             * @method setFileList
             * @param {list} list
             */
            this.setFileList = function(list) {
                fileList = list;
            };

            /**
             * Get FileList
             * @memberof Drive
             * @method getFileList
             * @returns {list} fileList
             */
            this.getFileList = function() {
                return fileList;
            };

            /**
             * Get id_token for currently authenticated user.
             * @memberof Drive
             * @method getID
             * @returns {string} id_token
             */
            this.getID = function() {
                return id_token;
            };

            /**
             * Combines metadata & content into a single object & caches the result
             *
             * @param {Object} metadata File metadata
             * @param {String} content File content
             * @method combineAndStoreResults
             * @return {Object} combined object
             */
            var combineAndStoreResults = function(metadata, content) {
                var file = {
                    metadata: metadata,
                    content: content
                };
                cache.put(metadata.id, file);
                return file;
            };

            /**
             * Sign into the Google service
             * @method authenticate
             * @return {Promise} promise that resolves on completion
             */
            this.authenticate = function() {
                var clientId = "775512295394-hhg8etqdcmoc8i7r5a6m9d42d4ebu63d.apps.googleusercontent.com";
                var appScope = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/userinfo.email'];
                var options = {redirect_uri: 'http://localhost/callback/'}

                var deferred = $q.defer();
                if (window.cordova) {
                    var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                    /*
                     *following if statement does not permit drive authentication. isInAppBrowerInstalled from ngCordova
                     *returns false despite plugin being installed (known bug with cordova 6.0).
                     */
                    // if ($cordovaOauthUtility.isInAppBrowserInstalled(cordovaMetadata) === true) {
                    var redirect_uri = "http://localhost/callback";
                    if (options !== undefined) {
                        if (options.hasOwnProperty("redirect_uri")) {
                            redirect_uri = options.redirect_uri;
                        }
                    }
                    var url = 'https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=' + redirect_uri + '&scope=' + appScope.join(" ") + '&approval_prompt=force&response_type=id_token token';
                    var browserRef = window.open(url, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                    browserRef.addEventListener("loadstart", function(event) {
                        if ((event.url).indexOf(redirect_uri) === 0) {
                            browserRef.removeEventListener("exit", function(event) {});
                            browserRef.close();
                            var callbackResponse = (event.url).split("#")[1];
                            var responseParameters = (callbackResponse).split("&");
                            var parameterMap = [];
                            for (var i = 0; i < responseParameters.length; i++) {
                                parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                            }
                            if (parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
                                id_token = parameterMap.id_token;
                                deferred.resolve(parameterMap);
                                //deferred.resolve({ state : parameterMap.state,error : parameterMap.error, access_token: parameterMap.access_token, token_type: parameterMap.token_type, expires_in: parameterMap.expires_in });
                            } else {
                                deferred.reject("Problem authenticating");
                            }
                        }
                    });
                    browserRef.addEventListener('exit', function(event) {
                        deferred.reject("The sign in flow was canceled");
                    });
                    // } else {
                    //   deferred.reject("Could not find InAppBrowser plugin");
                    // }
                } else {
                    deferred.reject("Cannot authenticate via a web browser");
                }

                return deferred.promise;
            };

            /**
             * Open form in inAppBrowser.
             * @memberof Drive
             * @method openForm
             * @param {file} file
             */
            this.openForm = function(file) {
                var url = file.url;
                var browserRef = window.open(url, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
            };

            /**
             * Print files.
             * @memberof Drive
             * @method readFiles
             * @return {Promise} promise that resolves on completion
             */
            this.readFiles = function() {
                var deffer = $q.defer();
                var request = gapi.client.drive.files.list({
                    // 'maxResults': 20
                });

                request.execute(function(resp) {
                    var files = resp.items;
                    var read_files = [];
                    if (files && files.length > 0) {
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            read_files.push({
                                name: file.title,
                                id: file.id
                            });
                        }
                        deffer.resolve(read_files);
                    } else {
                        deffer.reject("No files found");
                        //appendPre('No files found.');
                        console.log("No files found");
                    }
                });
                return deffer.promise;
            };

            /**
             * Get all GPX and KML files from user's Drive.
             * @memberof Drive
             * @method readGPXAndKML
             * @return {Promise} promise that resolves to an object containing a list of files.
             */
            this.readGPXAndKML = function(fileName) {
                var deffer = $q.defer();
                var request;
                if(fileName) {
                    var query = "title contains '" + fileName + "'";
                    console.log(query);
                    request = gapi.client.drive.files.list({
                        q: query
                    });
                }
                else {
                    request = gapi.client.drive.files.list({
                        q: "fileExtension='gpx' or fileExtension='kml'"
                    });
                }


                request.execute(function(resp) {
                    var files = resp.items;
                    var read_files = [];
                    if (files && files.length > 0) {
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            read_files.push({
                                name: file.title,
                                id: file.id,
                                url: file.webContentLink,
                                mimeType: file.mimeType,
                                isDirectory: file.mimeType == "application/vnd.google-apps.folder"
                            });
                        }
                        deffer.resolve(read_files);
                    } else {
                        deffer.reject("No files found");
                        //appendPre('No files found.');
                        console.log("No files found");
                    }
                });
                return deffer.promise;
            };

            /**
             * Get children of folder.
             * @memberof Drive
             * @method readGPXAndKML
             * @return {Promise} promise that resolves to an object containing the folder's children
             */
            this.getChildren = function(folder) {
                var deffer = $q.defer();
                var query = "'" + folder.id + "' in parents";
                var request= gapi.client.drive.files.list({
                        q: query
                    });

                request.execute(function(resp) {
                    var files = resp.items;
                    var read_files = [];
                    if (files && files.length > 0) {
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            read_files.push({
                                name: file.title,
                                id: file.id,
                                url: file.webContentLink,
                                mimeType: file.mimeType,
                                isDirectory: file.mimeType == "application/vnd.google-apps.folder"
                            });
                        }
                        deffer.resolve(read_files);
                    } else {
                        deffer.reject("No files found");
                        //appendPre('No files found.');
                        console.log("No files found");
                    }
                });
                return deffer.promise;
            };

            /**
             * Get list of forms.
             * @memberof Drive
             * @method readForms
             * @return {Promise} promise that resolves to an object containing a list of forms.
             */
            this.readForms = function() {
                var deffer = $q.defer();
                var request = gapi.client.drive.files.list({
                    q: "mimeType='application/vnd.google-apps.form'"
                });
                request.execute(function(resp) {
                    var files = resp.items;
                    var read_files = [];
                    if (files && files.length > 0) {
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            read_files.push({
                                name: file.title,
                                id: file.id,
                                url: file.alternateLink
                            });
                        }
                        deffer.resolve(read_files);
                    } else {
                        deffer.reject("No files found");
                        //appendPre('No files found.');
                        console.log("No files found");
                    }
                });
                return deffer.promise;
            };

            /**
             * Get list of images.
             * @memberof Drive
             * @method readImages
             * @return {Promise} promise that resolves to an object containing a list of images.
             */
            this.readImages = function() {
                var deffer = $q.defer();
                var request = gapi.client.drive.files.list({
                    q: "mimeType contains 'image/'"
                });
                request.execute(function(resp) {
                    var files = resp.items;
                    var read_files = [];
                    if (files && files.length > 0) {
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            read_files.push({
                                name: file.title,
                                id: file.id,
                                url: file.webContentLink
                            });
                        }
                        deffer.resolve(read_files);
                    } else {
                        deffer.reject("No files found");
                        //appendPre('No files found.');
                        console.log("No files found");
                    }
                });
                return deffer.promise;
            };

             /**
              * Load a file from Drive. Fetches both the metadata & content in parallel.
              * @memberof Drive
              * @method loadFile
              * @param {String} fileID ID of the file to load
              * @return {Promise} promise that resolves to an object containing the file metadata & content.
              */
            this.loadFile = function(fileId) {
                var file = cache.get(fileId);
                if (file) {
                    return $q.when(file);
                }
                return googleApi.then(function(gapi) {
                    var metadataRequest = gapi.client.drive.files.get({
                        fileId: fileId,
                        fields: DEFAULT_FIELDS
                    });
                    var contentRequest = gapi.client.drive.files.get({
                        fileId: fileId,
                        alt: 'media'
                    });
                    return $q.all([$q.when(metadataRequest), $q.when(contentRequest)]);
                }).then(function(responses) {
                    return combineAndStoreResults(responses[0].result, responses[1].body);
                });
            };

            /**
             * Delete a file from Drive. Permanently deletes a file by ID. Skips the trash. The currently authenticated user must own the file.
             * @memberof Drive
             * @method deleteFile
             * @param {String} fileID ID of the file to delete
             * @return {Promise} promise that resolves to an object containing the file metadata & content
             */
            this.deleteFile = function(fileId) {
                var deffer = $q.defer();

                googleApi.then(function(gapi) {
                    var deleteRequest = gapi.client.drive.files.delete({
                        fileId: fileId
                    });
                    deleteRequest.execute(function(success) {
                        deffer.resolve(success);
                    }, function(error) {
                        deffer.reject("File delete error: " + JSON.stringify(error));
                    });
                });
                return deffer.promise;
            };

            /**
             * Save a file to Drive using the multipart upload protocol.
             * @memberof Drive
             * @method saveFile
             * @param {Object} metadata File metadata to save
             * @param {String} content File content
             * @return {Promise} promise that resolves to an object containing the current file metadata & content
             */
            this.saveFile = function(metadata, content) {
                return googleApi.then(function(gapi) {
                    var path;
                    var method;

                    if (metadata.id) {
                        path = '/upload/drive/v2/files/' + encodeURIComponent(metadata.id);
                        method = 'PUT';
                    } else {
                        path = '/upload/drive/v2/files';
                        method = 'POST';
                    }

                    var multipart = new MultiPartBuilder()
                        .append('application/json', JSON.stringify(metadata))
                        .append(metadata.mimeType, content)
                        .finish();

                    var uploadRequest = gapi.client.request({
                        path: path,
                        method: method,
                        params: {
                            uploadType: 'multipart',
                            fields: DEFAULT_FIELDS
                        },
                        headers: {
                            'Content-Type': multipart.type
                        },
                        body: multipart.body
                    });
                    return $q.when(uploadRequest);
                }).then(function(response) {
                    return combineAndStoreResults(response.result, content);
                });
            };

            /**
             * Create a new folder for the given track in the TractNotes folder
             * @memberof Drive
             * @method trackFolder
             * @param {string} folderName
             * @param {string} tractNotesID
             * @return {Promise} promise that resolves the Track folder's id
             */
            this.trackFolder = function(folderName, tractNotesID) {
                var deffer = $q.defer();

                googleApi.then(function(gapi) {
                    var uploadRequest = gapi.client.request({
                        'path': '/drive/v2/files/',
                        'method': 'POST',
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                        'body':{
                            "title" : folderName,
                            "mimeType" : "application/vnd.google-apps.folder",
                            "parents":[{"id":tractNotesID}]
                        }
                    });
                    uploadRequest.execute(function(resp) {
                        console.log("id: " + resp.id);
                        deffer.resolve(resp.id);
                    });
                });
                return deffer.promise;
            };

            /**
             * Create a TractNotes folder if it does not exist.
             * @memberof Drive
             * @method trackNotesFolder
             * @return {Promise} promise that resolves the TractNotes folder's id
             */
            this.tractNotesFolder = function() {
                var deffer = $q.defer();

                googleApi.then(function(gapi) {
                    var request = gapi.client.drive.files.list({
                        q: "title='TractNotes' and mimeType='application/vnd.google-apps.folder'"
                    });

                    request.execute(function(resp) {
                        var files = resp.items;
                        if (files && files.length > 0) {
                            //if a match is found, just pick first one. should change.
                            console.log("TractNotes folder found");
                            deffer.resolve(files[0].id);
                        } else {
                            //otherwise create TractNotes folder
                            var uploadRequest = gapi.client.request({
                                'path': '/drive/v2/files/',
                                'method': 'POST',
                                'headers': {
                                    'Content-Type': 'application/json'
                                },
                                'body':{
                                    "title" : "TractNotes",
                                    "mimeType" : "application/vnd.google-apps.folder",
                                }
                            });
                            uploadRequest.execute(function(resp) {
                                console.log("TractNotes folder created");
                                deffer.resolve(resp.id);
                            });
                        }
                    });
                });
                return deffer.promise;
            };

            /* (unused)
             * Displays the Drive file picker configured for selecting text files
             *
             * @return {Promise} Promise that resolves with the ID of the selected file
             */
            this.showPicker = function() {
                return googleApi.then(function(gapi) {
                    var deferred = $q.defer();
                    var view = new google.picker.View(google.picker.ViewId.DOCS);
                    view.setMimeTypes('text/plain');
                    var picker = new google.picker.PickerBuilder()
                        .setAppId(applicationId)
                        .setOAuthToken(gapi.auth.getToken().access_token)
                        .addView(view)
                        .setCallback(function(data) {
                            if (data.action == 'picked') {
                                var id = data.docs[0].id;
                                deferred.resolve(id);
                            } else if (data.action == 'cancel') {
                                deferred.reject();
                            }
                        })
                        .build();
                    picker.setVisible(true);
                    return deferred.promise;
                });
            };

            /* (unused)
             * Displays the Drive sharing dialog
             *
             * @param {String} id ID of the file to share
             */
            this.showSharing = function(id) {
                return googleApi.then(function(gapi) {
                    //var deferred = $q.defer();
                    var share = new gapi.drive.share.ShareClient(applicationId);
                    share.setItemIds([id]);
                    share.showSettingsDialog();
                    //return deferred.promise;
                });
            };

        }
    ]);