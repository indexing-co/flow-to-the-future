import os
import flow_py_sdk
import flow_py_sdk.cadence

# FlowCapacitorContract
# https://testnet.flowscan.org/account/0x5ddebd0780c440d4

SERVICE_ACCOUNT = "0x5ddebd0780c440d4"
SERVICE_ACCOUNT_PRIVATE_KEY = os.getenv("FLOW_PRIVATE_KEY")
SERVICE_ACCOUNT_PUBLIC_KEY = os.getenv("FLOW_PUBLIC_KEY")

account_address = flow_py_sdk.cadence.Address.from_hex(SERVICE_ACCOUNT)


async def send_nft(address, prompt, image_url):
    async with flow_py_sdk.flow_client(
        host="access.devnet.nodes.onflow.org", port="9000"
    ) as client:
        latest_block = await client.get_latest_block(is_sealed=False)
        proposer = await client.get_account_at_latest_block(
            address=account_address.bytes
        )
        signer = flow_py_sdk.InMemorySigner(
            hash_algo=flow_py_sdk.HashAlgo.SHA3_256,
            sign_algo=flow_py_sdk.SignAlgo.ECDSA_P256,
            private_key_hex=SERVICE_ACCOUNT_PRIVATE_KEY,
        )

        code = f"""
import FlowCapacitorContract from {SERVICE_ACCOUNT}

transaction {{
  let receiverRef: &{{FlowCapacitorContract.NFTReceiver}}
  let minterRef: &FlowCapacitorContract.NFTMinter

  prepare(acct: AuthAccount) {{
      self.receiverRef = acct.getCapability<&{{FlowCapacitorContract.NFTReceiver}}>(/public/NFTReceiver)
          .borrow()
          ?? panic("Could not borrow receiver reference")        
      
      self.minterRef = acct.borrow<&FlowCapacitorContract.NFTMinter>(from: /storage/NFTMinter)
          ?? panic("could not borrow minter reference")
  }}

  execute {{
      let metadata : {{String : String}} = {{
          "prompt": "{prompt}",
          "image_url": "{image_url}"
      }}
      let newNFT <- self.minterRef.mintNFT()
  
      self.receiverRef.deposit(token: <-newNFT, metadata: metadata)

      log("NFT Minted and deposited")
  }}
}}"""

        tx = (
            flow_py_sdk.Tx(
                code=code,
                reference_block_id=latest_block.id,
                payer=account_address,
                proposal_key=flow_py_sdk.ProposalKey(
                    key_address=account_address,
                    key_id=0,
                    key_sequence_number=proposer.keys[0].sequence_number,
                ),
            )
            .add_authorizers(account_address)
            .with_envelope_signature(
                account_address,
                0,
                signer,
            )
        )

        resp = await client.send_transaction(transaction=tx.to_signed_grpc())

        return resp.id.hex()


async def generate_account():
    async with flow_py_sdk.flow_client(
        host="access.devnet.nodes.onflow.org", port="9000"
    ) as client:
        latest_block = await client.get_latest_block(is_sealed=False)
        proposer = await client.get_account_at_latest_block(
            address=account_address.bytes
        )
        signer = flow_py_sdk.InMemorySigner(
            hash_algo=flow_py_sdk.HashAlgo.SHA3_256,
            sign_algo=flow_py_sdk.SignAlgo.ECDSA_P256,
            private_key_hex=SERVICE_ACCOUNT_PRIVATE_KEY,
        )
        account_key = flow_py_sdk.AccountKey(
            hash_algo=flow_py_sdk.HashAlgo.SHA3_256,
            sign_algo=flow_py_sdk.SignAlgo.ECDSA_P256,
            public_key=bytes.fromhex(SERVICE_ACCOUNT_PUBLIC_KEY),
        )

        sk = flow_py_sdk.account_key.SigningKey.generate()
        private_key = sk.to_string().hex()

        # @TODO: use new pk to generate address instead
        # vk = sk.get_verifying_key()
        # public_key = vk.to_string()
        # account_key = flow_py_sdk.AccountKey(
        #     hash_algo=flow_py_sdk.HashAlgo.SHA3_256,
        #     sign_algo=flow_py_sdk.SignAlgo.ECDSA_P256,
        #     public_key=public_key,
        # )

        tx = (
            flow_py_sdk.create_account_template(
                keys=[account_key],
                reference_block_id=latest_block.id,
                payer=account_address,
                proposal_key=flow_py_sdk.ProposalKey(
                    key_address=account_address,
                    key_id=0,
                    key_sequence_number=proposer.keys[0].sequence_number,
                ),
            )
            .add_authorizers(account_address)
            .with_envelope_signature(
                account_address,
                0,
                signer,
            )
        )

        result = await client.execute_transaction(tx, wait_for_seal=True)

        for evt in result.events:
            if evt.type == "flow.AccountCreated":
                print(f"{evt.value.fields['address']}")
                return f"{evt.value.fields['address']}", private_key

    return "", ""
