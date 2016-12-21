import Component from './component';
import App from './app';
export default class View extends Component {
    $el: any;
    title: string;
    constructor($el: any, app?: App);
    setTitle(title: string): void;
    back(): boolean;
    run(): any;
    afterRun(): any;
}
