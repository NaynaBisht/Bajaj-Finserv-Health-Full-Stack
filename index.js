const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        // input array
        const { data } = req.body;

        // Your Personal Information
        const user_id = "nayna_bisht_04022005"; 
        const email = "naynabisht241@gmail.com";   
        const roll_number = "22BCE8037";      

        // processing the array 
        const even_numbers = [];
        const odd_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_string = "";

        // iterating on all values to meet the conditions for output
        data.forEach(item => {
            // Check number
            if (!isNaN(item)) {
                const number = parseInt(item);
                if (number % 2 === 0) {
                    even_numbers.push(String(number));
                } else {
                    odd_numbers.push(String(number));
                }
                sum += number;
            } 
            // Check alphabet
            else if ( /^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphabet_string += item;
            } 
            // Check special character
            else {
                special_characters.push(item);
            }
        });

        // concatenated reversed string
        const reversed_alphabets = alphabet_string.split('').reverse().join('');
        let concat_string = '';
        for (let i = 0; i < reversed_alphabets.length; i++) {
            // CORRECTED LOGIC: Even index (0, 2, ..) is uppercase, odd is lowercase
            if (i % 2 === 0) {
                concat_string += reversed_alphabets[i].toUpperCase();
            } else {
                concat_string += reversed_alphabets[i].toLowerCase();
            }
        }

        // Output 
        const response = {
            is_success: true,
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            even_numbers: even_numbers,
            odd_numbers: odd_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: String(sum),
            concat_string: concat_string
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ is_success: false, error: error.message });
    }
});

app.get('/', (req, res) => {
    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bajaj Finserv Health | Full Stack API</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f8f9fa; 
                color: #212529;
                text-align: center;
            }
            .container {
                padding: 2.5rem;
                background: #ffffff; 
                border-radius: 15px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                max-width: 600px;
                width: 90%;
                border: 1px solid #e9ecef;
            }
            h1 {
                font-size: 2.5rem;
                margin-bottom: 0.5rem;
                color: #343a40;
            }
            p {
                font-size: 1.2rem;
                margin-top: 0;
                color: #6c757d;
            }
            code {
                background: #e9ecef;
                padding: 0.2rem 0.5rem;
                border-radius: 5px;
                font-family: "SF Mono", "Courier New", Courier, monospace;
                color: #d63384;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Bajaj Finserv Health | Full Stack</h1>
            <p>VIT Full Stack Assessment API</p>
            <p>The API endpoint is at <code>/bfhl</code> and accepts POST requests.</p>
        </div>
    </body>
    </html>
    `;
    res.send(htmlResponse);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});