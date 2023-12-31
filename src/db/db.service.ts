import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose/dist/interfaces";


@Injectable()
export class DBService implements MongooseOptionsFactory {

    constructor(private config: ConfigService) {
        // console.log(config)
    }

    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {

        const name = this.config.get('name')
        // console.log(name)
        
        const password = this.config.get('password')
        // console.log(password)

        const uri =  `mongodb+srv://${name}:${password}@cluster0.18vbshy.mongodb.net/?retryWrites=true&w=majority`
        // console.log(uri)
        return {
            uri
        }
    }

}