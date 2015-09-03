import AuthApi = require("ls-auth-api");
import createHash = require("../src/api/createHash");
import compareHash = require("../src/api/compareHash");
import verifyToken = require("../src/api/verifyToken");
import createToken = require("../src/api/createToken");
import chai = require("chai");
var expect = chai.expect;

var passwordHash = "";
var storedToken: any = {};

describe("Password tests", () => {
    it("will create a password hash", done => {
        createHash("password")
            .then(hash => {
            expect(hash.length > 0).to.be.true;
            passwordHash = hash;
            done();
        }).catch(done);
    });

    it("will successfully compare a password to a hash", done => {
        compareHash("password", passwordHash)
            .then(isMatch => {
            expect(isMatch).to.be.true;
            done();
        }).catch(done);
    });

    it("will fail to match an incorrect password to a hash", done => {
        compareHash("wrong password", passwordHash)
            .then(isMatch => {
            expect(isMatch).to.be.false;
            done();
        }).catch(done);
    });
    
    it("will create a token", done => {
       createToken()
        .then(token => {
            expect(token.length > 0).to.be.true;
            storedToken = token;
            done();
        }).catch(done);
    });
    
    it("will successfully verify the token", done => {
        verifyToken(storedToken)
            .then((object: AuthApi.Payload) => {
                expect(object.guid.length === 36).to.be.true;
                done();
            }).catch(done);
    })
});
