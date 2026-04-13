import { AuthService } from '../backend/src/auth/auth.service';

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(() => { service = new AuthService(); });

  it('generates a unique challenge per address', () => {
    const c1 = service.generateChallenge('GABC');
    const c2 = service.generateChallenge('GXYZ');
    expect(c1).not.toBe(c2);
    expect(c1).toHaveLength(64);
  });

  it('rejects unknown address verification', () => {
    const result = service.verifySignature('GUNKNOWN', 'sig');
    expect(result).toBe(false);
  });

  it('generates a valid token for known address', () => {
    service.generateChallenge('GABC');
    const token = service.generateToken('GABC');
    expect(token).toContain('.');
    const [payload] = token.split('.');
    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString());
    expect(decoded.address).toBe('GABC');
  });
});
