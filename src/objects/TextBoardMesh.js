import * as THREE from 'three';

// TODO: fix - text is stretched out

export default class TextBoardMesh extends THREE.Mesh {
    constructor( options = {} ) {
        const {
            width = 1,
            height = 1,
            opacity = 0.5,
            color = 0xffffff,
            position = [ 0, 0, 0 ],
            text = '',
            fontSize = 32,
            fontFamily = 'Arial',
            fontColor = '#000000',
            backgroundColor = '#ffffff'
        } = options;

        // Create canvas for text rendering
        const canvas = document.createElement( 'canvas' );
        const context = canvas.getContext( '2d' );
        
        // Set canvas size (make it larger for better text quality)
        canvas.width = 512;
        canvas.height = 512;

        // Draw background
        context.fillStyle = backgroundColor;
        context.fillRect( 0, 0, canvas.width, canvas.height );

        // Draw text if provided
        if ( text ) {
            context.fillStyle = fontColor;
            context.font = `${fontSize}px ${fontFamily}`;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText( text, canvas.width / 2, canvas.height / 2 );
        }

        // Create texture from canvas
        const texture = new THREE.CanvasTexture( canvas );
        texture.needsUpdate = true;

        const material = new THREE.MeshBasicMaterial( { 
            color: color,
            transparent: true,
            opacity: opacity,
            map: text ? texture : null
        } );

        const geometry = new THREE.PlaneGeometry( width, height );

        super( geometry, material );
        this.position.set( ...position );

        // Store properties for later updates
        this._canvas = canvas;
        this._context = context;
        this._text = text;
        this._fontSize = fontSize;
        this._fontFamily = fontFamily;
        this._fontColor = fontColor;
        this._backgroundColor = backgroundColor;
    }

    updateText( newText ) {
        this._text = newText;
        this._updateCanvas();
    }

    setFontSize( size ) {
        this._fontSize = size;
        this._updateCanvas();
    }

    setFontFamily( family ) {
        this._fontFamily = family;
        this._updateCanvas();
    }

    setFontColor( color ) {
        this._fontColor = color;
        this._updateCanvas();
    }

    setBackgroundColor( color ) {
        this._backgroundColor = color;
        this._updateCanvas();
    }

    _updateCanvas() {
        const context = this._context;
        
        // Clear canvas
        context.fillStyle = this._backgroundColor;
        context.fillRect( 0, 0, this._canvas.width, this._canvas.height );

        // Draw new text
        if ( this._text ) {
            context.fillStyle = this._fontColor;
            context.font = `${this._fontSize}px ${this._fontFamily}`;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText( this._text, this._canvas.width / 2, this._canvas.height / 2 );
        }

        // Update texture
        if ( !this.material.map ) {
            this.material.map = new THREE.CanvasTexture( this._canvas );
        }
        this.material.map.needsUpdate = true;
    }
}