import '../setup/';

describe('Group', function () {
  this.timeout(9000);

  beforeEach(() => {
    uwgws.initialize(config);
  });

  function groupOptions() {
    let admin   = 'uw_foster_it_certs';
    let manager = 'uw_foster_undergrad_graduating_managers';
    let reader  = 'uw_foster_undergrad_graduating_viewers';
    let id      = 'uw_foster_it_developers_nodegws-test_create';

    let options = {
      description: 'This is the description',
      name:        id,
      title:       'Foster GWS Test',
      contact:     'milesm',
      admin:       admin,
      manager:     manager,
      reader:      reader
    };

    return options;
  }

  describe('Create and delete', () => {
    it('should create a then delete a group', mochaAsync(async () => {
      let options = groupOptions();

      // make sure it doesnt exist first
      let result = await uwgws.group.del({ id: options.name});

      // now create it, then delete it
      result = await uwgws.group.create(options);
      expect(result.statusCode).to.equal(201);
      result = await uwgws.group.del({ id: options.name});
      expect(result.statusCode).to.equal(200);
    }));
  });

  describe('Get', () => {
    it('should return a group', mochaAsync(async () => {
      let options = { id: 'uw_foster_it_developers_nodegws-test' };
      let result = await uwgws.group.get(options);
      expect(result.data.gid).to.equal('351739');
    }));
  });

});
