#[test_only]
module protocol_test::liquidate_t {
  
  use protocol::liquidate;
  use protocol::position::Position;
  use protocol::bank::Bank;
  use protocol::coin_decimals_registry::CoinDecimalsRegistry;
  use sui::coin::{Self, Coin};
  use sui::balance::Balance;
  
  public fun liquidate_t<DebtType, CollateralType>(
    position: &mut Position,
    bank: &mut Bank,
    coinDecimalsRegistry: &CoinDecimalsRegistry,
    repayCoin: Coin<DebtType>,
    now: u64,
  ): (Balance<DebtType>, Balance<CollateralType>) {
    liquidate::liquidate_t<DebtType, CollateralType>(position, bank, coin::into_balance(repayCoin), coinDecimalsRegistry, now)
  }
}
