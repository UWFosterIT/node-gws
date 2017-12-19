require('../setup');

let group = 'uw_foster_staff_it_developers_nodegws-test_group';

describe('Membership', function () {

  beforeEach(() => {
    uwgws.initialize(config);
  });

  // remove group created by tests
  after(async () => {
    uwgws.initialize(config);
    await uwgws.group.del({id: group});
  });

  describe('Add', () => {
    it('should add a new member to the group', async () => {
      let options = {
        id:    group,
        netid: 'milesm'
      };

      let result = await uwgws.membership.add(options);
      expect(result.statusCode).to.equal(200);
    });

    it('should add a rollup group', async () => {
      let options = {
        id:    group,
        netid: 'uw_foster_staff_it_developers'
      };

      let result = await uwgws.membership.add(options);
      expect(result.statusCode).to.eql(200);
    });
  });

  describe('Get', () => {
    it('should return membership', async () => {
      let options = {id: group};

      // this test occasionally returns 404
      let result = await uwgws.membership.get(options);
      expect(result.data.length).to.be.within(1, 4);
    });

    it('should return effective membership', async () => {
      let options = {
        effective: true,
        id:        group
      };

      let result = await uwgws.membership.get(options);
      expect(result.data.length).to.be.within(10, 20);
    });
  });

  describe('Delete', () => {
    it('should delete a member from the group', async () => {
      let options = {
        id:    group,
        netid: 'schad'
      };

      let result = await uwgws.membership.add(options);
      expect(result.statusCode).to.equal(200);
      result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(200);
    });

    it('should not delete all members from the group', async () => {
      let options = {id: group};

      let result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(400);
    });

  });
});
