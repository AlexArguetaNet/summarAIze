import axios from "axios"

const API_PREFIX = import.meta.env.VITE_ENDPOINT_PREFIX;

export const fetchSummary = async (text) => {

    try {
        const res = await axios.post(`${API_PREFIX}/summarize`, { text });

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
        console.log("Failed to fetch summary", error);
        
        throw new Error(
            error.response?.data?.detail ||
            error.message ||
            "An error occurred while getting the summary."
        )
        
    }
    
}
