export enum UserType {
  'User' = 1,
  'SuperAdmin' = 2,
  'BusinessAdmin' = 3,
  'Chef' = 4,
  'ProducerAdmin' = 5,
}

export const validTypes = [
  'bakery',
  'bar',
  'lodging',
  'meal_delivery',
  'meal_takeaway',
  'supermarket',
  'night_club',
  'restaurant',
  'shopping_mall',
  'food',
  // 'establishment',
];

export const RatingBubbles = [
  {
    sequenceNo: 1,
    colorCode: '#A1A1A1',
    isSelected: false,
    value: '1',
  },
  {
    sequenceNo: 2,
    colorCode: '#FFBF00',
    isSelected: false,
    value: '2',
  },
  {
    sequenceNo: 3,
    colorCode: '#EAF000',
    isSelected: false,
    value: '3',
  },
  {
    sequenceNo: 4,
    colorCode: '#FFFFFF',
    isSelected: false,
    value: '4',
  },
  {
    sequenceNo: 5,
    colorCode: '#16E700',
    isSelected: false,
    value: '5',
  },
  {
    sequenceNo: 6,
    colorCode: '#FF95D1',
    isSelected: false,
    value: '6',
  },
  {
    sequenceNo: 7,
    colorCode: '#FF00AB',
    isSelected: false,
    value: '7',
  },
];
