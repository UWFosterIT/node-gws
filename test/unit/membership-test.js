import '../setup/';

describe('Membership', function () {

  beforeEach(() => {
    uwgws.initialize(config);
  });

  describe('Get', () => {
    it('should return membership', async() => {
      let options = {id: 'uw_foster_it_developers_nodegws-test'};

      let result = await uwgws.membership.get(options);
      expect(result.data.length).to.be.within(1, 4);
    });

    it('should return effective membership', async() => {
      let options = {
        effective: true,
        id:        'uw_foster_it_developers_nodegws-test'
      };

      let result = await uwgws.membership.get(options);
      expect(result.data.length).to.be.within(10, 20);
    });
  });

  describe('Add', () => {
    it('should add a new member to the group', async() => {
      let options = {
        id:    'uw_foster_it_developers_nodegws-test',
        netid: 'milesm'
      };

      let result = await uwgws.membership.add(options);
      expect(result.statusCode).to.equal(200);
    });
  });

  describe('Delete', () => {
    it('should delete a member from the group', async() => {
      let options = {
        id:    'uw_foster_it_developers_nodegws-test',
        netid: 'milesm'
      };

      // add one and then delete
      let result = await uwgws.membership.add(options);
      expect(result.statusCode).to.equal(200);
      result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(200);
    });

    it('should not delete all members from the group', async() => {
      let options = {id: 'uw_foster_it_developers_nodegws-test'};

      // add one and then delete
      let result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(400);
    });

  });
});
