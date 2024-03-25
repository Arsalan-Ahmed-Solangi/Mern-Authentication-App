const randomQuote = require('random-quote');


exports.randomQuote = (req, res) => {
    try {


        const quote = "This is the random quote.";

        res.status(200).json({
            success: true,
            quote: quote ?? "",
            message: "Quote fetched successfully!",
        })

    } catch (error) {
        console.error('Error fetching quote:', error);
        res.status(500).json({ success: false, message: "Something went wrong!", error: error });
    }
}