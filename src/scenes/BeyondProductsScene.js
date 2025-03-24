import { BaseScene } from "./BaseScene.js";
import { loadObjModel } from '../MeshUtils.js'

export class BeyondProductsScene extends BaseScene {
    constructor() {
        super();

        this.load();
    }

    load() {
        loadObjModel( './assets/model/Gates_Anita.obj' )
        .then( ( model ) => {
            this.group.add( model );
        } );
    }
}