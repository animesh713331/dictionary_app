```## Code Explanation

### **JavaScript (app.js)**

#### **Form Selection & Event Handling**
```js
const form = document.querySelector('form');
const resultDiv = document.querySelector('#result');
```
- `form`: Selects the `<form>` element.
- `resultDiv`: Selects the `<div id="result">` where results will be displayed.

```js
form.addEventListener('submit', (event) => {
    event.preventDefault();
    getWordInfo(form.elements[0].value);
});
```
- Prevents the form from refreshing the page.
- Calls `getWordInfo()` with the entered word.

#### **Fetching Data from API**
```js
const getWordInfo = async (word) => {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
```
- Calls the Free Dictionary API to fetch word data.

```js
        if (!response.ok) {
            throw new Error("Word not found!");
        }
```
- If the word is not found, an error is thrown.

```js
        const data = await response.json();
        const meanings = data[0].meanings;
```
- Converts the response into JSON format.
- Extracts meanings from the API response.

#### **Displaying Results in HTML**
```js
        resultDiv.innerHTML = `
            <h2><strong>Word:</strong> ${data[0].word}</h2>
        `;
```
- Displays the word in an `<h2>` tag.

```js
        meanings.forEach(meaning => {
            const definitions = meaning.definitions[0];
            resultDiv.innerHTML += `
                <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
                <p><strong>Meaning:</strong> ${definitions.definition || "Not found"}</p>
                <p><strong>Example:</strong> ${definitions.example || "Not found"}</p>
            `;
```
- Loops through meanings and displays **part of speech, meaning, and example**.

#### **Handling Antonyms**
```js
            if (definitions.antonyms && definitions.antonyms.length > 0) {
                resultDiv.innerHTML += `<p><strong>Antonyms:</strong></p><ul>`;
                definitions.antonyms.forEach(antonym => {
                    resultDiv.innerHTML += `<li>${antonym}</li>`;
                });
                resultDiv.innerHTML += `</ul>`;
            } else {
                resultDiv.innerHTML += `<p><strong>Antonyms:</strong> Not Found</p>`;
            }
```
- Displays antonyms if available, otherwise shows "Not Found".

#### **Read More Button**
```js
        resultDiv.innerHTML += `<p><a id="moreInfo" href="${data[0].sourceUrls[0]}" target="_blank">Read More</a></p>`;
```
- Provides a link to the original dictionary source.

#### **Error Handling**
```js
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error("Error fetching word data:", error);
    }
};
```
- Displays error messages in red if something goes wrong.

---

### **CSS (style.css)**
```css
*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}
```
- Resets default margin and padding.

```css
body{
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    background: url(./dic_bg.jpg);
    background-size: cover;
    width: 100vw;
    height: 100vh;
}
```
- Sets a background image and full-screen layout.

#### **Form Styling**
```css
form input[type="text"]{
    border: none;
    font-size: 16px;
    font-weight: 500;
    border-radius: 5px;
    padding: 10px;
    flex-grow: 1;
}
```
- Styles the input field.

```css
form button[type="submit"]{
    border: none;
    font-size: 15px;
    font-weight: 500;
    background-color: cornsilk;
    border-radius: 5px;
    padding: 5px;
    margin-left: 10px;
    cursor: pointer;
}
```
- Styles the submit button.

---

### **HTML (index.html)**
```html
<header>
    <nav>
        <h1>&#128218; The Language Lens</h1>
    </nav>
</header>
```
- Navigation bar with a book emoji and title.

```html
<main>
    <form action="">
        <input type="text" name="word" id="word" placeholder="Enter The Word"></input>
        <button type="submit">Search</button>
    </form>
    <div id="result"><div id="loading"></div></div>
</main>
```
- Form with an input field and search button.
- `#result` div displays search results.

```html
<footer>
    <p>Powered by Free Dictionary API</p>
</footer>
```
- Footer with API credit.

```html
<script src="./app.js"></script>
```
- Links the JavaScript file.

## License
This project is licensed under the MIT License.

## Author
- Developed by [Your Name]

