class Base62 {
  _symbol = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  _symbol_map = Array.from(this._symbol).reduce((prev, value, index) => {
    return {
      ...prev,
      [value]: index,
    };
  }, {} as Record<string, number>);
  encode = (input: number): string => {
    let result = '';
    for (let i = input; i > 0; i = Math.floor(i / this._symbol.length)) {
      result += this._symbol[i % this._symbol.length];
    }
    return result;
  };

  decode = (input: string): number => {
    return Array.from(input)
      .reverse()
      .reduce(
        (prev, cur) =>
          prev * this._symbol.length + (this._symbol_map[cur] || 0),
        0,
      );
  };
}

export default new Base62();
