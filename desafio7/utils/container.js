import knexLib from "knex";

export default class Container{
    constructor(config, table){
        this.knex = knexLib(config);
        this.table = table;
    }

    async getAll(){
        try {
            const table = await this.knex(this.table).select("*");
            return table
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async save(object) {
      try {
         await this.knex(this.table).insert(object)
          .then(() => console.log(`${JSON.stringify(object)} will be inserted at ${this.table} table.`))
          .catch(error => { throw new Error(error) })
      } catch (error) {
          throw new Error(error)
      }
    }
}