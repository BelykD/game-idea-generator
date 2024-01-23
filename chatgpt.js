/*

The Million Dollar Game Idea - Web App
File name: chatgpt.js
Author: Dylan Belyk

*/

const form = document.getElementById('chat-form');
const responseArea = document.getElementById('response');
const loading = document.getElementById("loading");

const API_KEY = ''; // ################ ADD YOUR API KEY HERE ################
const endpoint = 'https://api.openai.com/v1/chat/completions';

// "This is the One!" button activates prompt
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Getting fields from inputs
    var genreInput = genreField.value.trim();
    var mechanicInput = mechanicField.value.trim();
    var themeInput = themeField.value.trim();

    if (genreField.value === "" || mechanicField === "" || themeField === "") {
        console.log("Empty prompt(s)")
        return; // Exit if any field is empty
    }
    // Activating loading animation
    loading.style.visibility = 'visible' 
    loading.style.opacity = 1;

    var promptInput = "Provide a point form, brief outline for a video game using the genre: " + 
        genreInput + ", the theme: " + themeInput + ", and based around the game mechanic:" + mechanicInput;
        
    if (true) { // Add statements to stop spam etc. - true for testing purposes
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo', // ChatGPT version
                    messages: [{ role: 'user', content: promptInput }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // Disabling loading animation
                loading.style.visibility = 'hidden' 
                loading.style.opacity = 0;
                responseArea.style.visibility = 'visible';
                responseArea.style.opacity = 1;
                responseArea.value = data.choices[0].message.content; // Output from ChatGPT
            } else {
                responseArea.value = 'Error: Unable to process request - Response != ok.';
            }
        } catch (error) {
            console.error(error);
            responseArea.value = 'Error: Unable to process request - Other.';
        }
    }
});