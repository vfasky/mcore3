/**
 *
 * test
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";
import mcore from '../src/es5';
import {expect} from 'chai';


describe('util', ()=>{
    it('isNumber', ()=>{
        let {isNumber} = mcore.util;

        expect(isNumber('123')).to.equal(true);
        expect(isNumber('123.4')).to.equal(true);
        expect(isNumber('-123.4')).to.equal(true);
        expect(isNumber(123)).to.equal(true);
        expect(isNumber(123.4)).to.equal(true);
        expect(isNumber(-123.4)).to.equal(true);
        expect(isNumber('12.3d')).to.equal(false);

    });

    it('nextTick', (done)=>{
        let {nextTick} = mcore.util;
        nextTick(done);
    });

    it('nextTick clear', ()=>{
        let {nextTick} = mcore.util;

        let tickId = nextTick(()=>{
            throw new Error('not clear');
        });
        nextTick.clear(tickId);
    });

});
