require('../setup');

let options = {
  admin:       'uw_foster_staff_it_developers',
  contact:     'milesm',
  description: 'Created as part of an automated test https://github.com/UWFosterIT/node-uwgws',
  manager:     'uw_foster_undergrad_graduating_managers',
  name:        'uw_foster_staff_it_developers_nodegws-test_group',
  reader:      'uw_foster_undergrad_graduating_viewers',
  title:       'Foster GWS Test'
};

let nonGroup = 'fake_group_that_is_not_real_at_all';
let unauthorizedGroup = 'uw_employee';

describe('Group', () => {
  beforeEach(() => {
    uwgws.initialize(config);
  });

  before(async () => {
    uwgws.initialize(config);
    await uwgws.group.del({id: options.name});
  });

  it('should create a group', async () => {
    let result = await uwgws.group.create(options);
    expect(result.statusCode).to.equal(201);
    expect(result.error).to.eql(false);
    expect(result.message.length).to.eql(0);
  });

  it('should get a group', async () => {
    let query  = {id: options.name};
    let result = await uwgws.group.get(query);
    expect(result.error).to.eql(false);
    expect(result.message.length).to.eql(0);
    expect(result.data.contact).to.eql('milesm');
    expect(result.data.description).to.eql('Created as part of an automated test https://github.com/UWFosterIT/node-uwgws');
    expect(result.data.title).to.eql('Foster GWS Test');
  });

  it('should create and delete a new group', async () => {
    options.name = `${options.name}_delete`;
    let result = await uwgws.group.create(options);
    expect(result.statusCode).to.eql(201);
    expect(result.error).to.eql(false);
    expect(result.message.length).to.eql(0);

    result = await uwgws.group.del({id: options.name});
    expect(result.statusCode).to.eql(200);
    expect(result.error).to.eql(false);
    expect(result.message.length).to.eql(0);
  });

  it('should return an error when getting an invalid group', async () => {
    let query  = {id: nonGroup};
    let result = await uwgws.group.get(query);
    expect(result.statusCode).to.eql(404);
    expect(result.error).to.eql(true);
    expect(result.message.length).to.eql(1);
  });

  it('does not return an error when trying to delete an invalid group', async () => {
    result = await uwgws.group.del({id: nonGroup});
    expect(result.statusCode).to.eql(200);
    expect(result.error).to.eql(false);
    expect(result.message.length).to.eql(0);
  });

  it('should return an error when trying to delete you are not authorized to administer', async () => {
    result = await uwgws.group.del({id: unauthorizedGroup});
    expect(result.statusCode).to.eql(401);
    expect(result.error).to.eql(true);
    expect(result.message.length).to.eql(1);
  });

});
