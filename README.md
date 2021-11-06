# Register Slimme Apparaten

This application shows all registered smart devices on a map of Amsterdam. If zoomed out, they are clustered together. To see the individual smart devices, zoom in or click on a cluster. The smart devices are divided in several categories and types, depending on the kind of data that they collect. Users can also fill out a form to contact the owner of a smart device to ask questions about the data.

This application reads from this backend: https://github.com/amsterdam/iot-api

## Requirements

- node v14
- npm

## Installations

- npm install

## Development

- To run the frontend: `npm start`
- Your standard browser will then open a new tab at [http://localhost:3002/](http://localhost:3002/)
- By default the frontend uses the API hosted at [https://acc.api.data.amsterdam.nl/iothings/](https://acc.api.data.amsterdam.nl/iothings/)
- To change it, modify the apiDomainName and/or API_ROOT in shared/configuration/environment

## Testing with the iot-api backend running on localhost

Change the `API_ROOT` and `ROOT` in `environment.conf.json` to:

"API_ROOT": "http://localhost:8080/",
"ROOT": "http://localhost:3001/",

Make sure to run the iot-api backend on port 8080

## Testing

- npm test
- A minimum test coverage is defined under coverageThreshold in package.json

## React boilerplate Documentation

This application is build using React boilerplate, for more documentation:

- [**The Hitchhikers Guide to `react-boilerplate`**](docs/general/introduction.md): An introduction for newcomers to this boilerplate.
- [Overview](docs/general): A short overview of the included tools
- [**Commands**](docs/general/commands.md): Getting the most out of this boilerplate
- [Testing](docs/testing): How to work with the built-in test harness
- [Styling](docs/css): How to work with the CSS tooling
- [Your app](docs/js): Supercharging your app with Routing, Redux, simple
  asynchronicity helpers, etc.

* [**Troubleshooting**](docs/general/gotchas.md): Solutions to common problems faced by developers.

### Modifications on React boilerplate

- The tunnel feature allowing access to your development setup from anywhere in the world no longer works.
  The `ngrok` package is no longer in the list of dependencies because it would not build on the build server.
