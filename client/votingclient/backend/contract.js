const { createThirdwebClient, getContract } = require("thirdweb");
const { contractAdr } = require("./env");

const localhost = {
    id: 1337,
    name: 'localhost',
    rpc: 'http://127.0.0.1:8545',
    testnet: true,
    experimental: {
        increaseZeroByteCount: true
    }
};



// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
    clientId: "1e62bb20d56ec36e5692fd4a4f48549e"
});

// connect to your contract
const contract = getContract({
    client,
    chain: localhost,
    address: contractAdr
});

module.exports = { contract }