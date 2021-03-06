import Dexie from 'dexie';
import { Sheet } from '@/types'; 

export default class RecentsDatabase extends Dexie {
    public recents: Dexie.Table<Sheet, string>;
 
    public constructor() {
        super('RecentsDatabase');
        this.version(2).stores({
          recents: 'id,name,nQuestion'
        });
        this.recents = this.table('recents');
    }
}
