require('../setup');

const group = 'uw_foster_staff_it_developers_nodegws-test_group';
const nonGroup = 'fake_group_that_is_not_real_at_all';
const unauthorizedGroup = 'uw_employee';

describe('Membership', () => {
  beforeEach(async () => {
    await uwgws.initialize(config);
  });

  // remove group created by tests
  after(async () => {
    await uwgws.initialize(config);
    await uwgws.group.del({ id: group });
  });

  describe('Add', () => {
    it('should add a new member to the group', async () => {
      const options = {
        id: group,
        netid: 'gabugabu',
        sync: true,
      };

      const result = await uwgws.membership.add(options);
      expect(result.statusCode).to.equal(200);
      expect(result.error).to.eql(false);
      expect(result.message[0]).to.eql('See the notFound list for failed member puts');
    });

    it('should replace entire membership of a group', async () => {
      const data = {
        data: [
          {
            id: 'clooper',
            type: 'uwnetid',
          },
          {
            id: 'hc75',
            type: 'uwnetid',
          },
          {
            id: 'gabugabu',
            type: 'uwnetid',
          },
        ],
      };

      const options = {
        data,
        id: group,
        sync: true,
      };

      const result = await uwgws.membership.replaceMembership(options);
      expect(result.statusCode).to.eql(200);
      expect(result.error).to.eql(false);
      expect(result.message[0]).to.eql('See the notFound list for failed member puts');

      const numberOfMembers = await uwgws.membership.get(options);
      expect(numberOfMembers.data.length).to.eql(options.data.data.length);
    });

    it('should bulk add multiple members to a group', async () => {
      const options = {
        id: group,
        netid: ['dgale', 'gabugabu'],
        sync: true,
      };

      const result = await uwgws.membership.add(options);
      expect(result.statusCode).to.eql(200);
      expect(result.error).to.eql(false);
      expect(result.message[0]).to.eql('See the notFound list for failed member puts');
    });

    it('should add a rollup group', async () => {
      const options = {
        id: group,
        netid: 'uw_foster_staff_it_developers',
        sync: true,
      };

      const result = await uwgws.membership.add(options);
      expect(result.statusCode).to.eql(200);
      expect(result.error).to.eql(false);
      expect(result.message[0]).to.eql('See the notFound list for failed member puts');
    });

    // Catching add errors
    it('should return notFound if the netid is invalid', async () => {
      const options = {
        id: group,
        netid: 'dgalefakenetid',
      };

      const result = await uwgws.membership.add(options);
      expect(result.statusCode).to.equal(200);
      expect(result.error).to.eql(true);
      expect(result.notFound.length).to.eql(1);
    });

    it('should return an error if the group is invalid', async () => {
      const options = {
        id: nonGroup,
        netid: 'dgale',
      };

      const result = await uwgws.membership.add(options);
      expect(result.statusCode).to.equal(404);
      expect(result.error).to.eql(true);
      expect(result.message.length).to.equal(1);
    });

    it('should return an error if any net ids are invalid', async () => {
      const options = {
        id: group,
        netid: ['dgalefakenetid', 'gabugabufakenetid', 'schad'],
      };

      const result = await uwgws.membership.add(options);
      expect(result.statusCode).to.eql(200);
      expect(result.error).to.eql(true);
      expect(result.notFound.length).to.eql(2);
    });

    it('does NOT throw an error when adding an existing member', async () => {
      const options = {
        id: group,
        netid: 'gabugabu',
      };

      const result = await uwgws.membership.add(options);
      expect(result.statusCode).to.equal(200);
      expect(result.error).to.eql(false);
      expect(result.message[0]).to.eql('See the notFound list for failed member puts');
    });

    it('should return an error when adding an invalid rollup group', async () => {
      const options = {
        id: group,
        netid: nonGroup,
      };

      const result = await uwgws.membership.add(options);
      expect(result.statusCode).to.eql(200);
      expect(result.error).to.eql(true);
      expect(result.message.length).to.equal(1);
    });

    it('should return an error when adding a member to a group not authorized to administer', async () => {
      const options = {
        id: unauthorizedGroup,
        netid: 'dgale',
      };

      const result = await uwgws.membership.add(options);
      expect(result.statusCode).to.equal(401);
      expect(result.error).to.eql(true);
      expect(result.message.length).to.equal(1);
    });
  });

  describe('Delete', () => {
    it('should delete a member from the group', async () => {
      const options = {
        id: group,
        netid: 'schad',
      };

      const result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(200);
      expect(result.error).to.eql(false);
      expect(result.message[0]).to.eql('deleted');
    });

    it('does NOT throw an error when deleting a non-member (valid netid) from the group', async () => {
      const options = {
        id: group,
        netid: 'schad',
      };

      const result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(200);
      expect(result.error).to.eql(false);
      expect(result.message[0]).to.eql('deleted');
    });

    it('does NOT throw an error when attempting to delete an invalid netid from the group', async () => {
      const options = {
        id: group,
        netid: 'schadfakenetidn',
      };

      const result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(200);
      expect(result.error).to.eql(false);
      expect(result.message[0]).to.eql('deleted');
    });

    it('returns an error when attempting to delete from an invalid group', async () => {
      const options = {
        id: nonGroup,
        netid: 'dgale',
      };

      const result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(404);
      expect(result.error).to.eql(true);
      expect(result.message.length).to.equal(1);
    });

    it('returns an error when attempting to delete from a group we are not authorized to administer', async () => {
      const options = {
        id: unauthorizedGroup,
        netid: 'dgale',
      };

      const result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(401);
      expect(result.error).to.eql(true);
      expect(result.message.length).to.equal(1);
    });

    it('should not delete all members from the group', async () => {
      const options = { id: group };

      const result = await uwgws.membership.del(options);
      expect(result.statusCode).to.equal(400);
      expect(result.error).to.eql(true);
      expect(result.message.length).to.equal(1);
    });
  });

  describe('Get', () => {
    it('should return membership', async () => {
      const options = { id: group };

      // this test occasionally returns 404
      const result = await uwgws.membership.get(options);
      expect(result.statusCode).to.eql(200);
      expect(result.error).to.eql(false);
      expect(result.data.length).to.be.within(1, 7);
      expect(result.message).to.be.undefined;
    });

    it('should return effective membership', async () => {
      const options = {
        effective: true,
        id: group,
      };

      const result = await uwgws.membership.get(options);
      expect(result.data.length).to.be.within(10, 20);
      expect(result.error).to.eql(false);
      expect(result.message).to.be.undefined;
    });

    it('should return the membership history for a group', async () => {
      const query = { id: group };
      const result = await uwgws.group.history(query);

      expect(result.statusCode).to.eql(200);
      expect(result.error).to.eql(false);
      expect(result.message).to.be.undefined;
      expect(Array.isArray(result.data)).to.eql(true);
      expect(result.data.length).to.eql(13);
    });

    // Error handling
    it('from an invalid group returns an error', async () => {
      const options = { id: nonGroup };

      const result = await uwgws.membership.get(options);
      expect(result.statusCode).to.eql(404);
      expect(result.error).to.eql(true);
      expect(result.message.length).to.equal(1);
    });


    it('history for an invalid group returns an error', async () => {
      const query = { id: nonGroup };
      const result = await uwgws.group.history(query);
      expect(result.statusCode).to.eql(404);
      expect(result.error).to.eql(true);
      expect(result.message.length).to.equal(1);
    });
  });
});
