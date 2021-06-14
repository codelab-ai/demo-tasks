import objectMapper from 'object-mapper'

it('maps from one shape to another', () => {
  const original = {
    company: {
      devs: [
        {
          firstname: 'Webber',
          lastname: 'Wang',
        },
        {
          firstname: 'Vien',
          lastname: 'Nguyen',
        },
      ],
    },
    info: [
      {
        key: 'user.address.number',
        value: '1200',
      },
      {
        key: 'user.address.street',
        value: 'Park ave.',
      },
    ],
  }
  const map = {
    'company.devs': 'devs',
    'user': original.info.map(item => ({
      key: item.key,
      transform: () => item.value
    }))
  }

  const expected = {
    devs: [
      {
        firstname: 'Webber',
        lastname: 'Wang',
      },
      {
        firstname: 'Vien',
        lastname: 'Nguyen',
      },
    ],
    user: { address: { number: '1200', street: 'Park ave.' } },
  }
  const result = objectMapper(original, map)

  expect(result).toStrictEqual(expected)
})
