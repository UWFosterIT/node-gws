require('../setup');

describe('Group', function () {

  let options = {
    admins: [{
      id:   'uw_foster_staff_it_developers',
      type: 'group',
    }],
    contact:     'gabugabu',
    description: 'Created as part of an automated test https://github.com/UWFosterIT/node-uwgws',
    displayName: 'Foster GWS Test',
    id:          'uw_foster_staff_it_developers_nodegws-test_group',
    readers:     [{
      id:   'uw_foster_undergrad_graduating_viewers',
      type: 'group'
    }],
    updaters: [{
      id:   'uw_foster_undergrad_graduating_managers',
      type: 'group',
    }],
  };

  let nonGroup = 'fake_group_that_is_not_real_at_all';
  let unauthorizedGroup = 'uw_employee';

  beforeEach(async () => {
    await uwgws.initialize(config);
  });

  before(async () => {
    await uwgws.initialize(config);
    await uwgws.group.del({id: options.id});
  });

  it('should create a group', async () => {
    let result = await uwgws.group.create(options);
    expect(result.statusCode).to.equal(201);
    expect(result.error).to.eql(false);
    expect(result.message).to.be.undefined;
  });

  it('should get a group', async () => {
    let query  = {id: options.id};
    let result = await uwgws.group.get(query);
    expect(result.error).to.eql(false);
    expect(result.statusCode).to.eql(200);
    expect(result.message).to.be.undefined;
    expect(result.data.contact).to.eql('gabugabu');
    expect(result.data.description).to.eql('Created as part of an automated test https://github.com/UWFosterIT/node-uwgws');
    expect(result.data.displayName).to.eql('Foster GWS Test');
  });

  it('should delete a group', async () => {
    let resultDel = await uwgws.group.del({id: options.id});
    expect(resultDel.statusCode).to.eql(200);
    expect(resultDel.error).to.eql(false);
    expect(resultDel.message[0]).to.eql('deleted');

    let result = await uwgws.group.create(options);
    expect(result.statusCode).to.eql(201);
    expect(result.error).to.eql(false);
    expect(result.message).to.be.undefined;
  });

  it('should move a group to a new stem', async () => {
    options.id = 'uw_foster_student_move';
    await uwgws.group.create(options);

    let query = {
      id:      'uw_foster_student_move',
      newStem: 'uw_foster_staff'
    };
    let result = await uwgws.group.move(query);
    expect(result.statusCode).to.eql(200);
    expect(result.error).to.eql(false);
    expect(result.message[0]).to.eql('OK');

    let getRes = await uwgws.group.get({id: 'uw_foster_staff_move'});
    expect(result.error).to.eql(false);
    expect(getRes.statusCode).to.eql(200);
    expect(getRes.data.contact).to.eql('gabugabu');
    expect(getRes.data.displayName).to.eql('Foster GWS Test');

    await uwgws.group.del({id: 'uw_foster_staff_move'});
  });

  // Error handling
  it('should return an error when getting an invalid group', async () => {
    let query  = {id: nonGroup};
    let result = await uwgws.group.get(query);
    expect(result.statusCode).to.eql(404);
    expect(result.error).to.eql(true);
    expect(result.message.length).to.eql(1);
  });

  it('should return an error when trying to delete an invalid group', async () => {
    let result = await uwgws.group.del({id: nonGroup});
    expect(result.statusCode).to.eql(404);
    expect(result.error).to.eql(true);
    expect(result.message.length).to.eql(1);
  });

  it('should return an error when trying to delete a group you are not authorized to administer', async () => {
    let result = await uwgws.group.del({id: unauthorizedGroup});
    expect(result.statusCode).to.eql(401);
    expect(result.error).to.eql(true);
    expect(result.message.length).to.eql(1);
  });

});
