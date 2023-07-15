from cryptography.hazmat.primitives import serialization
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify, redirect, url_for
import openai
import os
import random
import requests

from lib import flow_keys


load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)


# @TODO: cache results?
def get_nfts_for_eth_address(eth_address):
    all_nfts = []

    while len(all_nfts) % 100 == 0:
        url = f"https://api.opensea.io/api/v1/assets?owner={eth_address}&order_direction=desc&offset={len(all_nfts)}&limit=100"
        headers = {"X-API-KEY": os.getenv("OS_API_KEY")}
        response = requests.get(url, headers=headers)
        response_json = response.json()
        new_nfts = response_json["assets"]

        all_nfts += new_nfts
        if len(new_nfts) < 100:
            break

    return all_nfts


def generate_prompt_from_nfts(nfts):
    prompt_parts = []

    for nft in nfts:
        title = nft["name"]
        words = title.split()
        selected_word = random.choice(words)
        prompt_parts.append(selected_word)

    prompt = " ".join(prompt_parts)
    return prompt


@app.route("/get_nfts", methods=["GET"])
def get_nfts():
    eth_address = request.args.get("eth_address")
    nfts = get_nfts_for_eth_address(eth_address)
    return jsonify(nfts)


@app.route("/submit_nfts", methods=["POST"])
def submit_nfts():
    eth_address = request.json.get("eth_address")
    nfts = get_nfts_for_eth_address(eth_address)
    selected_nft_ids = request.json.get("nft_ids")
    selected_nfts = [nft for nft in nfts if nft["token_id"] in selected_nft_ids]

    # Generate a prompt
    prompt = generate_prompt_from_nfts(selected_nfts)

    # Generate an image using OpenAI's API
    response = openai.Image.create(prompt=prompt, n=1, size="1024x1024")

    # Get the image URL from the response
    image_url = response["data"][0]["url"]

    # @TODO: store image with IPFS
    # image_data = requests.get(image_url).content

    # image_filename = prompt + ".png"
    # image_path = os.path.join("/tmp", image_filename)
    # with open(image_path, "rb") as f:
    #     image_data = f

    #     r = requests.post(
    #         "http://127.0.0.1:5001/api/v0/add",
    #         files={image_filename: image_data},
    #     )
    #     print(r.status_code)
    #     print(r)

    return jsonify({"image_url": image_url})


@app.route("/create_flow_account", methods=["GET"])
def create_flow_account():
    # Create a new private key
    private_key = flow_keys.PrivateKey()
    private_key.generate()  # Generate the private key

    # Create a new public key
    public_key = private_key.PublicKey  # Remove the parentheses

    # @TODO: create a new address
    # @TODO: email instructions for retrieval of private key (?)

    return (
        jsonify(
            {
                "address": "invalid-address",  # @TODO: create new address
                "public_key": public_key.public_bytes(
                    encoding=serialization.Encoding.PEM,
                    format=serialization.PublicFormat.SubjectPublicKeyInfo,
                ).decode(),
            }
        ),
        200,
    )


if __name__ == "__main__":
    app.run(debug=True, port=8080)
