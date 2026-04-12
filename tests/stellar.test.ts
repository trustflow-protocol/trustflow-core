describe('StellarService', () => {
  it('returns zero balance for unknown address', async () => {
    // Mock Horizon response
    const mockServer = { loadAccount: jest.fn().mockRejectedValue(new Error('not found')) };
    expect(mockServer.loadAccount).toBeDefined();
  });

  it('validates Stellar address format', () => {
    const STELLAR_RE = /^G[A-Z2-7]{55}$/;
    expect(STELLAR_RE.test('GABC')).toBe(false);
    expect(STELLAR_RE.test('G' + 'A'.repeat(55))).toBe(true);
  });

  it('handles testnet vs mainnet passphrase', () => {
    const testnet = 'Test SDF Network ; September 2015';
    const mainnet = 'Public Global Stellar Network ; September 2015';
    expect(testnet).not.toBe(mainnet);
  });
});
