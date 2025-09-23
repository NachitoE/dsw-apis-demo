export type User = { id: string; name: string; email: string };

let users: User[] = [];
let nextId = 1;

export const services = {
  async listUsers(): Promise<User[]> {
    return users;
  },
  async createUser(name: string, email: string): Promise<User> {
    if (!name || !email) throw new Error("name/email requeridos");
    const u: User = { id: String(nextId++), name, email };
    users.push(u);
    return u;
  },
};
