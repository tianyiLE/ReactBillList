export const billListData = {
  pay: [
    {
      type: 'foods',
      name: 'Food and Beverage',
      list: [
        { type: 'food', name: 'Meal' },
        { type: 'drinks', name: 'Beverages' },
        { type: 'dessert', name: 'Desserts & Snacks' },
      ],
    },
    {
      type: 'taxi',
      name: 'Transportation',
      list: [
        { type: 'taxi', name: 'Taxi & Rental' },
        { type: 'longdistance', name: 'Travel Tickets' },
      ],
    },
    {
      type: 'recreation',
      name: 'Leisure & Entertainment',
      list: [
        { type: 'bodybuilding', name: 'Sports & Fitness' },
        { type: 'game', name: 'Leisure & Games' },
        { type: 'audio', name: 'Media & Audiovisual' },
        { type: 'travel', name: 'Travel & Vacation' },
      ],
    },
    {
      type: 'daily',
      name: 'Daily Expenses',
      list: [
        { type: 'clothes', name: 'Clothes' },
        { type: 'bag', name: 'Shoes, Hats & Bags' },
        { type: 'book', name: 'Learning & Knowledge' },
        { type: 'promote', name: 'Skill Improvement' },
        { type: 'home', name: 'Home Decor' },
      ],
    },
    {
      type: 'other',
      name: 'Other Expenses',
      list: [{ type: 'community', name: 'Community Fee' }],
    },
  ],
  income: [
    {
      type: 'professional',
      name: 'Professional Income',
      list: [
        { type: 'salary', name: 'Salary' },
        { type: 'overtimepay', name: 'Overtime' },
        { type: 'bonus', name: 'Bonus' },
      ],
    },
    {
      type: 'other',
      name: 'Other Income',
      list: [
        { type: 'financial', name: 'Financial Income' },
        { type: 'cashgift', name: 'Gift Money' },
      ],
    },
  ],
}

  
  export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
    billListData[key].forEach(bill => {
      bill.list.forEach(item => {
        prev[item.type] = item.name
      })
    })
    return prev
  }, {})