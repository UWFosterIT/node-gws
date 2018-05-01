/* eslint-disable max-nested-callbacks */
require('../setup');

let group = 'uw_foster_staff_it_developers_nodegws-test_group';
let nonGroup = 'fake_group_that_is_not_real_at_all';
let unauthorizedGroup = 'uw_employee';

describe('Membership', () => {

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
      expect(result.error).to.equal(false);
      expect(result.message.length).to.equal(0);
    });

    it('should add multiple members to a group', async () => {
      let options = {
        id:    group,
        netid: ['dgale', 'gabugabu']
      };

      let result = await uwgws.membership.add(options);
      expect(result.statusCode).to.eql(200);
      expect(result.error).to.equal(false);
      expect(result.message.length).to.equal(0);
    });

    it('should add a rollup group', async () => {
      let options = {
        id:    group,
        netid: 'uw_foster_staff_it_developers'
      };

      let result = await uwgws.membership.add(options);
      expect(result.statusCode).to.eql(200);
      expect(result.error).to.equal(false);
      expect(result.message.length).to.equal(0);
    });

    // Catching add errors
    it('should return an error if the netid is invalid', async () => {
      let options = {
        id:    group,
        netid: 'dgalefakenetid'
      };

      let result = await uwgws.membership.add(options);
      expect(result.statusCode).to.equal(200);
      expect(result.error).to.equal(true);
      expect(result.message.length).to.equal(1);
    });

    it('should return an error if the group is invalid', async () => {
      let options = {
        id:    nonGroup,
        netid: 'dgale'
      };

      let result = await uwgws.membership.add(options);
      expect(result.statusCode).to.equal(404);
      expect(result.error).to.equal(true);
      expect(result.message.length).to.equal(1);
    });

    it('should return an error if any net ids are invalid', async () => {
      let options = {
        id:    group,
        netid: ['dgalefakenetid', 'gabugabufakenetid', 'schad']
      };

      let result = await uwgws.membership.add(options);
      expect(result.statusCode).to.eql(200);
      expect(result.error).to.equal(true);
      expect(result.message.length).to.equal(2);
    });

    it('does NOT throw an error when adding an existing member', async () => {
      let options = {
        id:    group,
        netid: 'milesm'
      };

      let result = await uwgws.membership.add(options);
      expect(result.statusCode).to.equal(200);
      expect(result.error).to.equal(false);
      expect(result.message.length).to.equal(0);
    });

    it('should return an error when adding an invalid rollup group', async () => {
      let options = {
        id:    group,
        netid: nonGroup
      };

      let result = await uwgws.membership.add(options);
      expect(result.statusCode).to.eql(200);
      expect(result.error).to.equal(true);
      expect(result.message.length).to.equal(1);
    });

    it('should return an error when adding a member to a group not authorized to administer', async () => {
      let options = {
        id:    unauthorizedGroup,
        netid: 'dgale'
      };

      let result = await uwgws.membership.add(options);
      expect(result.statusCode).to.equal(401);
      expect(result.error).to.equal(true);
      expect(result.message.length).to.equal(1);
    });

  });

  describe('Delete', () => {
    it('should delete a member from the group', async () => {
      let options = {
        id:    group,
        netid: 'schad'
      };

      let result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(200);
      expect(result.error).to.equal(false);
      expect(result.message.length).to.equal(0);
    });

    it('does NOT throw an error when deleting a non-member (valid netid) from the group', async () => {
      let options = {
        id:    group,
        netid: 'schad'
      };

      let result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(200);
      expect(result.error).to.equal(false);
      expect(result.message.length).to.equal(0);
    });

    it('does NOT throw an error when attempting to delete an invalid netid from the group', async () => {
      let options = {
        id:    group,
        netid: 'schadfakenetidn'
      };

      let result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(200);
      expect(result.error).to.equal(false);
      expect(result.message.length).to.equal(0);
    });

    it('throws an error when attempting to delete from an invalid group', async () => {
      let options = {
        id:    nonGroup,
        netid: 'dgale'
      };

      let result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(404);
      expect(result.error).to.equal(true);
      expect(result.message.length).to.equal(1);
    });

    it('throws an error when attempting to delete from a group we are not authorized to administer', async () => {
      let options = {
        id:    unauthorizedGroup,
        netid: 'dgale'
      };

      let result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(401);
      expect(result.error).to.equal(true);
      expect(result.message.length).to.equal(1);
    });

    it('should not delete all members from the group', async () => {
      let options = {id: group};

      let result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(400);
      expect(result.error).to.equal(true);
      expect(result.message.length).to.equal(1);
    });

  });

  describe('Get', () => {
    before(done => setTimeout(() => done(), 7000));

    it('should return membership', async () => {
      let options = {id: group};

      // this test occasionally returns 404
      let result = await uwgws.membership.get(options);
      expect(result.statusCode).to.eql(200);
      expect(result.data.length).to.be.within(1, 5);
      expect(result.error).to.equal(false);
      expect(result.message.length).to.equal(0);
    });

    it('should return effective membership', async () => {
      let options = {
        effective: true,
        id:        group
      };

      let result = await uwgws.membership.get(options);
      expect(result.data.length).to.be.within(10, 20);
      expect(result.error).to.equal(false);
      expect(result.message.length).to.equal(0);
    });

    it('should return the membership history for a group', async () => {
      let query  = {id: group};
      let result = await uwgws.group.history(query);

      expect(result.statusCode).to.eql(200);
      expect(result.error).to.equal(false);
      expect(result.message.length).to.equal(0);
      expect(Array.isArray(result.data)).to.eql(true);
      expect(result.data.length).to.eql(6);
    });

    // Error handling
    it('from an invalid group returns an error', async () => {
      let options = {id: nonGroup};

      let result = await uwgws.membership.get(options);
      expect(result.statusCode).to.eql(404);
      expect(result.data.length).to.equal(0);
      expect(result.error).to.equal(true);
      expect(result.message.length).to.equal(1);
    });


    it('history for an invalid group returns an error', async () => {
      let query  = {id: nonGroup};
      let result = await uwgws.group.history(query);
      expect(result.statusCode).to.eql(404);
      expect(result.error).to.equal(true);
      expect(result.message.length).to.equal(1);
      expect(result.data.length).to.equal(0);
    });

  });
});
