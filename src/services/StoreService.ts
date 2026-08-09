import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';


export interface Entity {
  id: string;
}

type ItemMap<T> = Record<string, T>;

export class StoreService<T extends Entity> {
  constructor(private readonly filePath: string) { }

  private async readAll(): Promise<ItemMap<T>> {
    try {
      const raw = await readFile(this.filePath, 'utf8');
      return JSON.parse(raw) as ItemMap<T>;
    } catch (err) {
      return {};
    }
  }

  private async writeAll(items: ItemMap<T>): Promise<void> {
    await mkdir(dirname(this.filePath), { recursive: true });
    const tmp = `${this.filePath}.tmp`;
    await writeFile(tmp, JSON.stringify(items, null, 2));
    await rename(tmp, this.filePath);
  }

  async get(id: string): Promise<T | null> {
    const items = await this.readAll();
    return items[id] ?? null;
  }

  async save(item: T): Promise<T> {
    const items = await this.readAll();
    items[item.id] = item;
    await this.writeAll(items);
    return item;
  }
  async findBy(predicate: (item: T) => boolean): Promise<T | null> {
    const items = await this.readAll();
    return Object.values(items).find(predicate) ?? null;
  }
}