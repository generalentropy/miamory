export interface CardData {
  id: number;
  imageName: string;
  color: string;
}

export const cardsData: Omit<CardData, "id">[] = [
  { imageName: "pizza", color: "red" },
  { imageName: "springroll", color: "blue" },
  { imageName: "carbonade", color: "yellow" },
  { imageName: "crepe", color: "green" },
  { imageName: "chimay", color: "red" },
  { imageName: "lasagne", color: "blue" },
  { imageName: "risotto", color: "yellow" },
  { imageName: "pesto", color: "green" },
  { imageName: "fondant", color: "red" },
  { imageName: "pho", color: "blue" },
  { imageName: "bibim", color: "yellow" },
  { imageName: "sardine", color: "green" },
  { imageName: "tiramisu", color: "red" },
  { imageName: "ramen", color: "blue" },
  { imageName: "burrito", color: "yellow" },
  { imageName: "paella", color: "green" },
  { imageName: "burger", color: "red" },
  { imageName: "gimbap", color: "blue" },
];
