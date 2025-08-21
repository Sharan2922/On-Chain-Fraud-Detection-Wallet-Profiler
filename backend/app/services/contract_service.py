import json
from web3 import Web3
from app.core.config import settings  # centralized settings

# ABI of WalletProfiler.sol (simplified example)
ABI = [
    {
        "inputs": [{"internalType": "string", "name": "_message", "type": "string"}],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "message",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "string", "name": "_message", "type": "string"}],
        "name": "setMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

# --- Setup Web3 connection ---
if not settings.SEPOLIA_RPC_URL:
    raise RuntimeError("❌ SEPOLIA_RPC_URL is missing in .env")

web3 = Web3(Web3.HTTPProvider(settings.SEPOLIA_RPC_URL))

# --- Wallet setup ---
if not settings.PRIVATE_KEY:
    raise RuntimeError("❌ PRIVATE_KEY is missing in .env")

account = web3.eth.account.from_key(settings.PRIVATE_KEY)

# --- Contract setup ---
if not settings.CONTRACT_ADDRESS:
    raise RuntimeError("❌ CONTRACT_ADDRESS is missing in .env")

contract = web3.eth.contract(
    address=Web3.to_checksum_address(settings.CONTRACT_ADDRESS),
    abi=ABI
)

print(f"✅ Loaded account: {account.address}")
print(f"✅ Using contract: {settings.CONTRACT_ADDRESS}")

# --- Functions ---
def get_contract_message():
    """Read the contract's message"""
    return contract.functions.message().call()

def set_contract_message(new_message: str):
    """Update the contract's message (writes to chain)"""
    nonce = web3.eth.get_transaction_count(account.address)

    txn = contract.functions.setMessage(new_message).build_transaction({
        "from": account.address,
        "nonce": nonce,
        "gas": 200000,
        "gasPrice": web3.eth.gas_price,
        "chainId": settings.CHAIN_ID,
    })

    signed_txn = account.sign_transaction(txn)
    tx_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)

    return web3.to_hex(tx_hash)
