# gamma-gt
An app for tracking the board games we play.

## Web app
The frontend web app is written in JavaScript using React and packaged by parcel.

It can be started by running `npm start` inside the `web_app` directory.

## API
The API is written in JavaScript using Express.

It can be started by running `npm start` inside the `api` directory.

## Deploy
If you are deploying to your own domain you will need to set the `BASE_URL` environment variable when building the app. And change the S3 bucket name in `serverless.yaml`. Route53 configuration for custom domains for the S3 site hosting and API Gateway are not specified inside this project.

Build the app by running `npm run build` from inside the `web_app` directory.

Deploy everything by running `serverless deploy` from inside the `api` directory with the correct AWS profile selected.
