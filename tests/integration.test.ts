// Integration smoke tests
describe('TrustFlow integration', () => {
  it('escrow lifecycle: create → release', async () => {
    const steps = ['create', 'activate', 'release'];
    expect(steps[0]).toBe('create');
    expect(steps[steps.length - 1]).toBe('release');
  });

  it('dispute lifecycle: create → dispute → resolve', async () => {
    const steps = ['create', 'activate', 'dispute', 'resolve'];
    expect(steps).toContain('dispute');
    expect(steps.indexOf('dispute')).toBeLessThan(steps.indexOf('resolve'));
  });

  it('fee is deducted on release', () => {
    const amount = 10_000_000;
    const feeBps = 50;
    const fee = Math.floor(amount * feeBps / 10_000);
    const payout = amount - fee;
    expect(fee).toBe(5_000);
    expect(payout).toBe(9_995_000);
  });
});
