/**
 * Before change the DOM , We have to encapsulate it into mcore.Component 
 * svg icon
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import mcore from 'mcore3';
import $ from 'jquery';

export default class Svgicon extends mcore.Component {
    init() {
        this.$parentNode = $(this.parentNode);
        this.buildSVG();
    }

    watch(){
        this.on('change:icon', ()=>{
            this.buildSVG();
        });

        this.on('change:dir', ()=>{
            this.buildSVG();
        });

        this.on('change:fill', ()=>{
            this.buildSVG();
        });
    }

    buildSVG(){
        this.$parentNode.html(`
            <svg class="svg-icon ${this.scope.dir ? 'svg-' + this.scope.dir  : ''} ${this.scope.fill !== undefined ? 'svg-fill' : ''}">
                <use xlink:href="#${this.scope.icon}"></use>
            </svg>
        `);
    }
}

mcore.Template.components.svgicon = Svgicon;
