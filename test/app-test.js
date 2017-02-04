import chai, { expect } from 'chai';

function numFunc(num) {
  return num;
}

describe('App.js', () => {
  describe('#numFunc()', () => {
    it('should return an integer', () => {
      expect(numFunc(1)).to.be.a('number');
    });
  });
});
