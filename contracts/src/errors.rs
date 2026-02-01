use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum TrustFlowError {
    Unauthorized = 1,
    EscrowNotFound = 2,
    InvalidAmount = 3,
    EscrowAlreadyReleased = 4,
    DisputeNotFound = 5,
    DisputeAlreadyResolved = 6,
    InsufficientFunds = 7,
    OracleStale = 8,
    ArithmeticOverflow = 9,
    InvalidState = 10,
}
