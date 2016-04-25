import '../setup/';

describe('Membership', function () {

  beforeEach(() => {
    uwgws.initialize(config);
  });

  describe('Get', () => {
    it('should return membership', mochaAsync(async () => {
      let options = {
        id: 'uw_foster_it_developers_nodegws-test'
      };

      let result = await uwgws.membership.get(options);
      expect(result.data.length).to.be.within(1, 4);
    }));

    it('should return effective membership', mochaAsync(async () => {
      let options = {
        effective: true,
        id:        'uw_foster_it_developers_nodegws-test'
      };

      let result = await uwgws.membership.get(options);
      expect(result.data.length).to.be.within(10, 20);
    }));
  });

  describe('Add', () => {
    it('should add a new member to the group', mochaAsync(async () => {
      let options = {
        id:    'uw_foster_it_developers_nodegws-test',
        netid: 'milesm'
      };

      let result = await uwgws.membership.add(options);
      expect(result.statusCode).to.equal(200);
    }));
  });

  describe('Delete', () => {
    it('should delete a member from the group', mochaAsync(async () => {
      let options = {
        id:    'uw_foster_it_developers_nodegws-test',
        netid: 'milesm'
      };

      // add one and then delete
      let result = await uwgws.membership.add(options);
      expect(result.statusCode).to.equal(200);
      result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(200);
    }));
  });
});

// TO DO
// Test Setup
// ...add members
// ...assert correct number of members
// ...add subgroup as member
// ...add members to subgroup
// ...assert correct number of effect members to parent
