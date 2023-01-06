import { validate } from 'class-validator';
import { GetBudgetsFilterDto } from './get-budgets-filter.dto';

describe(`GetBudgetsFilter DTO`, () => {
  it('should have 1 rule set', async () => {
    const expected = expect.arrayContaining([
      expect.objectContaining({
        children: expect.arrayContaining([]),
        constraints: {
          maxLength: '_search must be shorter than or equal to 250 characters',
        },
        property: '_search',
      }),
    ]);

    const getBudgetsFilterDto = new GetBudgetsFilterDto();

    const actual = await validate(getBudgetsFilterDto);

    expect(actual).toEqual(expected);
  });
});
