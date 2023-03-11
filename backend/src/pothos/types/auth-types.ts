import { builder } from '../builder';
import jsonwebtoken, { type JwtPayload } from 'jsonwebtoken';

export const AuthJwtToken = builder.scalarType<'AuthJwtToken'>('AuthJwtToken', {
  serialize(outputValue) {
    // console.log('serialize', outputValue);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!outputValue.email) throw new Error('Invalid JWT payload');
    return jsonwebtoken.sign(outputValue, process.env.JWT_SECRET ?? 'dummy');
  },
  parseValue(value) {
    const verified = jsonwebtoken.verify(
      value as string,
      process.env.JWT_SECRET ?? 'dummy',
      {
        complete: false,
      },
    ) as JwtPayload & { email: string };
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!verified.email) throw new Error('Invalid JWT payload');
    return verified;
  },
});
