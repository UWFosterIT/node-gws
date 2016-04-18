import '../setup/';

describe('Group', function () {

  beforeEach(() => {
    uwgws.initialize(config);
  });

  // TO DO...
  describe('Get', () => {
    it('should create a group', mochaAsync(async () => {
      // data for our new group
      let admin   = 'uw_foster_undergrad_graduating_admins';
      let manager = 'uw_foster_undergrad_graduating_managers';
      let reader  = 'uw_foster_undergrad_graduating_viewers';
      let id      = 'u_milesm_gwstest_create';

      let options = {
        description: 'This is the description',
        name:        id,
        title:       'Foster GWS Test',
        contact:     'milesm',
        admin:       admin,
        manager:     manager,
        reader:      reader
      };

      // let result = await uwgws.group.create(options);
      // console.log(result);
    }));
  });
});
