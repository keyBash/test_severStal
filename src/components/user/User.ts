  interface User {
    id: number;
    parentId: number;
    children: User[];
  }
 export interface UserData   {
  balance: string;
  children?: UserData[];
}

export const prepearUsers = (data: User[]): User[] => {
  const copyUsers: User[] = [...data];
  const references: { [id: number]: User } = {};
  copyUsers.forEach((user: User) => {
    references[user.id] = user;
    user.children = [];
  });
  for (let i = 0; i < copyUsers.length; i++) {
    const user: User = copyUsers[i];
    if (user.parentId !== 0 && references.hasOwnProperty(user.parentId)) {
      references[user.parentId].children.push(user);

      copyUsers.splice(i, 1);
      i--;
    }
  }
  return copyUsers;
};
