export const zittiSchema = {
  title: 'zittiSchema',
  version: 0,
  primaryKey: 'itemName',
  type: 'object',
  properties: {
    itemName: {
      type: 'string',
      minimum: 0,
      maxLength: 100,
      multipleOf: 1,
    },
  },
  required: ['itemName'],
  indexes: ['itemName'],
};

export const newsPaperSchema = {
  title: 'newsPaperSchema',
  version: 0,
  primaryKey: 'fetchedDate',
  type: 'object',
  properties: {
    fetchedDate: {
      type: 'string',
      minimum: 0,
      maxLength: 100,
      multipleOf: 1,
    },
  },
  required: ['fetchedDate'],
  indexes: ['fetchedDate'],
};
