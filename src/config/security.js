const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const logger = require('intel').getLogger('Security|Class');

const config = {
    secretKey: process.env.SECRET_KEY,
    jwtExpiration: 1800, 
};

const publicPages = ['/', '/favicon.ico', '/sign_in'];

function isPublicAccess(requestPath) {
    return publicPages.includes(requestPath);
}

class Security {
    static generateJwtToken(userData) {
        return jwt.sign(
            { userData },
            Security.getPrivateKey(),
            { algorithm: 'RS256', expiresIn: config.jwtExpiration },
        );
    }

    static jwtVerification() {
        return (req, res, next) => {
            if (!isPublicAccess(req.path)) {
                try {
                    const token = (req.headers.authorization || '').replace(/^Bearer /, '');

                    logger.debug(req.headers);
                    const data = jwt.verify(token, Security.getPublicKey());

                    logger.info('jwt decoded data:', data);
                } catch (err) {
                    return res.status(401).json({ error: err.message });
                }
            }

            return next();
        };
    }

    static getPrivateKey() {
        const privateKeyPath = path.resolve(path.join(__dirname, '/certs', 'server_certificate.pem'));

        if (!fs.existsSync(privateKeyPath)) {
            throw new Error('You have to create public certificate.');
        }

        return fs.readFileSync(privateKeyPath, 'utf8');
    }

    static getPublicKey() {
        const publicKeyPath = path.resolve(path.join(__dirname, '/certs', 'server_certificate.pem.pub'));

        if (!fs.existsSync(publicKeyPath)) {
                   throw new Error('You have to create public certificate.');
        }

        return fs.readFileSync(publicKeyPath, 'utf8');
    }
}

module.exports = Security;
