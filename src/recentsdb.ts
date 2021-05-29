import Dexie from 'dexie';
import { Sheet } from '@/types'; 

export default class RecentsDatabase extends Dexie {
    public recents: Dexie.Table<Sheet, string>;
 
    public constructor() {
        super("RecentsDatabase");
        this.version(1).stores({
          recents: "id,name"
        });
        this.recents = this.table("recents");
    }
}