interface CommonItem {
  id: number;
  name: string;
  parentId?: number;
  email: string;
}



interface UserData extends CommonItem {
  balance: string;
  children?: UserData[];
}


export const filterName = (data: UserData[], search: string): UserData[] => {
  if (!search.trim()) {
    return data.map((item) => ({
      ...item,
      balance: item.balance.toString(),
      children: item.children ? filterName(item.children, search) : undefined,
    }));
  }

  const searchWords = search.trim().toLowerCase().split(/\s+/);

  return data
    .filter((item) => {
      const lowerCaseName = item.name.toLowerCase();
      return searchWords.every((word) => lowerCaseName.includes(word));
    })
    .map((item) => ({
      ...item,
      balance: item.balance.toString(),
      children: item.children ? filterName(item.children, search) : undefined,
    }));
};

