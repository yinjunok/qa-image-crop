import { rangeNum } from '../utils';

describe('测试范围', () => {
  it('小于最小值', () => {
    const num = rangeNum(-100, 1, 100);
    expect(num).toBe(1);
  });

  it('大于最大值', () => {
    const num = rangeNum(101, 0, 100);
    expect(num).toBe(100);
  });

  it('在给定的范围内', () => {
    const num = rangeNum(50, 0, 100);
    expect(num).toBe(50);
  });
});
