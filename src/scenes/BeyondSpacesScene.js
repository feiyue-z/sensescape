import { BaseScene } from "./BaseScene.js";
import { loadObjModel } from '../utils/MeshUtils.js'

export class BeyondSpacesScene extends BaseScene {
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