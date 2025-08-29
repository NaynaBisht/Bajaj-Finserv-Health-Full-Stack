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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});