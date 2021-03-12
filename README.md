# GatorCom

GatorCom is a web application that supports translating a conversation between an English and a Spanish user. The website will allow the users to flip between the two languages while chatting. A user can rate the quality of the translation from the other user. This should allow the two users to communicate easily about tasks like directions to a destination on campus.

## Getting Started
### Installation
1. Clone the git repository
2. Navigate into the project directory using the terminal with `cd gator-com-app`
3. Run `npm install` 

### Google Translate API

This application requires a Google Translate API key which you can obtain by
1. Following [this](https://cloud.google.com/translate/docs/setup) tutorial to create a Google project and enable the Cloud Translation API
2. Then follow [this](https://translatepress.com/docs/automatic-translation/generate-google-api-key/) tutorial to generate an API key


### Link API Key to GatorCom
1. In the project directiory, create a `.env` file
2. Add the following line of code to this file substituting `{APIKEY}` with your generated Google Cloud Translation API key
```
REACT_APP_GOOGLE_TRANSLATE_API_KEY={APIKEY}
```

### Running GatorCom
1. Run `npm start`
2. Visit `http://localhost:3000/` to view the GatorCom application
