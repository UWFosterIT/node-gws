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
  });

  it('should get a group', async () => {
    let query  = {id: options.name};
    let result = await uwgws.group.get(query);
    expect(result.statusCode).to.eql(200);
    expect(result.data.contact).to.eql('milesm');
    expect(result.data.description).to.eql('Created as part of an automated test https://github.com/UWFosterIT/node-uwgws');
    expect(result.data.title).to.eql('Foster GWS Test');
  });

  it('should create and delete a new group', async () => {
    options.name = `${options.name}_delete`;
    let result = await uwgws.group.create(options);
    expect(result.statusCode).to.eql(201);

    result = await uwgws.group.del({id: options.name});
    expect(result.statusCode).to.eql(200);
  });

});
