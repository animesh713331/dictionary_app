# The Language Lens (dictionary_app)

The Language Lens is a simple web application that allows users to search for word definitions, parts of speech, examples, antonyms, and words pronunciation using the Free Dictionary API.

## Features
- Search for word meanings and parts of speech
- View example sentences
- Retrieve antonyms if available
- Link to more information from the dictionary source
- Responsive design for mobile compatibility
- Updated with pronunciation feature which plays pronunciation audio when button is clicked

## Technologies Used
- HTML
- CSS
- JavaScript
- Free Dictionary API

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/animesh713331/dictionary_app.git
   ```
2. Navigate to the project folder:
   ```sh
   cd dictionary_app
   ```
3. Open `index.html` in a web browser.

## Usage
1. Enter a word in the search bar.
2. Click the "Search" button.
3. View the definition, part of speech, examples, and antonyms.
4. Pronounce the word using play audio button.
5. Click "Read More" for additional information.

## File Structure
```
.
├── index.html      # Main HTML file
├── style.css       # Stylesheet
├── app.js          # JavaScript logic
├── dic_bg.jpg      # Background image
└── README.md       # Project documentation
```

## API Reference
- The application fetches data from the Free Dictionary API.
- API endpoint: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`

## Author
- Developed by Animesh Kumar Singh

