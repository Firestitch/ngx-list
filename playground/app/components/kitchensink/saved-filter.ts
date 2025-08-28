export const SavedFilters: any =
  [
    {
      id: 1,
      name: 'Test Filter',
      active: false,
      filters: {
        singleSelect: 2,
        group_select: 3,
        range_min: '50',
        range_max: '300',
        observable_select: 3,
        autocomplete_user_id: [
          {
            name: 'Jane Doe',
            value: '2',
          },
        ],
        autocompletechips_user_id: [
          {
            name: 'John Doe',
            value: '1',
          },
          {
            name: 'Bob Tom',
            value: '3',
          },
        ],
        daysChips: [
          {
            name: 'Monday',
            value: '1',
          },
        ],
        date: '2020-09-22T00:00:00+03:00',
        'scroll-date': '2020-10-01T00:00:00+03:00',
      },
    },
    {
      id: 2,
      name: 'Another Filter',
      filters: {
        keyword: 'Hello World',
        singleSelect: 1,
        group_select: 5,
        range_min: '0',
        range_max: '9999',
      },
    },
  ];
