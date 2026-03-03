use soroban_sdk::{contractimpl, Address, Env, String};
use crate::types::{DisputeRecord, EscrowStatus};
use crate::storage::DataKey;
use crate::errors::TrustFlowError;

pub fn raise_dispute(env: &Env, escrow_id: u64, caller: &Address, reason: String) -> Result<(), TrustFlowError> {
    let mut escrow = env.storage().persistent().get::<DataKey, crate::types::EscrowRecord>(&DataKey::Escrow(escrow_id))
        .ok_or(TrustFlowError::EscrowNotFound)?;
    if !matches!(escrow.status, EscrowStatus::Active) { return Err(TrustFlowError::InvalidState); }
    escrow.status = EscrowStatus::Disputed;
    env.storage().persistent().set(&DataKey::Escrow(escrow_id), &escrow);
    let dispute = DisputeRecord { escrow_id, raised_by: caller.clone(), reason, resolved: false, ruling_for_depositor: false };
    env.storage().persistent().set(&DataKey::Dispute(escrow_id), &dispute);
    Ok(())
}
