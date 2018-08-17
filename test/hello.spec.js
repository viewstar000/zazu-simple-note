/*jshint esversion: 6 */

const expect = require('chai').expect;
const note = require('../src/note')();

describe('Hello', () => {
  describe('.search', () => {
    it('does include a name', () => {
      return note('spock').then((results) => {
        expect(results[0].title).to.include('spock');
      });
    });
  });
});