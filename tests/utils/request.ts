import supertest, { Test, SuperAgentTest } from 'supertest';
import app from '../../src/app';

type Method = Uppercase<keyof SuperAgentTest> | keyof SuperAgentTest;

/**
 * Returns a supertest instance.
 *
 * @example
 *
 * ```js
 * const response = await request({
 *   url: '/marketplaces/transactions',
 *   method: 'get',
 * }).send();
 * ```
 */
export default ({
  method,
  url,
  mimeType,
}: {
  method: Method;
  url: string;
  mimeType?: 'text/csv' | 'application/vnd.ms-excel' | 'application/json';
}): Test =>
  supertest(app)
    [method.toLowerCase()](url)
    .set('Authorization', 'Bearer token')
    .set('Accept', mimeType || '*/*');
