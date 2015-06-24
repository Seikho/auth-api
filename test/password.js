var createHash = require("../src/api/createHash");
var compareHash = require("../src/api/compareHash");
var chai = require("chai");
var expect = chai.expect;
var passwordHash = "";
describe("Password tests", function () {
    it("will create a password hash", function (done) {
        createHash("password")
            .then(function (hash) {
            expect(hash.length > 0).to.be.true;
            passwordHash = hash;
            done();
        }).catch(done);
    });
    it("will successfully compare a password to a hash", function (done) {
        compareHash("password", passwordHash)
            .then(function (isMatch) {
            expect(isMatch).to.be.true;
            done();
        }).catch(done);
    });
    it("will fail to match an incorrect password to a hash", function (done) {
        compareHash("wrong password", passwordHash)
            .then(function (isMatch) {
            expect(isMatch).to.be.false;
            done();
        }).catch(done);
    });
});
