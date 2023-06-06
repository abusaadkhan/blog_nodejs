import dotenv from 'dotenv'

dotenv.config

const config = {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET || 'yoursecretabusaad',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '1d'
}

export default config