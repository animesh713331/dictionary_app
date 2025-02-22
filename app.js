const form = document.querySelector('form');
const resultDiv = document.querySelector('#result');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    resultDiv.innerHTML = '<p>Loading...</p>'; // Show loading message
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
            throw new Error("Word not found!");
        }
        const data = await response.json();
        const meanings = data[0].meanings;

        resultDiv.innerHTML = `
            <h2><strong>Word:</strong> ${data[0].word}</h2>
        `;

        // Audio
        if (data[0].phonetics && data[0].phonetics.length > 0) {
            const audioSrc = data[0].phonetics.find(p => p.audio)?.audio;
            if (audioSrc) {
                resultDiv.innerHTML += `
                    <p><strong>Pronunciation:</strong> 
                        <button class="audio-btn" onclick="playAudio('${audioSrc}')">🔊 Listen</button>
                    </p>
                `;
            } else {
                resultDiv.innerHTML += `<p><strong>Pronunciation:</strong> Not available</p>`;
            }
        } else {
            resultDiv.innerHTML += `<p><strong>Pronunciation:</strong> Not available</p>`;
        }

        meanings.forEach(meaning => {
            const definitions = meaning.definitions[0];
            resultDiv.innerHTML += `
                <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
                <p><strong>Meaning:</strong> ${definitions.definition || "Not found"}</p>
                <p><strong>Example:</strong> ${definitions.example || "Not found"}</p>
            `;

            if (definitions.antonyms && definitions.antonyms.length > 0) {
                resultDiv.innerHTML += `<p><strong>Antonyms:</strong></p><ul>`;
                definitions.antonyms.forEach(antonym => {
                    resultDiv.innerHTML += `<li>${antonym}</li>`;
                });
                resultDiv.innerHTML += `</ul>`;
            } else {
                resultDiv.innerHTML += `<p><strong>Antonyms:</strong> Not Found</p>`;
            }
        });

        resultDiv.innerHTML += `<p><a id="moreInfo" href="${data[0].sourceUrls[0]}" target="_blank">Read More</a></p>`;
        console.log(data);

    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error("Error fetching word data:", error);
    }
};

// Function to play audio
const playAudio = (src) => {
    const audio = new Audio(src);
    audio.play();
};


// const form = document.querySelector('form');
// const resultDiv = document.querySelector('#result');

// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     getWordInfo(form.elements[0].value);
// });

// const getWordInfo = async (word) => {
//     try {
//         const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
//         if (!response.ok) {
//             throw new Error("Word not found!");
//         }
//         const data = await response.json();
//         const meanings = data[0].meanings;

//         resultDiv.innerHTML = `
//             <h2><strong>Word:</strong> ${data[0].word}</h2>
//         `;
        
//         // Audio 
//         if (data[0].phonetics && data[0].phonetics.length > 0) {
//             const audioSrc = data[0].phonetics.find(p => p.audio)?.audio;
//             if (audioSrc) {
//                 resultDiv.innerHTML += `
//                     <p><strong>Pronunciation:</strong> 
//                         <button class="audio-btn" onclick="playAudio('${audioSrc}')">🔊 Listen</button>
//                     </p>
//                 `;
//             } else {
//                 resultDiv.innerHTML += `<p><strong>Pronunciation:</strong> Not available</p>`;
//             }
//         } else {
//             resultDiv.innerHTML += `<p><strong>Pronunciation:</strong> Not available</p>`;
//         }

//         meanings.forEach(meaning => {
//             const definitions = meaning.definitions[0];
//             resultDiv.innerHTML += `
//                 <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
//                 <p><strong>Meaning:</strong> ${definitions.definition || "Not found"}</p>
//                 <p><strong>Example:</strong> ${definitions.example || "Not found"}</p>
//             `;

//             if (definitions.antonyms && definitions.antonyms.length > 0) {
//                 resultDiv.innerHTML += `<p><strong>Antonyms:</strong></p><ul>`;
//                 definitions.antonyms.forEach(antonym => {
//                     resultDiv.innerHTML += `<li>${antonym}</li>`;
//                 });
//                 resultDiv.innerHTML += `</ul>`;
//             } else {
//                 resultDiv.innerHTML += `<p><strong>Antonyms:</strong> Not Found</p>`;
//             }
//         });

//         resultDiv.innerHTML += `<p><a id="moreInfo" href="${data[0].sourceUrls[0]}" target="_blank">Read More</a></p>`;
//         console.log(data);

//     } catch (error) {
//         resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
//         console.error("Error fetching word data:", error);
//     }

// // Function to play audio
// const playAudio = (src) => {
//     const audio = new Audio(src);
//     audio.play();
// };
// };