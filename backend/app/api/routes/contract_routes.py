# app/api/routes/contract_routes.py
from fastapi import APIRouter
from app.services.contract_service import get_contract_message, set_contract_message

router = APIRouter()

@router.get("/message")
async def read_message():
    """
    Fetch the current message stored in the WalletProfiler contract.
    """
    message = get_contract_message()
    return {"contract_message": message}

@router.post("/message")
async def update_message(new_message: str):
    """
    Update the contract's message (writes to blockchain).
    ⚠️ Requires wallet with Sepolia ETH for gas.
    """
    tx_hash = set_contract_message(new_message)
    return {"tx_hash": tx_hash}
