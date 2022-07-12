function d(target) {
    return (option) => {
        Reflect.defineMetadata('constructor', target, option);
    }
}

function m(option) {
    return (target, properName) => {
        const type = Reflect.getMetadata('design:type', target, properName);
        console.log(properName, type);

        Reflect.defineMetadata('xxx', option, target, properName);
    }
}

const aa = async () => {
    await [];
}

@d('aaa')
class AAA {

    @m('aa')
    aa;

    @m('bb')
    bb;

    @m('cc')
    @Reflect.metadata('a', 'b')
    cc;

    constructor(a, b) {
        this.cc = 1;
    }

    @m('add')
    add(a, b) {
        return 123;
    }

}