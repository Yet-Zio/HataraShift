import cors from 'cors';

/**
 * The default cors options
 */
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionSuccessStatus: 200,
};

export default cors(corsOptions);