The Million Dollar Game Idea is a simple web application made using HTML, CSS, and Javascript. The application randomly generates three text field values: genre, mechanic, and theme. 
The genre field randomly generates a game genre, for instance, a "first-person shooter," or "horror." The mechanic field randomly generates a unique game mechanic, such as "time travel," or a "trading system". 
Lastly, the theme field randomly generates a theme for the game, for example, "medieval," or "cyberpunk." In addition to the three text fields, the app also generates a random color pallet consisting of five colors in which the user can click individual swatches to copy the color's hex code to their clipboard. 
Each field can be rerolled by pressing the text field or the dice icons next to their corresponding field.

Once the user is happy with their generated genre, mechanic, theme, and color pallet, they can click the "this is the one!" button to move forward. 
Once this button is pressed, a POST request is sent to OpenAI containing a text prompt comprised of the user's game idea and is then processed by ChatGPT 3.5 to return in point form, a unique video game outline based around the user's chosen genre, mechanic, and theme.
