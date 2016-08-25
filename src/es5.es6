/**
 *
 * es5 兼容包
 * @author vfasky <vfasky@gmail.com>
 **/
"use strict";

import "native-promise-only";
import {shim as arrayFromShim} from 'array.from';
arrayFromShim();

import mcore from './index';
module.exports = mcore;
