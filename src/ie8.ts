/// <reference path="../definition/array.from.d.ts" />
'use strict'

import 'es5-shim'
import 'es5-shim/es5-sham'

import 'native-promise-only'
import {shim as arrayFromShim} from 'array.from'
arrayFromShim()

import mcore from './index'

export = mcore
