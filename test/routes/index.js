describe("Routes : index", function() {
  describe("GET /", function() {
    it("Returns the API status.", function(done) {
      request.get("/")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(error, res) {
          const expected = {status : "API Exercise2"};
          expect(res.body).to.eql(expected);
          done(error);
        });
    });
  });
});
