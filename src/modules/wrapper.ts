interface Some<T> {
    some: {
        [key: string]: {
            in: T
        }
    }
}

export const wrapSome = <T>(value: T, key = 'id'): Some<T> | undefined =>
    value && value != null
        ? {
              some: {
                  id: {
                      in: value,
                  },
              },
          }
        : undefined
