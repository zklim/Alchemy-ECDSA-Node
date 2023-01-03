const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const sk = toHex(secp.utils.randomPrivateKey());
const pk = toHex(secp.getPublicKey(sk));

console.log("secret key: %s\npublic key: %s", sk, pk);