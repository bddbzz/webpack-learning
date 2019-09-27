import {
    helloworld
} from './helloworld'
import {
    a,
    b
} from '../../tree-shaking/index'
document.write(helloworld()+a())


