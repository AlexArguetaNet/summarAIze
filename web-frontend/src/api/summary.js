import axios from "axios"

const API_PREFIX = import.meta.env.VITE_ENDPOINT_PREFIX;

export const fetchSummary = async (text, isParagraph) => {

    try {

        let res;

        if (isParagraph) {
            res = await axios.post(`${API_PREFIX}/summarize`, { text, isUrl: false });
        } else {
            // Check if URL provided is a valid URL
            let url;

            try {
                url = new URL(text);
            } catch (error) {
                throw new Error("Invalid URL");
            }
    
            if (url.protocol !== "http:" && url.protocol !== "https:") {
                throw new Error("Invalid URL. Enter a real URL");
            }

            res = await axios.post(`${API_PREFIX}/summarize-url`, { text, isUrl: true });

        }

        // Format summary string
        const summaryString = res.data.summary
            .split('\n')                                 // Split into array, before every new line
            .filter(line => line.trim().startsWith('*')) // Keep line that start with "*"   
            .join(' ');                                  // Combine array back into string

        // Format summary into an array
        const summaryArray = res.data.summary
            .split(/(?=\*)/)                          // Split before every '*'
            .filter(str => str.startsWith('*'))       // Discard anything without '*'
            .map(str => str.replace('*', '').trim()); // Strip the '*' and trim whitespace
        
            return {
                summaryArray,
                summaryString
            };
                
    } catch (error) {        
        throw new Error(
            error.response?.data?.detail ||
            error.message ||
            "An error occurred while getting the summary."
        )
        
    }

    
}
