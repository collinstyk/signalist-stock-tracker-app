import { Inngest } from 'inngest';

const inngest = new Inngest({
  name: 'Watchlist System',
  region: 'us', // Specify your region
  apiKey: process.env.INNGEST_API_KEY, // Ensure you have your API key set in environment variables
});

export default inngest;