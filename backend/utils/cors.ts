import cors from 'cors';

/**
 * The default cors options
 */
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

export default cors(corsOptions);