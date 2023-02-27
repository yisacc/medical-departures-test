export const wrapper =
  (fn: Function) =>
  (...args: any) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
    fn(...args).catch(args[2])