const { PHASE_DEVELOPMENT_SERVER } = require('next/dist/shared/lib/constants')

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                siteUrl: 'http://localhost:3000',
                dbUser: 'pasteu008',
                dbPass: 'admin',
                dbCluster: 'cluster0',
                db: 'Blog-dv'
            }
        }
    }

    return {
        env: {
            siteUrl: 'http://localhost:3000',
            dbUser: 'pasteu008',
            dbPass: 'admin',
            dbCluster: 'cluster0',
            db: 'Blog'
        }
    }
}

module.exports = nextConfig
