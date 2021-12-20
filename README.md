# Register Slimme Apparaten

This application shows all registered smart devices on a map of Amsterdam. If zoomed out, they are clustered together. To see the individual smart devices, zoom in or click on a cluster. The smart devices are divided in several categories and types, depending on the kind of data that they collect. Users can also fill out a form to contact the owner of a smart device to ask questions about the data.

This application reads from this backend: https://github.com/amsterdam/iot-api

## Requirements

- node v16
- npm

## Installations

- npm install

## Development

- To run the frontend: `npm start`
- Your standard browser will then open a new tab at [http://localhost:3002/](http://localhost:3002/)
- By default the frontend uses the API hosted at [https://acc.api.data.amsterdam.nl/iothings/](https://acc.api.data.amsterdam.nl/iothings/)
- To change it, modify the apiDomainName and/or API_ROOT in shared/configuration/environment

## Testing

- npm test
- A minimum test coverage is defined under coverageThreshold in package.json
