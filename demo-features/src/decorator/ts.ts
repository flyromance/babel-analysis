function d(target) {
  return (option) => {
    Reflect.defineMetadata("constructor", target, option);
  };
}

function m(option) {
  return (target, properName) => {
    const type = Reflect.getMetadata("design:type", target, properName);
    console.log(properName, type);

    Reflect.defineMetadata("xxx", option, target, properName);
  };
}

@d
class AAA {
  @m
  aa: number = 1;

  @m
  bb;

  // @Reflect.metadata('a', 'b')
  cc: number;

  constructor(a, b) {
    this.cc = 1;
  }

  @m
  add(a: number, b?: any): number {
    return 123;
  }
}
