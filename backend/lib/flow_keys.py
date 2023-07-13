from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import serialization


class PrivateKey:
    def __init__(self):
        self.private_key = None

    def generate(self):
        # Generate a new EC private key
        self.private_key = ec.generate_private_key(ec.SECP256K1())

    def encode(self):
        # Serialize the private key in PEM format
        encoded_private_key = self.private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption(),
        )
        return encoded_private_key

    @property
    def PublicKey(self):
        # Retrieve the corresponding public key
        public_key = self.private_key.public_key()
        return public_key
